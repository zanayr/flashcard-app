import React from 'react';

import AppCSS from '../../App.module.css';


const wrapper = props => {
    let classes = [];
    if (props.className) {
        classes = props.className;
    }
    return (
        <div className={[AppCSS.Outer, ...classes].join(' ')}>
            <div className={AppCSS.Inner}>
                {props.children}
            </div>
        </div>
    );
}


export default wrapper;