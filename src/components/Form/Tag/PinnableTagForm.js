import React, {Component} from 'react';

import * as utility from '../../../utility/utility';

import Aux from '../../../hoc/Aux/Aux';
import TagField2 from '../../ui/input/Tag/TagField2';
import TagEditor from '../../ui/input/Tag/TagEditor';
import Tag2 from '../../ui/Tag/Tag2';
import Button from '../../ui/button/Button/Button';

import styles from './TagForm.module.css';


const pinnableTagForm = (props) => {
    const form = React.createRef;
    
    const handle_onConfirm = () => {
        const tag = form.current.tag.value;
        if (form.current.reportValidity() && !props.collection.includes(tag)) {
            props.onConfirm(tag);
        }
    }
    
    let content = (
        <Aux>
            <div className={styles.TagBar}>
                <div>
                    {props.collection.map((tag, i) => {
                        return (
                            <Tag2
                                key={utility.createHashId(i)}
                                pinned={props.pinned.includes(tag)}
                                selected={props.selected.includes(tag)}
                                onToggle={(tag) => props.onSelect(props.category, tag)}>
                                {tag}
                            </Tag2>
                        )
                    })}
                </div>
            </div>
            <TagField2
                label={'new ' + props.category}
                tabIndex={-1}>
                <Button
                    className={styles.AddButton}
                    tabIndex={-1}
                    onClick={handle_onConfirm}>
                    +
                </Button>
            </TagField2>
        </Aux>
    )
    let toggle = null;
    if (props.state) {
        content = (
            <TagEditor
                label={props.category}
                tabIndex={props.tabIndex}
                value={props.pinned.join(', ')}/>
        );
    }
    if (props.onToggle) {
        let css = [styles.ToggleButton];
        if (props.state) {
            css.push(styles.Second);
        }
        toggle = (
            <Button
                className={css.join(' ')}
                tabIndex={-1}
                onClick={props.onToggle}>T</Button>
        )
    }
    return (
        <Aux>
            <form
                className={styles.TagForm2}
                ref={form}>
                <div>
                    {content}
                    {toggle}
                </div>
            </form>
        </Aux>
    );
}


export default pinnableTagForm;