import React, { Fragment } from 'react';
import ReactDOM from "react-dom" ;
import classes from "./Modal.module.css";

const Overlay = (props) => {
    return(
        <div className={`${props.className} ${classes.modal}`}>
            {props.children}
        </div>
    );
};


const Backdrop = (props) => {
    return(
        <div className={classes.backdrop}></div>
    );
};


const portalEl = document.getElementById('portaloverlay');

const Modal = (props) => {
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop/>, portalEl)}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalEl)}
        </Fragment>
    );
}

export default Modal;