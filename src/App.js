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
	const [connected, setConnected] = useState(false);
	const [searchBar, setSearchBar] = useState("");
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://lereacteur-vinted-api.herokuapp.com/offers`
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://lereacteur-vinted-api.herokuapp.com/offers?title=${searchBar}`
				);
				setData(response.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [searchBar]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://lereacteur-vinted-api.herokuapp.com/offers?sort=${
						toggle ? "price-asc" : "price-desc"
					}`
				);
				setData(response.data);
			} catch (error) {
				console.log(error.response.data.message);
			}
		};
		fetchData();
	}, [toggle]);

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
					<div className="toggle">
						<span>prix desc</span>
						<label className="switch">
							<input
								type="checkbox"
								value={toggle}
								onChange={() => {
									setToggle(!toggle);
								}}
							/>
							<span></span>
						</label>
						<span>prix asc</span>
					</div>

					<input
						className="searchBar"
						value={searchBar}
						type="text"
						placeholder="Recherche des articles"
						onChange={async (event) => {
							setSearchBar(event.target.value);
						}}
					/>

					<div className="boutons">
						{connected ? (
							<button
								onClick={() => {
									Cookies.remove("token");
									setConnected(false);
								}}
							>
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
				<Route
					path="/signup"
					element={<Signup connected={connected} setConnected={setConnected} />}
				/>
				<Route
					path="/login"
					element={<Login connected={connected} setConnected={setConnected} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
