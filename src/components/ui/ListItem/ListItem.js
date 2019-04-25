import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {getItemDataById} from '../../../store/reducers/root';

import withContextActions from '../../../hoc/withContextActions/withContextActions.js';
import Column from '../../../hoc/Column/Column';
import QuickButton from '../button/Context/ContextButton';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';

class ListItem extends PureComponent {
    state = {
        data: this.props.item,
        isDeleted: false,
        isSelected: false,
    }

    //  Methods  //
    toggleSelect () {
        this.setState(previousState => ({
            ...previousState,
            isSelected: !previousState.isSelected
        }));
    }

    //  Event Handlers  //
    onDelete = () => {
        this.setState(previousState => ({
            ...previousState,
            isDeleted: true
        }));
    }
    onChange = (target, value) => {
        this.setState(previousState => ({
            ...previousState,
            data: {
                ...previousState.data,
                [target]: value
            }
        }));
    }

    handle_onClick (e) {
        e.stopPropagation();
        this.toggleSelect();
        this.props.onSelect({
            key: this.props.item.id
        });
    }

    handle_onEditClicked = () => {
        this.props.onEdit({
            key: this.props.item.id,
            data: {
                title: this.state.data.title,
                details: this.state.data.details
            },
            actions: {
                onChange: this.onChange
            }
        });
    }
    handle_onDeleteClick = () => {
        this.props.onDelete({
            key: this.props.item.id,
            data: {
                title: this.state.data.title,
            },
            actions: {
                callback: this.onDelete
            }
        });
    }

    render () {
        let cssClasses = [ListItemCSS.List_Item];
        if (this.props.data.isNew) {
            cssClasses = [...cssClasses, ListItemCSS.New];
        }
        if (this.state.isSelected) {
            cssClasses = [...cssClasses, ListItemCSS.Selected];
        }
        if (this.state.isDeleted) {
            cssClasses = [ListItemCSS.List_Item, ListItemCSS.Selected, ListItemCSS.Deleted];
        }
        return (
            <div
                className={cssClasses.join(' ')}
                onClick={(e) => this.handle_onClick(e)}>
                <div className={AppCSS.Inner}>
                    <Column just='Center' align='Start'>
                        <h3>{this.state.data.title}</h3>
                        <p>{this.state.data.details}</p>
                    </Column>
                    <QuickButton
                        active={this.state.isSelected && this.props.single && !this.state.deleted}
                        onClick={this.handle_onEditClicked}>
                        Edit
                    </QuickButton>
                    <QuickButton
                        active={this.state.isSelected && this.props.single && !this.state.deleted}
                        delete
                        onClick={this.handle_onDeleteClick}>
                        Delete
                    </QuickButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: getItemDataById(state, ownProps.uniqueId)
    }
}

export default connect(mapStateToProps)(ListItem);