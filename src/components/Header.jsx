import { Link } from "react-router-dom";

// Je récupère en props le state token et la fonction handleToken
const Header = ({ token, search, handleToken, setSearch }) => {
  return (
    <header>
      <h1>Je suis le header</h1>

      {token ? (
        <button
          onClick={() => {
            // Je me déconnecte en appelant la fonction handleToken
            handleToken(null);
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <>
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        </>
      )}
      <input
        placeholder="Rechercher des articles"
        type="text"
        name="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />

      <Link to={token ? "/publish" : "/login"}>
        <button>Vends tes articles</button>
      </Link>
    </header>
  );
};

export default Header;
