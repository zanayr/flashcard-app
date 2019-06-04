import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as select from '../../../store/reducers/root';

import Aux from '../../../hoc/Aux/Aux';
import CountingTextField from '../../ui/input/Field/CountingTextField';
import Textarea from '../../ui/input/TextArea/Textarea';
import Button from '../../ui/button/Button/Button';

import styles from './ProfileForm.module.css';

class CreateForm extends Component {
    state = {
        email: this.props.user.info.email,
        note: this.props.user.note,
        primary: this.props.user.primary,
        privialige: this.props.user.privialige,
        secondary: this.props.user.secondary,
        user: this.props.user.info.user
    }
    form = React.createRef();


    _updateUser (target, value) {
        this.setState(prev => ({
            ...prev,
            [target]: value
        }));
    }


    hanlde_onUserChange = (target, value) => {
        this._updateUser(target, value);
    }
    handle_onFormConfirm = () => {
        this.props.onConfirm({
            ...this.props.user,
            info: {
                email: this.state.email,
                user: this.state.user
            },
            note: this.state.note,
            primary: this.state.primary,
            // privialige: this.state.privialige,
            secondary: this.state.secondary
        });
    }
    handle_onPasswordReset = () => {
        //  Do Stuff
    }


    render () {
        return (
            <Aux>
                <form
                    className={styles.Basics}
                    ref={this.basicsForm}>
                    <div>
                        <h3>Basic Info</h3>
                        <CountingTextField
                            config={{
                                autoComplete: 'off',
                                label: 'First',
                                maxLength: 32,
                                name: 'primary',
                                tabIndex: 1,
                            }}
                            key='primary'
                            required
                            value={this.state.primary}
                            onChange={(value) => this.hanlde_onUserChange('primary', value)}/>
                        <CountingTextField
                            config={{
                                autoComplete: 'off',
                                label: 'Last',
                                maxLength: 32,
                                name: 'secondary',
                                tabIndex: 2
                            }}
                            key='secondary'
                            required
                            value={this.state.secondary}
                            onChange={(value) => this.hanlde_onUserChange('secondary', value)}/>
                        <h3>Account Info</h3>
                        {/*  Privilage Level  */}
                        <CountingTextField
                            config={{
                                autoComplete: 'off',
                                label: 'Account Email',
                                maxLength: 64,
                                name: 'email',
                                tabIndex: 3
                            }}
                            key='email'
                            required
                            value={this.state.email}
                            onChange={(value) => this.hanlde_onUserChange('email', value)}/>
                        <CountingTextField
                            config={{
                                autoComplete: 'off',
                                label: 'User Name',
                                maxLength: 64,
                                name: 'user',
                                tabIndex: 2
                            }}
                            key='user'
                            required
                            value={this.state.user}
                            onChange={(value) => this.hanlde_onUserChange('user', value)}/>
                        <Button onClick={this.handle_onPasswordReset}>Password Reset</Button>
                        <h3>User Notes</h3>
                        <Textarea
                            config={{
                                autoComplete: 'off',
                                label: 'Notes',
                                maxLength: 128,
                                name: 'notes',
                                tabIndex: 3
                            }}
                            key='note'
                            value={this.state.note}
                            onChange={(value) => this.hanlde_onUserChange('note', value)}/>
                    </div>
                </form>
                <Button
                    tabIndex={6}
                    onClick={this.handle_onFormConfirm}>
                    Save
                </Button>
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        update_async: (store, collection, token, id, tag) => dispatch(actions.updateTag_async(store, collection, token, id, tag)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);