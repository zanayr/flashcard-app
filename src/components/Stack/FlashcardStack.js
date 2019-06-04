import React, {Component} from 'react';

import * as create from '../../store/models/models';

import Button from '../ui/button/Button/Button';
import Flashcard from '../ui/Card/Flashcard';

import styles from './CardStack.module.css';


class FlashcardStack extends Component {
    state = {
        cards: this.props.collection,
        current: 0,
        state: 0
    }

    incrementCurrent (i) {
        this.setState(prev => ({
            ...prev,
            current: prev.current + i
        }));
    }
    toggleState () {
        this.setState(prev => ({
            ...prev,
            state: 1 - prev.state
        }));
    }

    handle_onNextClick = () => {
        if (this.state.state) {
            if (this.state.current < this.state.cards.length - 1) {
                this.incrementCurrent(1);
            }
            this.toggleState();
        } else {
            this.toggleState();
        }
    }
    handle_onPrevClick = () => {
        if (this.state.state) {
            this.toggleState();
        } else {
            if (this.state.current > 0) {
                this.incrementCurrent(-1);
            }
            this.toggleState();
        }
    }

    render () {
        const card = this.state.cards[this.state.current];
        return (
            <div className={styles.FlashcardStack}>
                <Flashcard
                    actions={{
                        next: this.handle_onNextClick,
                        prev: this.handle_onPrevClick
                    }}
                    data={card}
                    state={this.state.state}>
                    <Button
                        className={styles.ActionButton}
                        onClick={() => this.props.onAction(card)}>
                        ⚑
                    </Button>
                </Flashcard>
            </div>
        );
    }
}


export default FlashcardStack;