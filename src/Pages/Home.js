import { Link, useNavigate } from "react-router-dom";

import "../assets/css/Home.css";
const Home = ({ data, connected, setConnected }) => {
	const navigate = useNavigate();
	return (
		<div>
			<main>
				<section className="images">
					<div className="imageCenter">
						<img
							src="https://static.vinted.com/assets/seller-promotion/other/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg"
							alt=""
						/>
						<img
							className="pictureWhite"
							src="https://lereacteur-vinted.netlify.app/static/media/tear.884480420945b3afd77b44a6c5f98567.svg"
							alt=""
						/>

						<div className="boxAnnonce">
							<h1> Prêts à faire du tri dans vos placards?</h1>

							<button
								className="sell"
								onClick={() => {
									connected ? navigate("/publish") : navigate("/login");
								}}
							>
								Commencer à vendre
							</button>
						</div>
					</div>
				</section>

				<section className="container">
					{data.offers.map((annonce, index) => {
						return (
							<div className="annonce" key={annonce._id}>
								<div>
									{annonce.owner.account.avatar && (
										<span>
											<img src={annonce.owner.account.avatar.url} alt="" />
										</span>
									)}

									<span>{annonce.owner.account.username}</span>
								</div>
								<Link to={`/offer/${annonce._id}`}>
									<img
										className="pictureAnnonce"
										src={annonce.product_image.url}
										alt=""
									/>
								</Link>
								<p>{annonce.product_price} €</p>
								<h1
									style={{
										display: "flex",
										flexDirection: "column-reverse",
										gap: "5px",
									}}
								>
									{annonce.product_details.map((detail, index) => {
										if (detail.TAILLE) {
											return (
												<p className="detailAnnonce" key={index}>
													{detail.TAILLE}
												</p>
											);
										} else if (detail.MARQUE) {
											return (
												<p className="detailAnnonce" key={index}>
													{detail.MARQUE}
												</p>
											);
										} else {
											return null;
										}
									})}
								</h1>
							</div>
						);
					})}
				</section>
			</main>
		</div>
	);
};

export default Home;
