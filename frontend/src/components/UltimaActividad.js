import React, { useEffect, useState } from 'react';

function UltimaActividad(){
    const [ultimaActividad, setUltimaActividad] = useState({})

    useEffect(()=>{
        fetch(`/api/products`)
      .then((response) => response.json())
      .then((data) => {
        let indice = data.products.length - 1
        let actividad = data.products[indice]
        setUltimaActividad(actividad)
    })
    .catch((error) => {
        console.log(error);
    });
}, [])

console.log(ultimaActividad);
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Última actividad agregada: {ultimaActividad.name}</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={ultimaActividad.image} alt=" Star Wars - Mandalorian "/>
                    </div>
                    <p>{ultimaActividad.description}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Mostrar detalle</a>
                </div>
            </div>
        </div>
    )
}

export default UltimaActividad;
