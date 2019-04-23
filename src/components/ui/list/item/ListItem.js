import React from 'react';

import Column from '../../../structure/column/Column';
import QuickButton from '../../button/quick/QuickButton';

import globalCSS from '../../../../Global.module.css';
import listItemCSS from './ListItem.module.css';

const listItem = (props) => {
    const _id = props.data.id;
    const _userId = props.data.userId;
    let cssClasses = [listItemCSS.List_Item];
    if (props.selected) {
        cssClasses = [...cssClasses, listItemCSS.Selected];
    }

    const handle_onClicked = (e) => {
        e.stopPropagation();

        props.onSelect({
            id: _id
        });
    }
    const handle_onEditClicked = () => {
        props.onEdit(_id);
    }
    const handle_onDeleteClicked = () => {
        props.onDelete(_id);
    }

    return (
        <div
            className={cssClasses.join(' ')}
            onClick={(e) => handle_onClicked(e)}>
            <div className={globalCSS.Inner}>
                <Column just='Center' align='Start'>
                    <h3>{props.data.title}</h3>
                    <p>{props.data.details}</p>
                </Column>
                <QuickButton
                    active={props.selected && props.single}
                    onClick={handle_onEditClicked}>
                    Edit
                </QuickButton>
                <QuickButton
                    active={props.selected && props.single}
                    delete
                    onClick={handle_onDeleteClicked}>
                    Delete
                </QuickButton>
            </div>
        </div>
    );
}

export default listItem;