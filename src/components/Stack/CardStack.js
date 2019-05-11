import React, {Component} from 'react';

import * as create from '../../store/models/models';

import Button from '../ui/button/Button/Button';
import Card from '../ui/Card/Card';

import styles from './CardStack.module.css';


class CardStack extends Component {
    state = {
        cards: [],
        max: this.props.max,
        mode: 1
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps.collection.length !== prevState.cards.length) {
            const cards = nextProps.collection.map(card => {
                return create.displayCardViewModel(card);
            }).reverse();
            if (cards.length) {
                cards[0].selected = true;
            }
            return {
                cards: cards
            };
        }
        return null;
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
        } else if (card.selected) {
            this._flipCard(card);
        }
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
                            onClick={() => this.props.onAction(card)}>
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