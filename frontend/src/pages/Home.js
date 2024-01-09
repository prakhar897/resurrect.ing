import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<Navbar />

			<div className="container mx-auto px-4 py-8 ">
				<div class="grid grid-cols-2 gap-4">
					<div class="p-4 w-70">
						<Link
							className="text-3xl font-bold mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 mb-2 ml-2 mr-2"
							to="/create-tool"
						>
							Create Tool
						</Link>
						<Link
							className="text-3xl font-bold mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 mb-2  ml-2 mr-2"
							to="/all-tools"
						>
							All Tools
						</Link>
						<p className="text-lg mb-4 mt-4">
							Generate a product with your half baked ideas in a
							minute.
						</p>

						<div className="mt-8">
							<h2 className="text-2xl font-bold mb-4">
								Why I created this:
							</h2>
							<h6>Goal 1:</h6>
							<p className="text-lg mb-4">
								To make a playground for testing vulnerabilities
								when generating code with LLMs.
							</p>

							<h6>Goal 2:</h6>
							<p className="text-lg mb-4">
								I see a lot of people around me with half baked
								ideas. Hopefully, this will help them get a
								clearer sense of what they want.
							</p>
							<p className="text-lg mb-4"></p>
						</div>

						<div className="mt-8">
							<h2 className="text-2xl font-bold mb-4">
								How it works:
							</h2>
							<ol className="list-decimal ml-6">
								<li className="text-lg mb-4">
									Describe what you want to build.
								</li>

								<li className="text-lg mb-4">
									Iterate upon the functionalities till you're
									satisfied.
								</li>

								<li className="text-lg mb-4">
									Get a permanent hosted link of your
									generated code.
								</li>
							</ol>
						</div>
					</div>
					<div class="p-4 w-30">
						<img
							className="relative w-screen h-max-screen "
							src={require("../images/meme.png")}
							alt="Testimonial 01"
						/>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Home;
