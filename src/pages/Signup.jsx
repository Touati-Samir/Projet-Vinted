import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Je récupère la fonction handleToken en props
const Signup = ({ handleToken }) => {
  // States qui gèrent mes inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  //   Permet de naviguer au click après avoir exécuté du code
  const navigate = useNavigate();

  // Fonction qui sera appelée lors de la validation du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //   Je fais disparaitre un éventuel message d'erreur
      setErrorMessage("");

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsLetter,
        }
      );
      console.log("===> la réponse", response.data);

      // J'enregistre le token dans mon state et mes cookies
      handleToken(response.data.token);
      // Je navigue vers ma page /
      navigate("/");
    } catch (error) {
      console.log(error.response.data);

      // Si je reçois le status 409
      if (error.response.status === 409) {
        // Je met à jour mon state errorMessage
        setErrorMessage(
          "This email already has an account, please use another one"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all the fields");
      }
    }
  };

  return (
    <main>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          checked={newsLetter}
          type="checkbox"
          onChange={() => {
            setNewsLetter(!newsLetter);
          }}
        />
        <input type="submit" value="S'inscrire" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </main>
  );
};

export default Signup;
