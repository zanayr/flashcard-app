import React, {Component} from 'react';

import BarLink from '../../ui/link/Bar/BarLink';
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
        let path = '';
        if (this.props.path.length) {
            switch (this.props.path) {
                case 'create':
                    path = '/create';
                    break;
                default:
                    path = '/0/deck/' + this.props.data.data.id;
                    break;
            }
            aux = (
                <IconButton
                    onClick={() => {
                        this.props.history.replace(path, {id: this.props.data.id});
                    }}>{this.props.data.labels.aux}</IconButton>
            );
        }
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <InspectForm2
                        data={this.state.data}
                        labels={this.props.data.labels}
                        onChange={this.handle_onChange}
                        onConfirm={this.props.actions.confirm}/>
                    <div className={styles.Footer}>
                        <div>
                            <Button
                                disabled={!this.state.valid.primary || !this.state.valid.secondary}
                                onClick={this.props.actions.confirm}>
                                {this.props.data.labels.confirm}
                            </Button>
                            {aux}
                            <IconButton onClick={this.props.actions.cancel}>x</IconButton>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default InspectAside;