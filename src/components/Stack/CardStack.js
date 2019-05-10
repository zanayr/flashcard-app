import React, {Component} from 'react';

import * as create from '../../store/models/models';
import * as utility from '../../utility/utility';

import DisplayTag from '../ui/Tag/DisplayTag';
import Button from '../ui/button/Button/Button';

import styles from './CardStack.module.css';


const Card = (props) => {
    let css = [styles.Card];
    let display = (
        <div>
            <p>{props.data.primary}</p>
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
    if (props.position && !props.data.selected) {
        css.push(styles.Under);
    }
    if (props.position && props.data.selected) {
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
                zIndex: props.data.zIndex}}
            onClick={handle_onClick}>
            {display}
        </article>
    )
}

class CardStack extends Component {
    state = {
        cards: [],
        max: 4,
        mode: 1
    }

    _flipCard (card) {
        this.setState(prev => ({
            ...prev,
            cards: prev.cards.map(c => {
                if (c.id === card.id) {
                    c.flipped = !c.flipped;
                } else {
                    c.flipped = false;
                }
                return c;
            })
        }));
    }
    _selectCard (card) {
        this.setState(prev => ({
            ...prev,
            cards: prev.cards.map((c, i) => {
                if (c.id === card.id) {
                    c.selected = true;
                } else {
                    c.selected = false;
                }
                return c;
            })
        }));
    }

    handle_onCardSelect = (card) => {
        if (!card.selected) {
            this._selectCard(card);
            if (card.top) {
                this._flipCard(card);
            }
        } else if (card.selected) {
            this._flipCard(card);
        }
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps.collection.length !== prevState.cards.length) {
            const cards = nextProps.collection.map(card => {
                return create.displayCardViewModel(card);
            }).reverse();
            cards[0].top = true;
            return {
                cards: cards
            };
        }
        return null;
    }

    render () {
        const cards = [];
        let count = 0;
        for (count; count < this.state.cards.length; count++) {
            const card = this.state.cards[count];
            if (card.selected) {
                card.zIndex = this.state.max;
            } else {
                card.zIndex = this.state.max - (count + 1);
            }
            if (count < this.state.max) {
                cards.push((
                    <Card
                        data={card}
                        key={card.id}
                        position={count}
                        onSelect={() => this.handle_onCardSelect(card)}>
                        <Button
                            className={styles.ActionButton}
                            onClick={() => this.onAction(card)}>
                            x
                        </Button>
                    </Card>
                ));
            } else {
                break;
            }
        }

        return (
            <div
                className={styles.Stack}
                style={{height: 168 + (count * 24)}}>
                {cards}
            </div>
        );
    }
}


export default CardStack;