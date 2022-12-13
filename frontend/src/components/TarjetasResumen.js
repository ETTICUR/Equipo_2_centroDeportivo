import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard";

function ContentRowMovies() {
  const [cantCategorias, setCantCategorias] = useState();
  const [cantUsuarios, setCantUsuarios] = useState();
  const [cantActividades, setCantActividades] = useState();

  useEffect(() => {
    fetch(`/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setCantCategorias(data.countByCategory.length);
        setCantActividades(data.count);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(`/api/users`)
      .then((response) => response.json())
      .then((data) => {
        setCantUsuarios(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let actividades = {
    title: "Cantidad de Actividades",
    color: "primary",
    cuantity: cantActividades,
    icon: "fa-clipboard-list",
  };

  /* <!-- Total awards --> */

  let categorias = {
    title: " Cantidad de Categorias",
    color: "success",
    cuantity: cantCategorias,
    icon: "fa-regular fa-dumbbell",
  };

  /* <!-- Actors quantity --> */

  let usuarios = {
    title: "Cantidad de Usuarios",
    color: "warning",
    cuantity: cantUsuarios,
    icon: "fa-user-check",
  };

  let cartProps = [actividades, categorias, usuarios];

  return (
    <div className="row">
      {cartProps.map((movie, i) => {
        return <SmallCard {...movie} key={i} />;
      })}
    </div>
  );
}

export default ContentRowMovies;
