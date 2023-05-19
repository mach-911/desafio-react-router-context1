import "./styles.css";
import { Routes, Route } from "react-router-dom";
import MyContext from "./mycontext";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
// Pages
import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos";

function App() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "CgmcSpzx2C5xiZCvcJjHPjvDB99Q1VAi0PKt9C7mHVKl7RAo7Kj7rG2h"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://api.pexels.com/v1/search?query=grapes", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const photos = result.photos.map((item) => {
          return {
            id: item.id,
            src: item.src,
            alt: item.alt,
            liked: item.liked
          };
        });
        setFotos(photos);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const setFavoritos = (id) => {
    const index = fotos.findIndex((foto) => foto.id === id);
    fotos[index].liked = !fotos[index].liked;
    setFotos([...fotos]);
  };

  return (
    <MyContext.Provider value={{ fotos, setFavoritos }}>
      <div className="App">
        <Navigation />
        <Routes>
          <Route element={<Home />} index />
          <Route path="favoritos" element={<Favoritos />} />
        </Routes>
      </div>
    </MyContext.Provider>
  );
}
export default App;
