import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import * as utility from '../../utility/utility';

import {Redirect} from 'react-router-dom';
import Throbber from '../../components/ui/Throbber/Throbber';

import styles from './In.module.css';


class In extends Component {

    // componentDidUpdate (prevProps, prevState) {
    //     if (JSON.stringify(prevProps.select_cards) !== JSON.stringify(this.props.select_cards)) {
    //         const cards = Object.keys(this.props.select_cards).map(id => {return this.props.select_cards[id]});
    //         const japanese = [];
    //         const spanish = [];
    //         const test = [];
    //         const start = new Date(1556200000000);
    //         const end = new Date(1559940000000);

    //         cards.forEach(card => {
    //             if (card.group.includes('japanese')) {
    //                 japanese.push(card);
    //             } else if (card.group.includes('spanish')) {
    //                 spanish.push(card);
    //             } else {
    //                 test.push(card);
    //             }
    //         });

    //         for (let j = 0; j < 50; j++) {
    //             let session = utility.createHashId(j);
    //             let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime();
    //             japanese.forEach(card => {
    //                 card.meta = {
    //                     ...card.meta,
    //                     [session]: {
    //                         date: date,
    //                         time: Math.floor(Math.random() * 15000) + 2500
    //                     }
    //                 };
    //             });
    //         }
    //         for (let s = 0; s < 100; s++) {
    //             let session = utility.createHashId(s);
    //             let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime();
    //             spanish.forEach(card => {
    //                 card.meta = {
    //                     ...card.meta,
    //                     [session]: {
    //                         date: date,
    //                         time: Math.floor(Math.random() * 15000) + 2500
    //                     }
    //                 };
    //             });
    //         }
    //         for (let t = 0; t < 3; t++) {
    //             let session = utility.createHashId(t);
    //             let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime();
    //             test.forEach(card => {
    //                 card.meta = {
    //                     ...card.meta,
    //                     [session]: {
    //                         date: date,
    //                         time: Math.floor(Math.random() * 15000) + 2500
    //                     }
    //                 };
    //             });
    //         }
    //         japanese.forEach(card => {
    //             this.props.update_async('card', this.props.select_authToken, card);
    //         });
    //         spanish.forEach(card => {
    //             this.props.update_async('card', this.props.select_authToken, card);
    //         });
    //         test.forEach(card => {
    //             this.props.update_async('card', this.props.select_authToken, card);
    //         });
    //     }
    // }



    componentDidMount() {
        this.props.get_async('user', this.props.select_authToken, this.props.select_authUser);
        this.props.getAll_async('card', this.props.select_authToken, this.props.select_authUser);
        this.props.getAll_async('deck', this.props.select_authToken, this.props.select_authUser);
    }

    
    render() {
        let content = (<Throbber className={styles.Throbber}/>);
        if (!this.props.select_decksIsLoading && !this.props.select_cardsIsLoading && !this.props.select_userIsLoading) {
            if (this.props.select_user.suspend) {
                content = <Redirect to={{
                    pathname: '/alt',
                    state: {
                        message: 'Your account has been suspended. Please contact the administrator to resolve this issue.'
                    }
                }}/>;
            } else {
                content = <Redirect to='/0/deck'/>;
            }
        }

        return (
            <main className={styles.In}>
                <div>
                    {content}
                </div>
            </main>
        )
    }
}


const mapStateToProps = state => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_user: select.user(state),
        select_cards: select.cards(state),
        select_cardsIsLoading: select.cardsIsLoading(state),
        select_decksIsLoading: select.decksIsLoading(state),
        select_userIsLoading: select.userIsLoading(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        update_async: (store, token, id) => dispatch(actions.update_async(store, token, id)),
        get_async: (store, token, id) => dispatch(actions.get_async(store, token, id)),
        getAll_async: (store, token, user) => dispatch(actions.getAll_async(store, token, user)),
        getAllUsers_async: (token) => dispatch(actions.getAllUsers_async(token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(In);