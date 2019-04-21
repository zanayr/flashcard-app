import React from 'react';

import logoCSS from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={logoCSS.Logo}>
            <div className={logoCSS.Inner}>
                <a href="/"><span></span></a>
            </div>           
        </div>
    );
}

export default logo;