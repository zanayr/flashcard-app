import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import Header from '../../../components/ui/header/Header';
import Aside from '../../../components/ui/asides/Aside';
import QuickAction from '../../../components/ui/action/QuickAction';

import '../../../style.css';
import MainCSS from './Main.module.css';

class Main extends Component {
    state = {
        asideActive: false,
        asideState: 0,
        quickActionState: 1
    }
    componentDidMount() {
        //this.props.onModalCreate("Hello world!");
        //this.props.onModalCreate("Foobar!");
    }

    closeAside() {
        this.setState((prevState) => ({
            ...prevState,
            asideActive: false
        }));
    }
    toggleAside() {
        if (!this.state.asideActive) {
            this.setState((prevState) => ({
                ...prevState,
                asideActive: !prevState.asideActive
            }));
        }
    }
    updateAside(c) {
        this.setState((prevState) => ({
            ...prevState,
            asideState: c
        }));
    }

    render() {
        return (
            <main
                className={MainCSS.Default}
                onClick={this.closeAside.bind(this)}>
                <Header toggleAside={this.toggleAside.bind(this)} updateAside={this.updateAside.bind(this)}/>
                <Aside active={this.state.asideActive} current={this.state.asideState}/>
                <QuickAction quickActionState={this.state.quickActionState}/>
                <Link to="/logout">Logout</Link>
            </main>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onModalCreate: (m) => dispatch(actions.modalCreate(m))
    };
};

export default connect(null, mapDispatchToProps)(Main);
//export default Main;