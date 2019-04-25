import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import Column from '../../../hoc/Column/Column';
import QuickButton from '../button/Context/ContextButton';
import Throbber from '../../ui/Throbber/Throbber';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';
import {getItemDataById} from '../../../store/reducers/root';

class ListItem extends PureComponent {
    state = {
        isSelected: false,
        isDeleted: false,
        data: this.props.item
    }

    toggleSelect () {
        this.setState(previousState => ({
            ...previousState,
            isSelected: !previousState.isSelected
        }));
    }
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
    }

    handle_onEditClicked = () => {
        this.props.onEdit({
            key: this.props.item.id,
            data: {
                title: this.props.item.title,
                details: this.props.item.details
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
                title: this.item.title,
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
        console.log('list item is rendering');
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
                        active={this.state.isSelected && true && !this.state.deleted}
                        onClick={this.handle_onEditClicked}>
                        Edit
                    </QuickButton>
                    <QuickButton
                        active={this.state.isSelected && true && !this.state.deleted}
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