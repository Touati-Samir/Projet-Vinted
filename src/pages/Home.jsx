import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <h1>Home</h1>
      {data.offers.map((offer) => {
        // Si le nom de l'offre continet search alors je l'affiche sinon je ne fais rien
        return (
          <Link key={offer._id} to={`/offers/${offer._id}`}>
            <article>
              <div>
                {offer.owner.account.avatar && (
                  <img
                    src={offer.owner.account.avatar?.secure_url}
                    alt={offer.owner.account.username}
                  />
                )}

                <span>{offer.owner.account.username}</span>
              </div>
              <img
                src={offer.product_image.secure_url}
                alt={offer.product_name}
              />
              <p>{offer.product_price} €</p>
              <p>{offer.product_details[1].TAILLE}</p>
              <p>{offer.product_details[0].MARQUE}</p>
            </article>
          </Link>
        );
      })}
    </main>
  );
};
export default Home;
