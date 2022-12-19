import React from 'react';
import image from '../assets/images/Logo Centro Deportivo.png';
import ContentWrapper from './ContentWrapper';
import Categorias from './Categorias';
//import UltimaActividad from './UltimaActividad';
import TarjetasResumen from './TarjetasResumen';
import ResumenActividades from './ResumenActividades';
import '../assets/css/miCss.css';
import NotFound from './NotFound';
import {Link, Route, Switch} from 'react-router-dom';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="contentLogo d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="logo" src={image} alt="Digital House"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-solid fa-list"></i>
                        <span>Opciones</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/categorias">
                        <i className="fas fa-regular fa-dumbbell"></i>
                        <span>Categorias</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/resumenActividades">
                        <i className="fas fa-clipboard-list"></i>
                        <span>Actividades</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item nav-link">
                    <Link className="nav-link" to="/tarjetasResumen">
                    <i className="fas fa-solid fa-pen-nib"></i>
                        <span>Resúmen</span>
                    </Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}


            {/*<!-- End Microdesafio 2 -->*/}
            <Switch>
                <Route exact path="/">
                    <ContentWrapper />
                </Route>
                <Route path="/Categorias">
                    <Categorias />
                </Route>
                <Route path="/resumenActividades">
                    <ResumenActividades />
                </Route>
                <Route path="/tarjetasResumen">
                    <TarjetasResumen />
                </Route>
                <Route component={NotFound} />
            </Switch>
            {/*<!-- End Microdesafio 2 -->*/}
        </React.Fragment>
    )
}
export default SideBar;