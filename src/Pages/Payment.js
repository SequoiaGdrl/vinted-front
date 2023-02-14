import "../assets/css/Payment.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Payment = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [completed, setCompleted] = useState(false);
	const [offer, setOffer] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://site--backend-vinted--vrh2r8t5z46t.code.run/offer/${id}`
			);
			setOffer(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const cardElement = elements.getElement(CardElement);

		const stripeResponse = await stripe.createToken(cardElement, {
			name: Cookies.get("token"),
		});
		console.log(stripeResponse);
		const stripeToken = stripeResponse.token.id;
		const response = await axios.post(
			"https://site--backend-vinted--vrh2r8t5z46t.code.run/pay",
			{
				stripeToken,
			}
		);
		console.log(response.data);
		if (response.data.status === "succeeded") {
			setCompleted(true);
		}
	};

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<section className="bodyPayment">
			<section className="payment">
				<div>
					<p>Résumé de la commande</p>
					<div className="resume">
						<div>
							<span>Commande</span>
							<span>{offer.product_price}€</span>
						</div>
						<div>
							<span>Frais protection acheteurs</span>
							<span>{offer.product_price / 10}€</span>
						</div>
						<div>
							<span>Frais de port</span>
							<span>{(offer.product_price / 10) * 2}€</span>
						</div>
					</div>
				</div>

				<div className="resume">
					<div style={{ fontWeight: "bold", marginTop: 50, marginBottom: 40 }}>
						<span>Total</span>
						<span>
							{offer.product_price +
								offer.product_price / 10 +
								(offer.product_price / 10) * 2}
							€
						</span>
					</div>
					<div>
						<span style={{ fontSize: 17, color: "black", lineHeight: 1.5 }}>
							Il ne vous reste plus qu'un étape pour vous offrir{" "}
							<span style={{ fontWeight: "bold" }}>{offer.product_name}.</span>
							Vous allez payer{" "}
							<span style={{ fontWeight: "bold" }}>
								{offer.product_price +
									offer.product_price / 10 +
									(offer.product_price / 10) * 2}{" "}
								€
							</span>{" "}
							(frais de protection et frais de port inclus).
						</span>
					</div>
				</div>
				<div>
					{completed ? (
						<span>Merci pour votre achat.</span>
					) : (
						<>
							<div style={{ marginBottom: 15 }}>
								<CardElement />
							</div>

							<button className="pay" onClick={handleSubmit}>
								Pay
							</button>
						</>
					)}
				</div>
			</section>
		</section>
	);
};

export default Payment;
