import React, {PureComponent} from 'react';

import Column from '../../../hoc/Column/Column';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';

class SelectableListItem extends PureComponent {
    state = {
        detail: this.props.detail,
        display: this.props.display,
        isSelected: false
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //     return nextState.isSelected !== this.state.isSelected;
    // }

    toggleSelected () {
        this.setState(previousState => ({
            ...previousState,
            isSelected: !previousState.isSelected
        }));
    }
    setValues (target, value) {
        this.setState(previous => ({
            ...previous,
            [target]: value
        }));
    }

    onItemSelect = (e) => {
        e.stopPropagation();
        
        this.toggleSelected();
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

        let item = (
            <div
                className={[ListItemCSS.List_Item].concat(classes).join(' ')}
                onClick={this.onItemSelect}>
                <div className={AppCSS.Inner}>
                    <Column just='Center' align='Start'>
                        <h3>{this.state.display}</h3>
                        <p>{this.state.detail}</p>
                        {this.props.children}
                    </Column>
                </div>
            </div>
        );

        return (
            <div
                className={[ListItemCSS.List_Item].concat(classes).join(' ')}
                onClick={this.onItemSelect}>
                <div className={AppCSS.Inner}>
                    <Column just='Center' align='Start'>
                        <h3>{this.state.display}</h3>
                        <p>{this.state.detail}</p>
                        {this.props.children}
                    </Column>
                </div>
            </div>
        );
    }
}

export default SelectableListItem;