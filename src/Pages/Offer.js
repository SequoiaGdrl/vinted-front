import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../assets/css/Offer.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Offer = () => {
	const navigate = useNavigate();
	const [offer, setOffer] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://site--backend-vinted--vrh2r8t5z46t.code.run/offer/${id}`
			);
			setOffer(response.data);
			console.log(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return isLoading ? (
		"loaging..."
	) : (
		<section className="containerOffer">
			<div>
				<img src={offer.product_image.url} alt="" />
			</div>
			<div className="detailOffer">
				<p className=" price"> {offer.product_price}€ </p>
				<div className="detailDescription">
					{offer.product_details.map((detail) => {
						const key = Object.keys(detail)[0];

						return (
							<p>
								<span> {key} </span> <span> {detail[key]} </span>
							</p>
						);
					})}
				</div>
				<br />
				<hr width="80%" size="1px"></hr>
				<div className="descriptionAvatar">
					<p className="name"> {offer.product_name} </p>
					<p className="description"> {offer.product_description} </p>
					<div className="avatar">
						{offer.owner.account.avatar && (
							<span className="img">
								<img src={offer.owner.account.avatar.url} alt="" />
							</span>
						)}
						<span className="username"> {offer.owner.account.username} </span>
					</div>
					<div className="butt">
						<button
							onClick={() => {
								navigate(`/payment/${offer._id}`);
							}}
						>
							Acheter
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Offer;
