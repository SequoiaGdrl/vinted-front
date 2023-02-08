import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Offer = () => {
	const [offer, setOffer] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
			);
			setOffer(response.data);
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
				<p className=" price">{offer.product_price} €</p>

				<div className="detailDescription">
					<p>
						<span>MARQUE</span>
						<span> {offer.product_details[0].MARQUE}</span>
					</p>

					<p>
						<span>TAILLE</span>
						<span>{offer.product_details[1].TAILLE}</span>
					</p>
					<p>
						<span>ÉTAT</span>
						<span>{offer.product_details[2].ÉTAT}</span>
					</p>
					<p>
						<span>COULEUR</span>
						<span>{offer.product_details[3].COULEUR}</span>
					</p>
					<p>
						<span>EMPLACEMENT</span>
						<span>{offer.product_details[4].EMPLACEMENT}</span>
					</p>
				</div>
				<br />
				<hr width="80%" size="1px"></hr>

				<div className="descriptionAvatar">
					<p className="name">{offer.product_name}</p>
					<p className="description">{offer.product_description}</p>
					<div className="avatar">
						<span className="img">
							<img src={offer.owner.account.avatar.url} alt="" />
						</span>
						<span className="username">{offer.owner.account.username}</span>
					</div>
					<div className="butt">
						<button>Acheter</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Offer;
