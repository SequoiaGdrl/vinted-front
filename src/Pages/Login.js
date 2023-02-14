import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../assets/css/SignUp.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Login = ({ connected, setConnected }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const signIn = async () => {
		try {
			const response = await axios.post(
				"https://site--backend-vinted--vrh2r8t5z46t.code.run/user/login",
				{
					email: email,
					password: password,
				}
			);
			const token = response.data.token;
			if (token) {
				Cookies.set("token", token, {
					expires: 7,
				});
				setConnected(true);
				navigate("/");
			}
		} catch (error) {
			console.log(error.response.data.message);
			if (error.response.data.message === "User not found") {
				setErrorMessage("Cet email n'est pas connu chez nous.");
			}

			if (error.response.data.message === undefined) {
				setErrorMessage("Erreur sur le mot de passe");
			}
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrorMessage("");
		signIn();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1> Se connecter </h1>
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
			<p
				style={{
					color: "red",
				}}
			>
				{errorMessage}
			</p>
			<button type="submit"> Se connecter </button>
			<Link className="link" to={"/signup"}>
				<nav> Pas encore de compte ? Inscris - toi! </nav>
			</Link>
		</form>
	);
};

export default Login;
