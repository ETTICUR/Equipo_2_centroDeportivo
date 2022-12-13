import React from 'react';


function FilaTablaActividades(props){
    return (
                <tr>
                    <td>{props.id}</td>
                    <td>{props.name}</td>
                    <td>{props.description}</td>
                </tr>
            )
    }



export default FilaTablaActividades;