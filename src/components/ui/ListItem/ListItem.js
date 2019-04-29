import React, {Component} from 'react';
import ListItemTemplate from '../ListTemplate/ListTemplate';

import ListItemStyles from './ListItem.module.css';


class ListItem extends Component {
    state = {
        detail: this.props.detail,
        display: this.props.display
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //     return nextProps.active !== this.props.active
    // }

    render () {
        return (
            <article
                className={ListItemStyles.ListItem}
                onClick={this.props.onItemSelect}>
                <div>
                    <ListItemTemplate
                        detail={this.state.detail}
                        display={this.state.display}/>
                    {this.props.children}
                </div>
            </article>
        );
    }
}


export default ListItem;