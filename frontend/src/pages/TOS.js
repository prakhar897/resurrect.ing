import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TOS = () => {
	return (
		<>
			<Navbar />
			<div className="container mx-auto py-8 px-4">
				<h1 className="text-2xl font-bold mb-6">Terms of Service</h1>
				<div className="text-lg">
					<p className="mb-4">
						1. All fields in the app are user-generated. Do not
						insert any sensitive data.
					</p>
					<p className="mb-4">
						2. Disclaimer of Liability: The use of this application
						is at your own risk. We do not assume any liability for
						the accuracy, completeness, or usefulness of the
						information provided by users. We are not responsible
						for any damages or losses resulting from the use of this
						app.
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default TOS;
