import React from 'react';

import ThrobberCSS from './Throbber.module.css';

const throbber = (props) => {
    return (
        <div className={ThrobberCSS.Throbber}>Loading...</div>
    );
}

export default throbber;