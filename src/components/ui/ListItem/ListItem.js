import React from 'react';

import Column from '../../../hoc/Column/Column';
import QuickButton from '../../ui/button/quick/QuickButton';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';

const listItem = (props) => {
    let cssClasses = [ListItemCSS.List_Item];
    if (props.selected) {
        cssClasses = [...cssClasses, ListItemCSS.Selected];
    }
    if (props.deleted) {
        cssClasses = [ListItemCSS.List_Item, ListItemCSS.Deleted];
    }

    const handle_onClicked = (e) => {
        e.stopPropagation();

        props.onSelect(props.data.key);
    }
    const handle_onEditClicked = () => {
        props.onEdit(props.data.key);
    }
    const handle_onDeleteClick = () => {
        props.onDelete(props.data.key);
    }

    return (
        <div
            className={cssClasses.join(' ')}
            onClick={(e) => handle_onClicked(e)}>
            <div className={AppCSS.Inner}>
                <Column just='Center' align='Start'>
                    <h3>{props.data.title}</h3>
                    <p>{props.data.details}</p>
                </Column>
                <QuickButton
                    active={props.selected && props.single && !props.deleted}
                    onClick={handle_onEditClicked}>
                    Edit
                </QuickButton>
                <QuickButton
                    active={props.selected && props.single && !props.deleted}
                    delete
                    onClick={handle_onDeleteClick}>
                    Delete
                </QuickButton>
            </div>
        </div>
    );
}

export default listItem;