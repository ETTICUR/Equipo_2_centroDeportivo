import React, { useEffect, useState } from "react";
import TarjetaCategoria from "./TarjetaCategoria";

function GenresInDb() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(`/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data.countByCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categorias
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {categorias.map((categoria, index) => {
              return <TarjetaCategoria {...categoria} key={index}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenresInDb;
