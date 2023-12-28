import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import supabase from "../supabase";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

const Tool = ({ type = "Tool", toolSessionName = "sampleApp" }) => {
	let { toolName } = useParams();
	const [scriptContent, setScriptContent] = useState("");

	let dbName = "tools";
	if (!toolName) {
		toolName = toolSessionName;
	}
	const [toolData, setToolData] = useState({});

	useEffect(() => {
		async function fetchItem() {
			try {
				// Fetch a single row from 'items' table where id matches itemId
				const { data, error } = await supabase
					.from(dbName)
					.select("*")
					.eq("name", toolName)
					.single();

				if (error) {
					throw error;
				}

				setToolData(data);

				const parser = new DOMParser();
				const doc = parser.parseFromString(
					data.html_content,
					"text/html"
				);
				const scripts = doc.querySelectorAll("script");

				scripts.forEach((script) => {
					setScriptContent(script.textContent);
					script.remove(); // Remove the script from HTML snippet
				});
			} catch (error) {
				console.error("Error fetching item:", error.message);
			}
		}

		fetchItem();
	}, [toolName, dbName]);

	useEffect(() => {
		// Execute script content after rendering the HTML

		if (scriptContent) {
			const scriptElement = document.createElement("script");
			scriptElement.textContent = scriptContent;
			document.body.appendChild(scriptElement);
		}
	}, [scriptContent]);

	return (
		<>
			{type === "Tool" && <Navbar />}
			<div dangerouslySetInnerHTML={{ __html: toolData.html_content }} />
			{type === "Tool" && <Footer />}
		</>
	);
};

export default Tool;
