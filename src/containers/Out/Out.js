import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import {Redirect} from 'react-router-dom';


class Logout extends Component {
    componentDidMount() {
        this.props.authOut_async();
    }

    render() {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authOut_async: () => dispatch(actions.authOut_async())
    };
};

export default connect(null, mapDispatchToProps)(Logout);