import React, {Component} from 'react';

import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

import Button from '../../ui/button/Button/Button';
import IconButton from '../../ui/button/Icon/IconButton';
import InspectForm2 from '../../form/Inspect/InspectForm2';

import styles from '../Aside.module.css';


class InspectAside extends Component {
    state = {
        actions: this.props.actions,
        group: this.props.data.group,
        data: this.props.data.data,
        tag: this.props.data.tag,
        valid: {
            primary: this.props.data.data.primary.length > 0,
            secondary: this.props.data.data.secondary.length > 0
        }
    }


    //  FORM  ---------------------------------------------------------------  FORM  //
    handle_onChange = (target, value) => {
        if (target === 'primary' || target === 'secondary') {
            this.setState(prev => ({
                ...prev,
                data: {
                    ...prev.data,
                    [target]: value.trim()
                },
                valid: {
                    ...prev.valid,
                    [target]: value.trim().length > 0
                }
            }));
        } else {
            this.setState(prev => ({
                ...prev,
                data: {
                    ...prev.data,
                    [target]: value
                }
            }));
        }
        this.props.actions.change(target, value);
    }

    
    //  TAGS  ---------------------------------------------------------------  TAGS  //
    handle_onTagCreate = (category, tag) => {
        const tags = this.state.data[category];
        this.setState(prev => ({
            ...prev,
            data: {
                ...prev.data,
                [category]: prev.data[category].concat(tag)
            }
        }));
        this.props.actions.change(this.state.data, {
            target: category,
            value: tags.concat(tag)
        });
        this.props.actions.create(category, tag);
    }
    handle_onTagToggle = (category, tag) => {
        const tags = this.state.data[category];
        if (tags.indexOf(tag) > -1) {
            this.setState(prev => ({
                ...prev,
                data: {
                    ...prev.data,
                    [category]: prev.data[category].filter(t => t !== tag)
                }
            }));
            this.props.actions.change(this.state.data, {
                target: category,
                value: tags.filter(t => t !== tag)
            });
        } else {
            this.setState(prev => ({
                ...prev,
                data: {
                    ...prev.data,
                    [category]: prev.data[category].concat(tag)
                }
            }));
            this.props.actions.change(this.state.data, {
                target: category,
                value: tags.concat(tag)
            });
        }
    }
    render () {
        let aux = null;
        let flag = null;
        let path = '';
        let header = '';
        const formCSS = {
            add: styles.Inspect_Add,
            selected: styles.Inspect_Selected,
            tag: styles.Inspect_Tag,
        };
        switch (this.props.data.task) {
            case 'CREATE_DECK':
                header = 'Create a new deck below, don\'t forget to add a title.';
                aux = (
                    <IconButton
                        className={styles.InspectAux}
                        disabled={!this.state.valid.primary || !this.state.valid.secondary}
                        onClick={() => {
                            this.props.init('deck');
                            this.props.history.replace('/load', {
                                data: this.state.data,
                                store: 'deck'
                            });
                        }}>Add</IconButton>
                );
                break;
            case 'INSPECT_DECK':
                header = 'Edit a the deck below, don\'t forget it requires a title.';
                console.log(this.props);
                aux = (
                    <IconButton
                        className={styles.InspectAux}
                        disabled={!this.state.valid.primary || !this.state.valid.secondary}
                        onClick={() => {this.props.history.replace('/0/deck/' + this.props.data.data.id, {id: this.props.data.data.id})}}>
                        Add
                    </IconButton>
                );
                break;
            default:
                break;
        }
        // if (this.props.path.length) {
        //     switch (this.props.path) {
        //         case 'create':
        //             path = '/create';
        //             break;
        //         default:
        //             path = '/0/deck/' + this.props.data.data.id;
        //             break;
        //     }
        //     aux = (
        //         <IconButton
        //             onClick={() => {
        //                 this.props.history.replace(path, {id: this.props.data.id});
        //             }}>{this.props.data.labels.aux}</IconButton>
        //     );
        //     if (this.props.path === 'deck' && this.props.data.data.tag.includes('$create')) {
        //         aux = (
        //             <IconButton
        //                 disabled={!this.state.valid.primary || !this.state.valid.secondary}
        //                 onClick={() => {
        //                     this.props.init('deck');
        //                     this.props.history.replace('/load', {
        //                         data: this.state.data,
        //                         store: 'deck'
        //                     });
        //                 }}>{this.props.data.labels.aux}</IconButton>
        //         );
        //         header = 'Create a new deck below, don\'t forget to add a title.';
        //     }
            
        // }
        // if (this.props.data.data.hasOwnProperty('flag')) {
        //     flag = (
        //         <div className={styles.Middle}>
        //             <div>
        //                 <Button onClick={this.props.actions.flag}>Flag Card</Button>
        //             </div>
        //         </div>
        //     );
        // }
        return (
            <aside className={styles.Aside}>
                <div>
                    <div className={styles.InspectHeader}>
                        <div>
                            <p>{header}</p>
                        </div>
                    </div>
                    <InspectForm2
                        data={this.state.data}
                        labels={this.props.data.labels}
                        styles={formCSS}
                        onChange={this.handle_onChange}
                        onConfirm={this.props.actions.confirm}/>
                    {flag}
                    <div className={styles.Footer}>
                        <div>
                            <Button
                                className={styles.Confirm}
                                disabled={!this.state.valid.primary || !this.state.valid.secondary}
                                onClick={this.props.actions.confirm}>
                                {this.props.data.labels.confirm}
                            </Button>
                            {aux}
                            <IconButton
                                className={styles.Cancel}
                                onClick={this.props.actions.cancel}>⨯</IconButton>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        init: (store) => dispatch(actions.init(store))
    }
}

export default connect(null, mapDispatchToProps)(InspectAside);