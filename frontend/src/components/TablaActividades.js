import React, { useState, useEffect } from 'react';
import FilaTablaActividades from './FilaTablaActividades';


function Chart (){
    const [actividades, setActividades] = useState([])

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
        <div className="card shadow mb-4">
            <div className="card-header py-3" >
                <h5 className="m-0 font-weight-bold text-gray-800">Actividades en Base de Datos</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                actividades.map( ( row , i) => {
                                    return <FilaTablaActividades { ...row} key={i}/>
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Chart;