import "../src/assets/css/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Offer from "./Pages/Offer";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import axios from "axios";
import Login from "./Pages/Login";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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

					<input
						className="searchBar"
						type="text"
						placeholder="Recherche des articles"
					/>

					<div className="boutons">
						{Cookies.get("token") ? (
							<button onClick={() => Cookies.remove("token")}>
								Deconnection
							</button>
						) : (
							<>
								<button>
									<Link className="link" to={"/signup"}>
										S'inscrire
									</Link>
								</button>
								<button>
									<Link className="link" to={"/login"}>
										Se connecter
									</Link>
								</button>
							</>
						)}
					</div>

					<div className="lastBouton">
						<button>Vends tes articles</button>
					</div>
				</div>
			</header>

			<Routes>
				<Route path="/" element={<Home data={data} />} />
				<Route path="/offer/:id" element={<Offer data={data} />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
