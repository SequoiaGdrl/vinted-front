import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../assets/css/SignUp.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signIn = async () => {
		const response = await axios.post(
			"https://lereacteur-vinted-api.herokuapp.com/user/login",
			{
				email: email,
				password: password,
			}
		);
		const token = response.data.token;
		Cookies.set("token", token, { expires: 7 });
		navigate("/");
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		signIn();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Se connecter</h1>

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

			<button type="submit">Se connecter</button>
			<Link className="link" to={"/signup"}>
				<nav>Pas encore de compte? Inscris-toi!</nav>
			</Link>
		</form>
	);
};

export default Login;
