import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import Header from '../../../components/ui/header/Header';
import Aside from '../../../components/ui/asides/Aside';

import '../../../style.css';
import MainCSS from './Main.module.css';

class Main extends Component {
    componentDidMount() {
        this.props.onModalCreate("Hello world!");
        this.props.onModalCreate("Foobar!");
    }

    render() {
        return (
            <main className={MainCSS.Default}>
                <Header/>
                <Aside active/>
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