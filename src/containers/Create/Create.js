import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';

import CreateForm from '../../components/form/Create/CreateForm';
import CardStack from '../../components/Stack/CardStack';

import styles from './Create.module.css';

class Create extends Component {
    state = {
        cards: []
    }

    _addCard (card) {
        this.setState(prev => ({
            ...prev,
            cards: prev.cards.concat(card)
        }));
    }
    _removeCard (card) {
        this.setState(prev => ({
            ...prev,
            cards: prev.cards.filter(c => c.id !== card.id)
        }));
        this.props.deleteCard_async(this.props.select_token, card);
    }

    handle_onCardCreate = (card) => {
        this._addCard(card);
        this.props.addCard_async(this.props.select_token, {
            id: card.id,
            item: create.cardModel(card)
        });
    }
    handle_onCardDelete = (card) => {
        this._removeCard(card);
    }


    render () {
        return (
            <main className={styles.Creator}>
                <div>
                    <section className={styles.Editor}>
                        <div>
                            <div className={styles.Wrapper}>
                                <CreateForm onCreate={this.handle_onCardCreate}/>
                            </div>
                        </div>
                    </section>
                    <section className={styles.Board}>
                        <div>
                            <div className={styles.Wrapper}>
                                <CardStack
                                    collection={this.state.cards}
                                    max={21}
                                    onAction={this.handle_onCardDelete}/>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        )
    }
}


const mapStateToProps = state => {
    return {
        select_token: select.authToken(state),
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteCard_async: (token, item) => dispatch(actions.deleteCard_async(token, item)),
        addCard_async: (token, item) => dispatch(actions.addCard_async(token, item)),
        putTag_async: (category, token, user, data) => dispatch(actions.putTag_async(category, token, user, data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Create);