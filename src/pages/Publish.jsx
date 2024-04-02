import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  // Si je suis connecté j'affiche la page, sinon je redeirige vers /login

  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        navigate(`/offers/${response.data._id}`);
      }
    } catch (error) {
      console.log("Je suis dans le catch", error);
    }
  };

  return token ? (
    <main>
      <h1>Publish</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        {picture && <img src={URL.createObjectURL(picture)} alt="produit" />}
        <label htmlFor="picture-input" style={{ color: "darkgreen" }}>
          + Ajoute une photo
        </label>
        <input
          style={{ display: "none" }}
          id="picture-input"
          type="file"
          onChange={(event) => {
            console.log(event);
            setPicture(event.target.files[0]);
          }}
        />
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          rows={6}
          cols={30}
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          name="brand"
          value={brand}
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          type="text"
          name="size"
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <input
          type="text"
          name="color"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <input
          type="text"
          name="condition"
          value={condition}
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <input
          type="text"
          name="city"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <input
          type="number"
          name="price"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input type="submit" value={"Ajouter"} />
      </form>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
