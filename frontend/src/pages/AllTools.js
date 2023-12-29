import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import supabase from "../supabase";
import { Link } from "react-router-dom";

const AllTools = () => {
    const [primaryKeyValues, setPrimaryKeyValues] = useState([]);

    useEffect(() => {
        async function fetchPrimaryKeyValues() {
            try {
                // Replace 'your_table_name' with the name of your table
                const { data, error } = await supabase
                    .from("tools")
                    .select("name");

                if (error) {
                    throw error;
                }

                if (data) {
                    // Extract primary key values from the response
                    const values = data.map((row) => row.name);
                    setPrimaryKeyValues(values);
                }
            } catch (error) {
                console.error(
                    "Error fetching primary key values:",
                    error.message
                );
            }
        }

        fetchPrimaryKeyValues();
    }, []);
    return (
        <>
            <Navbar />

            <h1 className="text-3xl font-bold mb-4 ml-10">All tools</h1>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ml-10">
                {primaryKeyValues.map((primaryKeyValue) => (
                    <li key={primaryKeyValue} className="text-blue-500">
                        <Link
                            to={`/tool/${primaryKeyValue}`}
                            className="hover:underline"
                        >
                            {primaryKeyValue}
                        </Link>
                    </li>
                ))}
            </ul>

            <Footer />
        </>
    );
};

export default AllTools;
