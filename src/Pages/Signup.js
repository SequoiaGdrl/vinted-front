import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../assets/css/SignUp.css";
const Signup = ({ connected, setConnected }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [newsletter, setNewsletter] = useState(false);
	const [ErrorMessage, setErrorMessage] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrorMessage("");
		if (password.length < 8) {
			alert("votre mot de passe doit contenir au minimun 8 caractères");
		} else {
			fetchData();
		}
	};

	const fetchData = async () => {
		try {
			const response = await axios.post(
				"https://lereacteur-vinted-api.herokuapp.com/user/signup",
				{
					username: username,
					email: email,
					password: password,
					newsletter: newsletter,
				}
			);

			const token = response.data.token;
			if (token) {
				Cookies.set("token", token, { expires: 7 });
				setConnected(true);
				navigate("/");
			}
		} catch (error) {
			if (error.response.data.message === "Missing parameters") {
				setErrorMessage(
					"Veuillez remplir TOUS les champs pour pouvoir s'inscrire"
				);
			}

			if (error.response.data.message === "This email already has an account") {
				setErrorMessage(
					"Votre email existe déjà. Veuillez utiliser un autre email"
				);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>S'incrire</h1>
			<input
				className="formBar"
				type="text"
				placeholder="Nom d'utilisateur"
				value={username}
				onChange={(event) => {
					setUsername(event.target.value);
				}}
			/>
			<input
				className="formBar"
				type="email"
				placeholder="Email"
				value={email}
				onChange={(event) => {
					setEmail(event.target.value);
				}}
			/>
			<input
				className="formBar"
				type="password"
				value={password}
				placeholder="Mot de passe"
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>
			<p style={{ color: "red" }}>{ErrorMessage}</p>
			<div>
				<input
					className="checkbox"
					type="checkbox"
					name="S'inscrire à notre newsletter"
					id="newsletter"
					onChange={() => {
						setNewsletter(true);
					}}
				/>
				<label>
					<span>S'inscrire à notre newsletter</span>
					<p>
						En m'inscrivant je confirme avoir lu et accepté les termes &
						conditions et politique de Confidentialité de Vinded. Je confirme
						avoir au moins 18 ans.
					</p>
				</label>
			</div>
			<button type="submit">S'inscrire</button>
			<Link className="link" to={"/login"}>
				<nav>Tu as déja un compte? Connecte-toi!</nav>
			</Link>
		</form>
	);
};

export default Signup;
