import React, {Component} from 'react';

import * as create from '../../store/models/models';
import * as utility from '../../utility/utility';

import DisplayTag from '../ui/Tag/DisplayTag';

import styles from './CardStack.module.css';


const Card = (props) => {
    let css = [styles.Card];
    let display = (
        <div>
            <p>{props.data.primary}</p>
            {props.children}
        </div>
    );
    if (props.data.flipped) {
        display = (
            <div>
                <p>{props.data.secondary}</p>
                {props.children}
                <div className={styles.TagList}>
                    <div>
                        <p>{props.data.tags.join(', ')}</p>
                    </div>
                </div>
            </div>
        );
    }
    if (props.position && !props.data.top) {
        css.push(styles.Under);
    }
    if (props.position && props.data.top) {
        css.push(styles.Pulled);
    }

    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onSelect();
    }

    return (
        <article
            className={css.join(' ')}
            style={{
                bottom: props.position * 24,
                zIndex: props.zIndex}}
            onClick={handle_onClick}>
            {display}
        </article>
    )
}

class CardStack extends Component {
    state = {
        cards: this.props.collection.map((card, i) => {
            let model = create.displayCardViewModel(card);
            if (!i) {
                model.top = true;
            }
            return model;
        }),
        mode: 1,
        zStack: this.props.collection.map(card => {return card.id}).reverse()
    }

    handle_onCardSelect = (id) => {
        if (this.state.zStack.indexOf(id) === this.state.zStack.length - 1) {
            if (this.state.mode) {
                this.setState(prev => ({
                    ...prev,
                    cards: prev.cards.map(card => {
                        if (card.id === id) {
                            card.flipped = !card.flipped;
                        }
                        return card;
                    })
                }));
            }
        } else {
            let zStack = this.state.zStack.filter(i => i !== id);
            zStack.push(id);
            this.setState(prev => ({
                ...prev,
                zStack: zStack
            }));
            this.setState(prev => ({
                ...prev,
                cards: prev.cards.map(card => {
                    if (card.id === id) {
                        card.top = true;
                    } else {
                        card.top = false;
                    }
                    card.flipped = false;
                    return card
                })
            }));
        }
    }

    render () {
        let cards = null;
        if (this.state.cards.length) {
            cards = this.state.cards.map((card, i) => {
                return (
                    <Card
                        data={card}
                        key={card.id}
                        position={i}
                        zIndex={this.state.zStack.indexOf(card.id)}
                        onSelect={() => this.handle_onCardSelect(card.id)}/>
                );
            })
        }
        return (
            <div
                className={styles.Stack}
                style={{height: 168 + (this.props.collection.length * 24)}}>
                {cards}
            </div>
        );
    }
}


export default CardStack;