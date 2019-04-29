import React, {Component} from 'react';

import Column from '../../../hoc/Column/Column';

import ListItemStyles from './ListItem.module.css';


class ListItem extends Component {
    state = {
        detail: this.props.detail,
        display: this.props.display
    }

    onClick (e) {
        e.stopPropagation();
        this.props.onSelect();
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //     return nextProps.active !== this.props.active
    // }

    render () {
        let css = [ListItemStyles.ListItem];
        if (this.props.selected) {
            css = [ListItemStyles.ListItem, ListItemStyles.Selected];
        }
        return (
            <article
                className={css.join(' ')}
                onClick={(e) => this.onClick(e)}>
                <div>
                    <Column>
                        <h3>{this.state.display}</h3>
                        <p>{this.state.detail}</p>
                    </Column>
                    {this.props.children}
                </div>
            </article>
        );
    }
}


export default ListItem;