import React from 'react';

function ResumenActividadesCard(props) {

    return (
        <div className="card-body col-lg-6 d-block">
            <div className="text-center">
                <h6 className="m-0 font-weight-bold text-gray-800">{props.name}</h6>
                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={props.image} alt=" Star Wars - Mandalorian "/>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default ResumenActividadesCard;