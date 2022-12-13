import React from 'react';
import FilaCentral from './FilaCentral';
import TarjetasResumen from './TarjetasResumen';
import TablaActividades from './TablaActividades';

function ContenedorPrincipal(){
    return(
        <React.Fragment>

				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Centro de Actividades</h1>
					</div>
					<TarjetasResumen />
					<FilaCentral />
					<TablaActividades />
	
				</div>

        </React.Fragment>
    )

}
export default ContenedorPrincipal;