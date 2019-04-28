import React, {Component} from 'react';

import Column from '../../../hoc/Column/Column';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';

class SelectableListItem extends Component {
    state = {
        isSelected: false
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextState.isSelected !== this.state.isSelected;
    }

    toggle_isSelected () {
        this.setState(previousState => ({
            ...previousState,
            isSelected: !previousState.isSelected
        }));
    }

    handle_onItemSelect = (e) => {
        e.stopPropagation();
        
        this.toggle_isSelected();
        this.props.onSelect({
            key: this.props.itemKey
        });
    }


    render () {
        console.log('rendering item:', this.props.itemKey);
        let classes = [];
        if (this.state.isSelected) {
            classes = [ListItemCSS.Selected];
        }

        return (
            <div
                className={[ListItemCSS.List_Item].concat(classes).join(' ')}
                onClick={this.handle_onItemSelect}>
                <div className={AppCSS.Inner}>
                    <Column just='Center' align='Start'>
                        <h3>{this.props.display}</h3>
                        <p>{this.props.detail}</p>
                        {this.props.children}
                    </Column>
                </div>
            </div>
        );
    }
}

export default SelectableListItem;