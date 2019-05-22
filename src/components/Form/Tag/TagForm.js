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


class TagForm extends Component {
    state = {
        state: false,
        value: ''
    }

    
    //  STATE SETTERS  ---------------------------------------------------  SETTERS  //
    //  Value  -------------------------------------------------------------  Value  //
    _resetValue () {
        this.setState({value: ''});
    }

    //  State  -------------------------------------------------------------  State  //
    _toggleState () {
        this.setState(prev => ({
            ...prev,
            state: !prev.state
        }));
    }


    //  PRIVATE METHODS  -----------------------------------------  PRIVATE METHODS  //
    //  Tags  ---------------------------------------------------------------  Tags  //
    _checkTags (tags) {
        const newTags = tags.filter(tag => !this.props.collection.includes(tag));
        if (newTags.length) {
            return newTags;
        }
        return [];
    }


    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  On Value Change  -----------------------------------------------  On Change  //
    handle_onChange = (value) => {
        this.setState({value: value});
    }

    //  On Form Confirm -----------------------------------------------  On Confirm  //
    handle_onConfirm = () => {
        const tags = this.props.reference.current.tag.value.split(', ');
        if (this.props.reference.current.reportValidity()) {
            this.props.onConfirm(this._checkTags(tags));
            this._resetValue();
        }
    }

    //  On Form Toggle  ------------------------------------------------  On Toggle  //
    handle_onToggle = () => {
        this._toggleState();
        this.props.onToggle();
    }


    //  RENDER METHOD  ----------------------------------------------------  RENDER  //
    render () {
        let content = (
            <Aux>
                <div className={styles.TagBar}>
                    <div>
                        {this.props.collection.map((tag, i) => {
                            return (
                                <Tag2
                                    key={utility.createHashId(i)}
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
        if (this.state.state) {
            content = (
                <TagEditor
                    label={this.props.category}
                    tabIndex={this.props.tabIndex}
                    value={''}
                    onChange={this.handle_onChange}/>
            );
        }
        //  Set the toggle button's styling
        let toggleCss = [styles.ToggleButton];
        if (this.state.state) {
            toggleCss.push(styles.Second);
        }

        //  Return component
        return (
            <form
                className={styles.TagForm2}
                ref={this.props.reference}>
                <div>
                    {content}
                    <Button
                        className={toggleCss.join(' ')}
                        tabIndex={-1}
                        onClick={this.handle_onToggle}>T</Button>
                </div>
            </form>
        );
    }
}


export default TagForm;


// const mapStateToProps = state => {
//     return {
//         select_token: select.authToken(state),
//         select_user: select.user(state)
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         updateTag_async: (store, collection, token, id, tag) => dispatch(actions.updateTag_async(store, collection, token, id, tag)),
//     };
// };


// export default connect(mapStateToProps, mapDispatchToProps)(TagForm);