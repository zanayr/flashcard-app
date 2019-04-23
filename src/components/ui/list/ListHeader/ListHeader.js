import React from 'react';

import GlobalCSS from '../../../../Global.module.css';
import ListHeaderCSS from './ListHeader.module.css';

const listHeader = (props) => {
    return (
        <section className={[GlobalCSS.With_Margin, ListHeaderCSS.List_Header].join(' ')}>
            <div className={GlobalCSS.Inner}>
                <h1>{props.children}</h1>
            </div>
        </section>
    )
}

export default listHeader;