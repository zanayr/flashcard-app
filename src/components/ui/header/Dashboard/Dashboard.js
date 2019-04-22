import React from 'react';

import CircleButton from '../../button/circle/CircleButton';
import IconButton from '../../button/icon/IconButton';

import GlobalCSS from '../../../../Global.module.css';
import DashboardCSS from './Dashboard.module.css';

const dashboard = (props) => {
    const handle_onAccountClicked = () => {
        //  Go to Account Page
        console.log("Routing to account page...");
    }
    const handle_onNavigationClicked = () => {
        const data = {
            asideState: 1
        }

        props.onNavigation(data);
    }
    return (
        <div className={DashboardCSS.Dashboard}>
            <div className={[GlobalCSS.Inner, DashboardCSS.Inner].join(' ')}>
                <div className={DashboardCSS.Account}>
                    <h6 className={DashboardCSS.Account_Name}>Ryan Fickencher</h6>
                </div>
                <CircleButton onClick={handle_onAccountClicked}>RF</CircleButton>
                <IconButton onClick={handle_onNavigationClicked}>N</IconButton>
            </div>
        </div>
    );
};

export default dashboard;