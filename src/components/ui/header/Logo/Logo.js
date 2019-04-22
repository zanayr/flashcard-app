import React from 'react';

import LogoCSS from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={LogoCSS.Logo}>
            <div className={LogoCSS.Inner}>
                <a href="/"><span></span></a>
            </div>           
        </div>
    );
}

export default logo;