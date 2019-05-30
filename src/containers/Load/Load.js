import React, {Component} from 'react';

import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import * as select from '../../store/reducers/root';

import {Redirect} from 'react-router-dom';
import Throbber from '../../components/ui/Throbber/Throbber';


class Load extends Component {
    state = {
        loading: true
    }

    componentDidMount () {
        this.props.add_async('deck', this.props.select_authToken, this.props.location.state.data);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.select_isLoading) {
            this.setState({loading: this.props.select_isLoading});
        }
    }

    render () {
        console.log(this.props);
        let content = (<Throbber/>);
        if (!this.state.loading) {
            content = <Redirect to={'/0/deck/' + this.props.location.state.data.id}/>
        }
        return (
            <main>
                <div>
                    {content}
                </div>
            </main>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        select_authToken: select.authToken(state),
        select_isLoading: select.decksIsLoading(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add_async: (store, token, items) => dispatch(actions.add_async(store, token, items))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Load);