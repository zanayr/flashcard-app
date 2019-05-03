import React, {Component} from 'react';

import Column from '../../../hoc/Column/Column';
import Row from '../../../hoc/Row/Row';

import ListItemStyles from './ListItem.module.css';


class ListItem extends Component {
    onClick (e) {
        e.stopPropagation();
        this.props.onSelect();
    }

    render () {
        let css = [ListItemStyles.ListItem];
        if (this.props.selected) {
            css = [ListItemStyles.ListItem, ListItemStyles.Selected];
        }
        let tags = this.props.tags.map(tag => {
            return (
                <div key={tag}><p>{tag}</p></div>
            );
        })
        return (
            <article
                className={css.join(' ')}
                onClick={(e) => this.onClick(e)}>
                <Row>
                    <div>
                        <h3>{this.props.primary}</h3>
                        <p>{this.props.secondary}</p>
                    </div>
                    <div>
                        {tags}
                    </div>
                    {this.props.children}
                </Row>
            </article>
        );
    }
}


export default ListItem;