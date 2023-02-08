import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Offer from "./Pages/Offer";
import Home from "./Pages/Home";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://lereacteur-vinted-api.herokuapp.com/offers"
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, []);

	return isLoading ? (
		<p>Loading ...</p>
	) : (
		<Router>
			<header>
				<div className="header">
					<div className="header1">
						<Link to={`/`}>
							<img
								height={50}
								width={100}
								src="https://www.numerama.com/wp-content/uploads/2020/08/vinted-app.jpg"
								alt="logo"
							/>
						</Link>
					</div>

					<input type="text" placeholder="Recherche des articles" />

					<div className="boutons">
						<button>S'inscrire </button>
						<button>Se connecter</button>
					</div>

					<div className="lastBouton">
						<button>Vends tes articles</button>
					</div>
				</div>
			</header>

			<Routes>
				<Route path="/" element={<Home data={data} />} />
				<Route path="/offer/:id" element={<Offer data={data} />} />
			</Routes>
		</Router>
	);
}

export default App;
