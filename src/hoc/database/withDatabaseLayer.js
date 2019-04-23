import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';

export default function withDatabaseLayer (WrappedComponent) {
    class With extends Component {
        state = {
            data: []
        }
        componentDidMount () {
            this.props.loadDecks(this.props.token, this.props.userId);
        }
        render () {
            if (this.props.loading) {
              return null
            }
            return <WrappedComponent data={this.props.decks} {...this.props} />
          }
    }

    const mapStateToProps = state => {
        return {
            token: state.auth.token,
            userId: state.auth.userId,
            decks: state.deck.decks,
            loading: state.deck.isLoading
        }   
    }
    const mapDispatchToProps = dispatch => {
        return {
            loadDecks: (t, u) => dispatch(actions.deckGet_async(t, u))
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(With)
}
