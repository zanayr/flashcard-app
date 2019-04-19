import React, {Component} from 'react';

import globalCSS from '../../../../Global.module.css';
import listItemCSS from './ListItem.module.css';

class ListItem extends Component {
    state = {
        detail: this.props.detail,
        id: this.props.listItemId,
        title: this.props.title,
        selected: false
    }
    handle_itemClicked () {
        this.setState(prevState => ({
            ...prevState,
            selected: !prevState.selected
        }), () => {
            this.props.toggleSelection(this.state.id, this.state.selected);
        });
    }

    render() {
        let cssClasses = [listItemCSS.List_Item];
        if (this.state.selected) {
            cssClasses = [listItemCSS.List_Item, listItemCSS.Selected];
        }

        return (
            <div
                className={cssClasses.join(' ')}
                onClick={this.handle_itemClicked.bind(this)}>
                <div className={globalCSS.Inner}>
                    <h3>{this.state.title}</h3>
                    <p>{this.state.detail}</p>
                </div>
            </div>
        );
    }
}

export default ListItem;