import React from 'react';
import {connect} from 'react-redux';

import * as select from '../../store/reducers/root';


const withUser = (WrappedComponent) => {
    return (
        <WrappedComponent
            user={...props.select_user}
            {...props}/>
    )
}


const mapStateToProps = state => {
    return {
        select_user: select.user(state)
    }
}

export default connect(mapStateToProps)(withUser);