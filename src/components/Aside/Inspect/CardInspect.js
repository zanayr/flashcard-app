import React, {Component} from 'react';

import BarLink from '../../ui/link/Bar/BarLink';
import CardInspectForm from '../../form/Card/CardInspectForm';
import DeckInspectForm from '../../form/Deck/DeckInspectForm';
import TagForm from '../../form/Tag/TagForm';

import styles from '../Aside.module.css';


class CardInspect extends Component {
    state = {
        actions: this.props.actions,
        change: this.props.actions.change ? true : false,
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
        if (this.state.change) {
            this.props.actions.change(target, value);
        }
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
        if (this.state.change) {
            this.props.actions.change(this.state.item, {
                target: category,
                value: tags.concat(tag)
            });
        }
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
            if (this.state.change) {
                this.props.actions.change(this.state.item, {
                    target: category,
                    value: tags.filter(t => t !== tag)
                });
            }
        } else {
            this.setState(prev => ({
                ...prev,
                item: {
                    ...prev.item,
                    [category]: prev.item[category].concat(tag)
                }
            }));
            if (this.state.change) {
                this.props.actions.change(this.state.item, {
                    target: category,
                    value: tags.concat(tag)
                });
            }
        }
    }

    

    render () {
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <CardInspectForm
                        card={this.state.item}
                        onChange={this.handle_onChange}
                        onConfirm={this.handle_onConfirm}/>
                    <div>
                        <BarLink path={this.props.path} state={{id: this.props.data.deckId}}>Add many</BarLink>
                        {/* <BarLink path={'/u/loading'} state={{collection: this.props.page, id: this.state.item.id}}>Edit</BarLink> */}
                    </div>
                </div>
            </aside>
        );
    }
}

export default CardInspect;