import React, { useState, useRef, useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Notice from "../components/Notice";
import Footer from "../components/Footer";
import Tool from "./Tool";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { generateHTMLSnippet } from "../utils/LLMUtils";

import supabase from "../supabase";

const CreateTool = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const toolSessionName = searchParams.get("tool_session_name");
    const [scriptContent, setScriptContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");

    const toolRef = useRef(null);

    const [createToolForm, setCreateToolForm] = useState({
        model_name: "",
        api_key: "",
        human_prompt: "",
        past_conversations: [],
        current_html_snippet: "",
    });

    const [saveToolForm, setSaveToolForm] = useState({
        tool_name: "",
        current_html_snippet: "",
    });

    const handleCreateToolFormChange = (e) => {
        const { name, value } = e.target;
        setCreateToolForm({ ...createToolForm, [name]: value });
    };

    const handleSaveToolFormChange = (e) => {
        const { name, value } = e.target;
        setSaveToolForm({ ...saveToolForm, [name]: value });
    };

    const handleSubmitToolForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        createToolForm.current_html_snippet = toolRef.current.innerHTML;
        const response = await generateHTMLSnippet(
            createToolForm.human_prompt,
            createToolForm.current_html_snippet
        );

        if (response.startsWith("Error:")) {
            console.error("Error:", response);
            setErrorMessage(response);
            return;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(response, "text/html");
        const scripts = doc.querySelectorAll("script");
        scripts.forEach((script) => {
            setScriptContent(script.textContent);
            script.remove(); // Remove the script from HTML snippet
        });
        setLoading(false);

        toolRef.current.innerHTML = response;
    };

    useEffect(() => {
        // Execute script content after rendering the HTML
        if (scriptContent) {
            const scriptElement = document.createElement("script");
            scriptElement.textContent = scriptContent;
            document.body.appendChild(scriptElement);
        }
    }, [scriptContent]);

    const handleSubmitSaveForm = async (e) => {
        e.preventDefault();
        setErrorMessage2("");
        saveToolForm.current_html_snippet = toolRef.current.innerHTML;

        try {
            const regex = /^[A-Za-z0-9_-]+$/; // Allows letters (uppercase and lowercase), numbers, underscore, and hyphen
            if (!regex.test(saveToolForm.tool_name)) {
                throw "ToolName can only contain letters, numbers, underscore, and hyphen";
            }
            const { data, error } = await supabase.from("tools").insert([
                {
                    name: saveToolForm.tool_name,
                    html_content: saveToolForm.current_html_snippet,
                },
            ]);

            if (error) {
                setErrorMessage2(error.message);
                console.error("Error:", error);
                return;
            }

            console.log("Created tool:", data);
            navigate("/tool/" + saveToolForm.tool_name, { replace: true });
            window.location.reload(true);
        } catch (error) {
            setErrorMessage2(error);
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="md:flex">
                <div className="md:w-1/2 h-screen bg-white p-8 border border-gray-300">
                    {errorMessage !== "" && (
                        <ErrorMessage message={errorMessage} />
                    )}
                    <form
                        onSubmit={handleSubmitToolForm}
                        className="flex flex-col mt-4"
                    >
                        <div className="mt-4 flex-grow">
                            <textarea
                                type="text"
                                name="human_prompt"
                                value={createToolForm.human_prompt}
                                placeholder="Build me a Calculator..."
                                onChange={handleCreateToolFormChange}
                                className="border-gray-300 border-solid border-2 p-2 w-3/4"
                            />
                        </div>
                        <div className="mt-4 flex justify-between items-end">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <div className="md:w-1/2 h-screen bg-white p-8 border border-gray-300">
                    {errorMessage2 !== "" && (
                        <ErrorMessage message={errorMessage2} />
                    )}
                    <form onSubmit={handleSubmitSaveForm}>
                        <label className="font-bold">Save this tool:</label>
                        <input
                            type="text"
                            name="tool_name"
                            value={saveToolForm.tool_name}
                            onChange={handleSaveToolFormChange}
                            placeholder="Enter Tool Name..."
                            className="border-gray-300 border-solid border-2 mt-4 p-2"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Submit
                        </button>
                    </form>
                    <div>{loading && <Spinner />}</div>
                    <div
                        ref={toolRef}
                        className="border border-gray-400 bg-gray-200 rounded-sm mt-4 px-2"
                    >
                        <Tool type="ToolSession" tool_name={toolSessionName} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreateTool;
