import React, {Component} from 'react';

import Button from '../ui/button/Button/Button';
import Flashcard from '../ui/Card/Flashcard';

import styles from './CardStack.module.css';

export class FlashcardStack extends Component {
    state = {
        cards: this.props.collection.map(card => {
            card.seen = false;
            return card;
        }),
        current: 0,
        state: 0,
        timestamp: Date.now()
    }
    updated = false;

    incrementCurrent (i) {
        this.setState(prev => ({
            ...prev,
            current: prev.current + i
        }));
    }
    resetTimestamp () {
        this.setState(prev => ({
            ...prev,
            timestamp: Date.now()
        }));
    }
    toggleFlag () {
        const cards = this.state.cards.slice();
        const card = cards[this.state.current];
        if (card.tag.includes('&flagged')) {
            card.tag = card.tag.filter(tag => tag !== '&flagged');
        } else {
            card.tag = card.tag.concat('&flagged');
        }
        this.setState(prev => ({
            ...prev,
            cards: cards
        }));
    }
    toggleSeen () {
        const cards = this.state.cards.slice();
        const card = cards[this.state.current];
        if (!card.seen) {
            card.seen = true;
        }
        this.setState(prev => ({
            ...prev,
            cards: cards
        }));
    }
    toggleState () {
        this.setState(prev => ({
            ...prev,
            state: 1 - prev.state
        }));
    }

    _setCardMeta () {
        const card = this.state.cards[this.state.current];
        const date = Date.now();
        if (!card.seen) {
            this.props.actions.update(card, {
                date: date,
                time: date - this.state.timestamp
            });
        }
    }

    handle_onFlagClick = () => {
        this.toggleFlag();
        this.props.actions.flag(this.state.cards[this.state.current]);

    }
    handle_onNextClick = () => {
        if (this.state.state) {
            if (this.state.current < this.state.cards.length - 1) {
                this.resetTimestamp();
                this.incrementCurrent(1);
            } else {
                this.props.actions.change(1);
            }
            this.toggleState();
        } else {
            this._setCardMeta();
            this.toggleSeen();
            this.toggleState();
        }
    }
    handle_onPrevClick = () => {
        if (this.state.state) {
            this.toggleState();
        } else {
            if (this.state.current > 0) {
                this.incrementCurrent(-1);
                this.props.actions.change(0);
            }
            this.toggleState();
        }
    }

    render () {
        if (!this.state.cards.length) {
            throw new Error('No Cards to Study!');
        }
        return (
            <div className={styles.FlashcardStack}>
                <Flashcard
                    actions={{
                        next: this.handle_onNextClick,
                        prev: this.handle_onPrevClick
                    }}
                    data={this.state.cards[this.state.current]}
                    state={this.state.state}>
                    <Button
                        className={styles.ActionButton}
                        onClick={this.handle_onFlagClick}>
                        ⚑
                    </Button>
                </Flashcard>
            </div>
        );
    }
}


export default FlashcardStack;