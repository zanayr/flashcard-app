import React, {Component} from 'react';

import BarLink from '../../ui/link/Bar/BarLink';
import Button from '../../ui/button/Button/Button';
import InspectForm from '../../form/Inspect/InspectForm';

import styles from '../Aside.module.css';


class InspectAside extends Component {
    state = {
        actions: this.props.actions,
        group: this.props.data.group,
        item: this.props.data.item,
        tag: this.props.data.tag
    }


    //  FORM  ---------------------------------------------------------------  FORM  //
    handle_onChange = (target, value) => {
        this.setState(prev => ({
            ...prev,
            item: {
                ...prev.item,
                [target]: value
            }
        }));
        this.props.actions.change(target, value);
    }

    
    //  TAGS  ---------------------------------------------------------------  TAGS  //
    handle_onTagCreate = (category, tag) => {
        const tags = this.state.item[category];
        this.setState(prev => ({
            ...prev,
            item: {
                ...prev.item,
                [category]: prev.item[category].concat(tag)
            }
        }));
        this.props.actions.change(this.state.item, {
            target: category,
            value: tags.concat(tag)
        });
        this.props.actions.create(category, tag);
    }
    handle_onTagToggle = (category, tag) => {
        const tags = this.state.item[category];
        if (tags.indexOf(tag) > -1) {
            this.setState(prev => ({
                ...prev,
                item: {
                    ...prev.item,
                    [category]: prev.item[category].filter(t => t !== tag)
                }
            }));
            this.props.actions.change(this.state.item, {
                target: category,
                value: tags.filter(t => t !== tag)
            });
        } else {
            this.setState(prev => ({
                ...prev,
                item: {
                    ...prev.item,
                    [category]: prev.item[category].concat(tag)
                }
            }));
            this.props.actions.change(this.state.item, {
                target: category,
                value: tags.concat(tag)
            });
        }
    }
    render () {
        let link = null;
        if (this.props.path.length) {
            if (this.props.data.id) {
                link = (
                    <div>
                        <BarLink path={this.props.path + '/' + this.props.data.id} state={{id: this.props.data.id}}>Add many</BarLink>
                    </div>
                );
            } else {
                link = (
                    <div>
                        <BarLink path={this.props.path} state={{}}>Add many</BarLink>
                    </div>
                );
            }
        }
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <InspectForm
                        item={this.state.item}
                        primary={this.props.data.primary}
                        secondary={this.props.data.secondary}
                        onChange={this.handle_onChange}
                        onConfirm={this.props.actions.confirm}/>
                    <Button onClick={this.props.actions.cancel}>Cancel</Button>
                    {link}
                </div>
            </aside>
        );
    }
}

export default InspectAside;