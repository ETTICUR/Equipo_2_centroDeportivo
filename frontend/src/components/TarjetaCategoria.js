import React from "react";

function TarjetaCategoria(props) {
  return(
  <div className="col-lg-6 mb-4">
    <div className="card bg-dark text-white shadow">
      <div className="card-body">
        {props.Nombre} : {props.Cantidad}
      </div>
    </div>
  </div>
  )
}

export default TarjetaCategoria
