import React, {Component} from 'react';

import * as create from '../../store/models/models';
import * as utility from '../../utility/utility';

import DisplayTag from '../ui/Tag/DisplayTag';
import Button from '../ui/button/Button/Button';

import styles from './CardStack.module.css';


const Card = (props) => {
    let css = [styles.Card];
    console.log(props.data.top);
    let display = (
        <div>
            <p>{props.data.primary}</p>
            {props.data.top ? props.children : null}
        </div>
    );
    if (props.data.flipped) {
        display = (
            <div>
                <p>{props.data.secondary}</p>
                {props.children}
                <div className={styles.TagList}>
                    <div>
                        <p>{props.data.tag.join(', ')}</p>
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
    console.log(props);
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
        cards: [],
        mode: 1,
        zStack: []
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps.collection.length !== prevState.cards.length) {
            return {
                cards: nextProps.collection,
                zStack: nextProps.collection.map(card => {return card.id}).reverse()
            };
        }
        return null;
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
                        onSelect={() => this.handle_onCardSelect(card.id)}>
                        <Button
                            className={styles.ActionButton}
                            onClick={() => this.handle_onDelete(card.id)}>
                            x
                        </Button>
                    </Card>
                );
            });
        }
        console.log(cards);
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