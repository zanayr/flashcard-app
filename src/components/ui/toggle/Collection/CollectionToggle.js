import React, {Component} from 'react';

import * as utility from '../../../../utility/utility';
import * as sortTypes from '../../../../utility/sortTypes';

import Tag from '../../../ui/Tag/Tag';

import styles from './CollectionToggle.module.css';


class CollectionToggle extends Component {
    state = {
        selectedItem: ''
    }

    handle_onSelect = value => {
        this.setState({selectedItem: value});
        this.props.toggle(value);
    }
    
    render () {
        let tags = utility.sortBy(sortTypes.DATE_ASC, this.props.backingCollection).map(collection => {
            let isActive = false;
            if (this.state.selectedItem === collection) {
                isActive = true;
            }

            return (
                <Tag
                    active={isActive}
                    key={collection}
                    onClick={() => this.handle_onSelect(collection)}>
                    {collection}
                </Tag>
            );
        });


        return (
            <div className={styles.CollectionToggle}>
                <div>
                    {tags}
                </div>
            </div>
        );
    }
}


export default CollectionToggle;