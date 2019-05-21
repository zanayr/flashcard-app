import React from 'react';
import {connect} from 'react-redux';

import * as select from '../../store/reducers/root';


const withUser = (WrappedComponent) => (props) => {
    return (
        <WrappedComponent
            user={props.select_user}
            token={props.select_authToken}
            {...props}/>
    )
}

export default withUser;