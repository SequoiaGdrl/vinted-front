import "../assets/css/Publish.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Input from "../components/Input";

const Publish = () => {
	const navigate = useNavigate();
	const [picture, setPicture] = useState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [marque, setMarque] = useState("");
	const [taille, setTaille] = useState("");
	const [couleur, setCouleur] = useState("");
	const [etat, setEtat] = useState("");
	const [lieu, setLieu] = useState("");
	const [prix, setPrix] = useState("");
	const [checkbox, setCheckbox] = useState(false);
	const [imageToDisplay, setImageToDisplay] = useState();

	return (
		<main className="main">
			<section>
				<form
					className="form"
					onSubmit={async (event) => {
						event.preventDefault();
						try {
							const formData = new FormData();
							formData.append("picture", picture);
							formData.append("title", title);
							formData.append("description", description);
							formData.append("brand", marque);
							formData.append("size", taille);
							formData.append("color", couleur);
							formData.append("condition", etat);
							formData.append("city", lieu);
							formData.append("price", prix);
							formData.append("checkbox", checkbox);

							const response = await axios.post(
								"https://site--backend-vinted--vrh2r8t5z46t.code.run/offer/publish",
								formData,
								{
									headers: {
										authorization: `Bearer ${Cookies.get("token")}`,
										"Content-Type": "multipart/form-data",
									},
								}
							);
							navigate(`/offer/${response.data._id}`);
						} catch (error) {
							console.log(error.message);
						}
					}}
				>
					<h1> Vends ton article </h1>
					<div className="containerPicture">
						<input
							type="file"
							onChange={(event) => {
								setPicture(event.target.files[0]);
							}}
						/>
					</div>
					<div className="containerNewOffer">
						<Input
							label="Titre"
							inputType={"text"}
							placeholder={"ex: Chemise Sézane verte"}
							value={title}
							setValue={setTitle}
						/>
						<div className="inputForm">
							<label> Décris ton article </label>
							<textarea
								rows="5"
								value={description}
								placeholder=" ex: porté quelquefois,taille correctement"
								onChange={(event) => {
									setDescription(event.target.value);
								}}
							/>
						</div>
					</div>
					<div className="containerNewOffer">
						<Input
							label={"Marque"}
							inputType={"text"}
							placeholder={"ex: Zara"}
							value={marque}
							setValue={setMarque}
						/>
						<Input
							label={"Taille"}
							inputType={"text"}
							placeholder={"ex: L/40/12"}
							value={taille}
							setValue={setTaille}
						/>
						<Input
							label={"Couleur"}
							inputType={"text"}
							placeholder={"ex: Fushia"}
							value={couleur}
							setValue={setCouleur}
						/>
						<Input
							label={"Etat"}
							inputType={"text"}
							placeholder={"ex: Neuf avec étiquette"}
							value={etat}
							setValue={setEtat}
						/>
						<Input
							label={"Lieu"}
							inputType={"text"}
							placeholder={"ex:Paris"}
							value={lieu}
							setValue={setLieu}
						/>
					</div>
					<div className="containerNewOffer">
						<Input
							label={"Prix"}
							inputType={"text"}
							placeholder={"0.00 €"}
							value={prix}
							setValue={setPrix}
						/>
						<div className="checkboxForm">
							<input
								type="checkbox"
								value={checkbox}
								onChange={() => {
									setCheckbox(!checkbox);
								}}
							/>
							<span> Je suis intéressé(e) par les échanges </span>
						</div>
					</div>
					<div className="buttonSubm">
						<button className="btnAddOffer" type="submit">
							Ajouter
						</button>
					</div>
				</form>
			</section>
		</main>
	);
};

export default Publish;
