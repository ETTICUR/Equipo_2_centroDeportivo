import React from 'react';
import UltimaActividad from './UltimaActividad';
import Categorias from './Categorias';

function FilaCentral(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <UltimaActividad />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <Categorias />

        </div>
    )
}

export default FilaCentral;