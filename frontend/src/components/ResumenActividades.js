import React, {useState, useEffect} from 'react';
import ResumenActividadesCard from './ResumenActividadesCard';
import '../assets/css/miCss.css';

function ResumenActividades() {

    const [actividades, setActividades] = useState([]);

    useEffect(()=>{

        fetch(`/api/products`)
			.then(response => response.json())
			.then(data => {
                setActividades(data.products)
			})
            .catch((error)=>{
                console.log(error);
            })
    }, [])


    return (
        <div className="col-lg-10 mb-4 ">
            <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">Detalle de Actividades </h5>
            </div>
            <div className="cardActividades shadow mb-4">
                
                {
                    actividades.map((actividad, index) => {
                        return <ResumenActividadesCard {...actividad} key={index}/>
                    })
                }

            </div>
        </div>
    )
}

export default ResumenActividades;