import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as select from '../../../store/reducers/root';
import * as utility from '../../../utility/utility';

import Aux from '../../../hoc/Aux/Aux';
import TagField2 from '../../ui/input/Tag/TagField2';
import TagEditor from '../../ui/input/Tag/TagEditor';
import Tag2 from '../../ui/Tag/Tag2';
import Button from '../../ui/button/Button/Button';

import styles from './TagForm.module.css';


class PinnableTagForm extends Component {
    state = {
        value: ''
    }

    _resetValue () {
        this.setState({value: ''});
    }
    _checkTags (tags) {
        //  Check for new tags that are not included in the user defined tags
        const newTags = tags.filter(tag => !this.props.collection.includes(tag));
        if (newTags.length) {
            //  Send new tags to the redux store and database
            return newTags;
        }
        return [];
    }

    handle_onChange = (value) => {
        this.setState({value: value});
    }
    handle_onConfirm = () => {
        const tag = this.props.reference.current.tag.value.split(', ');
        if (this.props.reference.current.reportValidity()) {
            this.props.onConfirm(this._checkTags(tag));
            this._resetValue();
        }
    }

    render () {
        let content = (
            <Aux>
                <div className={styles.TagBar}>
                    <div>
                        {this.props.collection.map((tag, i) => {
                            return (
                                <Tag2
                                    key={utility.createHashId(i)}
                                    pinned={this.props.pinned.includes(tag)}
                                    selected={this.props.selected.includes(tag)}
                                    onToggle={(tag) => this.props.onSelect(this.props.category, tag)}>
                                    {tag}
                                </Tag2>
                            )
                        })}
                    </div>
                </div>
                <TagField2
                    label={'new ' + this.props.category}
                    tabIndex={-1}
                    value={this.state.value}
                    onChange={this.handle_onChange}>
                    <Button
                        className={styles.AddButton}
                        tabIndex={-1}
                        onClick={this.handle_onConfirm}>
                        +
                    </Button>
                </TagField2>
            </Aux>
        )
        let toggle = null;
        if (this.props.state) {
            content = (
                <TagEditor
                    label={this.props.category}
                    tabIndex={this.props.tabIndex}
                    value={this.props.pinned.join(', ')}
                    onChange={this.handle_onChange}/>
            );
        }
        if (this.props.onToggle) {
            let css = [styles.ToggleButton];
            if (this.props.state) {
                css.push(styles.Second);
            }
            toggle = (
                <Button
                    className={css.join(' ')}
                    tabIndex={-1}
                    onClick={this.props.onToggle}>T</Button>
            )
        }
        return (
            <Aux>
                <form
                    className={styles.TagForm2}
                    ref={this.props.reference}>
                    <div>
                        {content}
                        {toggle}
                    </div>
                </form>
            </Aux>
        );
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
        putTag_async: (category, token, user, data) => dispatch(actions.putTag_async(category, token, user, data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PinnableTagForm);