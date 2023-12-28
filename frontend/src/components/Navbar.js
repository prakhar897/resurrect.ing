import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [searchInput, setSearchInput] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [randomWords, setRandomWords] = useState([]);
	const navigate = useNavigate();

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

	function stringMatchingRank(array, input) {
		// Filter the array based on the string matching rank of the input

		const filteredArray = array
			.filter((item) => item.includes(input))
			.sort((a, b) => {
				const rankA = a.indexOf(input); // Calculate rank for string a
				const rankB = b.indexOf(input); // Calculate rank for string b
				return rankA - rankB; // Sort based on rank
			});

		const remainingCount = 5 - filteredArray.length;
		if (remainingCount > 0) {
			const remainingElements = array.filter(
				(item) => !filteredArray.includes(item)
			);
			const elementsToAdd = remainingElements.slice(0, remainingCount);
			filteredArray.push(...elementsToAdd);
		}

		// Return the top 5 elements
		return filteredArray.slice(0, 5);
	}

	// Function to handle input change
	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		setSearchInput(inputValue);

		// Display dropdown if the input length is one word
		setShowDropdown(
			inputValue.trim().split(/\s+/).length === 1 && inputValue.length > 0
		);

		// Generate random words when one word is typed
		if (inputValue.trim().split(/\s+/).length === 1) {
			setRandomWords(stringMatchingRank(primaryKeyValues, inputValue));
		}
	};

	// Function to handle word click and redirect
	const handleWordClick = (word) => {
		navigate(`/tool/${word}`);
	};

	return (
		<nav className="bg-blue-500 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-2xl font-bold flex items-center">
					<Link to="/" className="flex items-center">
						<img
							src="/icon.svg"
							alt="Your Brand Logo"
							className="h-10 w-auto mr-2"
						/>
						<span>Resurrect.ing</span>
					</Link>
				</div>
				<form action="#" method="GET" className="flex-grow ml-4 ">
					<input
						type="text"
						placeholder="Search..."
						className="px-4 py-2 rounded-md focus:outline-none w-half"
						value={searchInput}
						onChange={handleInputChange}
					/>
					{showDropdown && (
						<div className="absolute bg-white mt-1 p-2 rounded-md shadow-md">
							{randomWords.map((word, index) => (
								<p
									key={index}
									onClick={() => handleWordClick(word)}
									className="border-b py-1 cursor-pointer"
								>
									{word}
								</p>
							))}
						</div>
					)}
					<button
						type="submit"
						className="bg-white text-blue-500 px-4 py-2 rounded-md ml-2"
					>
						Search
					</button>
				</form>
			</div>
		</nav>
	);
};

export default Navbar;
