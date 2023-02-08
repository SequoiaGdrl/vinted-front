import { Link } from "react-router-dom";

const Home = ({ data }) => {
	return (
		<div>
			<main>
				<section className="images">
					<div className="imageCenter">
						<img
							src="https://static.vinted.com/assets/seller-promotion/other/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg"
							alt=""
						/>

						<div className="boxAnnonce">
							<h1> Prêts à faire du tri dans vos placards?</h1>
							<button>Commencer à vendre</button>
							<a href="#">Découvrir comment ça marche</a>
						</div>
					</div>
				</section>

				<section className="container">
					{data.offers.map((annonce, index) => {
						return (
							<div className="annonce">
								<div>
									{annonce.owner.account.avatar && (
										<span>
											<img src={annonce.owner.account.avatar.url} alt="" />
										</span>
									)}

									<span>{annonce.owner.account.username}</span>
								</div>
								<Link to={`/offer/${annonce._id}`}>
									<img src={annonce.product_image.url} alt="" />
								</Link>

								<h1>{annonce.product_name}</h1>

								<p>{annonce.product_price} €</p>
							</div>
						);
					})}
				</section>
			</main>
		</div>
	);
};

export default Home;
