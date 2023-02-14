import "../src/assets/css/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Offer from "./Pages/Offer";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import axios from "axios";
import Login from "./Pages/Login";
import Publish from "./Pages/Publish";
import Payment from "./Pages/Payment";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Input from "../src/components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faArrowDown,
	faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
	const [connected, setConnected] = useState(false);
	const [searchBar, setSearchBar] = useState("");
	const [toggle, setToggle] = useState(false);
	const stripePromise = loadStripe(
		"pk_test_51MbR9WAMHww00EIPnko4LKDtfHOrGsNU01x7yUyiExe6KJmCWCbLOh6zPd25AJbqRzPX269GxYzSzHyMYiW0pkgd00tVGEGzEN"
	);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--backend-vinted--vrh2r8t5z46t.code.run/offers`
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
					`https://site--backend-vinted--vrh2r8t5z46t.code.run/offers?title=${searchBar}`
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
					`https://site--backend-vinted--vrh2r8t5z46t.code.run/offers?sort=${
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
		<p> Loading... </p>
	) : (
		<Router>
			<body>
				<header>
					<div className="header">
						<div className="header1">
							<Link to={`/`}>
								<img
									height={40}
									src="https://lereacteur-vinted.netlify.app/static/media/logo.10b0caad793dd0a8ea72.png"
									alt="logo"
								/>
							</Link>
						</div>
						<div className="container2">
							<div className="containerSearch">
								<span className="iconSearch">
									<FontAwesomeIcon icon={faSearch} />
								</span>
								<span>
									<input
										className="searchBar"
										value={searchBar}
										type="text"
										placeholder="Recherche des articles"
										onChange={async (event) => {
											setSearchBar(event.target.value);
										}}
									/>
								</span>
							</div>
							<div className="toggle">
								<span className="textToggle"> Trier par: </span>
								<FontAwesomeIcon icon={toggle ? faArrowUp : faArrowDown} />
								<label className="switch">
									<input
										type="checkbox"
										value={toggle}
										onChange={() => {
											setToggle(!toggle);
										}}
									/>
									<span> </span>
								</label>
							</div>
						</div>
						<div className="boutons">
							{connected ? (
								<button
									className="deconnection"
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
											S 'inscrire
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
							<button>
								<Link className="link2" to={connected ? "/publish" : "/login"}>
									Vends tes articles
								</Link>
							</button>
						</div>
					</div>
				</header>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								data={data}
								connected={connected}
								setConnected={setConnected}
							/>
						}
					/>
					<Route path="/offer/:id" element={<Offer />} />
					<Route
						path="/payment/:id"
						element={
							<Elements stripe={stripePromise}>
								<Payment />
							</Elements>
						}
					/>
					<Route
						path="/signup"
						element={
							<Signup connected={connected} setConnected={setConnected} />
						}
					/>
					<Route
						path="/login"
						element={
							<Login connected={connected} setConnected={setConnected} />
						}
					/>
					<Route path="/publish" element={<Publish />} />
				</Routes>
			</body>
		</Router>
	);
}

export default App;
