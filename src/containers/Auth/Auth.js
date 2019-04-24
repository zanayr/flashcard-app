import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import AuthForm from '../../components/Form/Auth/AuthForm';

import AppCSS from '../../App.module.css';
import AuthCSS from './Auth.module.css';

class Auth extends Component {
    render() {
        let markup = (<AuthForm/>);
        if (this.props.loading) {
            markup = (
                <h1>Loading...</h1>
            );
        }
        if (this.props.isAuthenticated) {
            markup = (
                <Redirect to="/u"/>
            );
        }
        return (
            <main className={AuthCSS.Open}>
                <div className={AppCSS.Inner}>
                    {markup}
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps, null)(Auth);

/*
const mapStateToProps = state => {
    // foo: state.foo
    // ^ component prop that refences reducer state
    //      ^ reducer state and property
    // this.props.foo replaces this.state.foo
}
const mapDispatchToProps = dispatch => {
    // onFoo: (arg) => dispatch({type: actionTypes.FOO, payload: {name: arg, value: 1}});
    // ^ component prop that references dispatch method
    // (arg) => {this.props.onFoo(arg)};
}
*/

//  export default connect(mapStateToProps, mapDispatchToProps)(Auth);

/*
NOTE:   split up action file
TIP:    export {
            foo,
            bar,
            spa,
        } from 'js file'; import everything as one

1.  create a new action creator:
export const foo = (payload) => {
    return {
        type: FOO
        payload: payload
                 ^ same name as reducer
    }
};

2.  import action
import {foo} from 'actions/actions'

3.  implement in the mapDispatchToProps function
const mapDispatchToProps = dispatch => {
    onFoo: () => dispatch(foo());
                             ^ execute it becuse it returns an action

}

Redux-thunk async action creator
NOTE:   We tend to make async action creators call sync actions:
export const barSync = (payload) => {
    return {
        type: FOO,
        payload: payload
    }
}
export const fooAsync = (payload) => {
    return (dispatch, getState) => {
           ^ thunk provides this action
        setTimout(() => {
            const spam = getState().property
                         ^ great utility, but don't over use it,
                           passing states is better
            dispatch(payload);
            ^ dispatch whichever function we want to dispatch
            ^ execute because it returns an action
        }, 2000);
        ^ async code goes here
    }
};

*/