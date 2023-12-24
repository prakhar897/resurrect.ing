import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateTool from "./pages/CreateTool";
import TrendingTools from "./pages/TrendingTools";
import Home from "./pages/Home";
import Tool from "./pages/Tool";
import Vulnerabilities from "./pages/Vulnerabilities";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create-tool" element={<CreateTool />} />
					<Route path="/trending-tools" element={<TrendingTools />} />
					<Route path="/tool/:toolName" element={<Tool />} />
					<Route
						path="/vulnerabilities"
						element={<Vulnerabilities />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
