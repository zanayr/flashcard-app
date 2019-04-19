import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import Header from '../../../components/ui/header/Header';
import Aside from '../../../components/ui/asides/Aside';
import QuickAction from '../../../components/ui/action/QuickAction';
import List from '../../../components/ui/list/List';
import ListItem from '../../../components/ui/list/item/ListItem';

import '../../../style.css';
import globalCSS from '../../../Global.module.css';
import MainCSS from './Main.module.css';

class Main extends Component {
    state = {
        asideActive: false,
        asideState: 0,
        quickActionState: 0,
        collections: []
    }

    
    /*
    componentDidMount() {
        //this.props.onModalCreate("Hello world!");
        //this.props.onModalCreate("Foobar!");
    }*/

    createDeck() {
        this.setState((prevState) => ({
            ...prevState,
            collections: [
                ...prevState.collections,
                {
                    title: "Lorem Ipsum",
                    detail: "Dolor set ahmet exequitor serim fa."
                }
            ]
        }));
    }
    startSession() {
        console.log("Starting Session...");
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
        if (c !== this.state.asideState) {
            this.setState((prevState) => ({
                ...prevState,
                asideState: c
            }));
        }
    }
    onQuickAction_Clicked() {
        if (this.state.quickActionState) {
            this.startSession();
        } else {
            this.createDeck();
        }
    }

    render() {
        console.log("rendering the main...");
        
        const collections = this.state.collections.map(item => {
            return (
                <ListItem
                    detail={item.detail}
                    key={this.state.collections.indexOf(item)}
                    listItemId={this.state.collections.indexOf(item)}
                    title={item.title}/>
            );
        });

        return (
            <main
                className={MainCSS.Default}
                onClick={this.closeAside.bind(this)}>
                <div className={globalCSS.Inner}>
                    <Header toggleAside={this.toggleAside.bind(this)} updateAside={this.updateAside.bind(this)}/>
                    <Aside active={this.state.asideActive} asideState={this.state.asideState}/>
                    <QuickAction
                        onClick={this.onQuickAction_Clicked.bind(this)}
                        quickActionState={this.state.quickActionState}/>
                    <List>
                        {collections}
                    </List>
                </div>
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