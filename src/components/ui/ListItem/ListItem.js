import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import Column from '../../../hoc/Column/Column';
import QuickButton from '../button/Context/ContextButton';
import Throbber from '../../ui/Throbber/Throbber';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';
import {getDeckById} from '../../../store/reducers/root';

class ListItem extends PureComponent {
    state = {
        isSelected: false,
        isDeleted: false,
    }
    
    toggleDelete = () => {
        this.setState(previousState => ({
            ...previousState,
            isDeleted: !previousState.isDeleted
        }));
    }
    toggleSelect () {
        this.setState(previousState => ({
            ...previousState,
            isSelected: !previousState.isSelected
        }));
    }

    handle_onClick (e) {
        e.stopPropagation();

        this.toggleSelect();
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
            console.log('here');
            cssClasses = [ListItemCSS.List_Item, ListItemCSS.Selected, ListItemCSS.Deleted];
        }
        const handle_onEditClicked = () => {
            this.props.onEdit(this.props.data.id);
        }
        const handle_onDeleteClick = () => {
            this.props.onDelete({
                key: this.props.data.id,
                data: {
                    title: this.props.data.title,
                },
                actions: {
                    callback: this.toggleDelete
                }
            });
        }

        return (
            <div
                className={cssClasses.join(' ')}
                onClick={(e) => this.handle_onClick(e)}>
                <div className={AppCSS.Inner}>
                    <Column just='Center' align='Start'>
                        <h3>{this.props.data.title}</h3>
                        <p>{this.props.data.details}</p>
                    </Column>
                    <QuickButton
                        active={this.state.isSelected && true && !this.state.deleted}
                        onClick={handle_onEditClicked}>
                        Edit
                    </QuickButton>
                    <QuickButton
                        active={this.state.isSelected && true && !this.state.deleted}
                        delete
                        onClick={handle_onDeleteClick}>
                        Delete
                    </QuickButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: getDeckById(state, ownProps.id)
    }
}

export default connect(mapStateToProps)(ListItem);