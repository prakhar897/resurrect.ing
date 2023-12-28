import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="text-center mt-20">
			<p>
				Made with{" "}
				<span role="img" aria-label="heart">
					❤️
				</span>{" "}
				by PG
			</p>
			<p>
				<Link
					to="/terms-of-service"
					className="text-blue-500 hover:underline"
				>
					Terms of Service
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
