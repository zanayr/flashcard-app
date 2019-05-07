import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../../store/actions/index';
import * as select from '../../../../store/reducers/root';
import * as sortTypes from '../../../../utility/sortTypes';
import * as utility from '../../../../utility/utility';

import QuickTab from '../../tab/QuickTab';

import styles from '../Bar.module.css';


const tabBar = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }
    const handle_onTabDelete = (tab) => {
        props.deleteTab_async(props.select_token, props.select_userId, tab);
        props.actions.delete(tab);
    }
    const handle_onAddTabClick = (e) => {
        e.stopPropagation();
        props.actions.toggle({
            groups: [],
            id: 'add',
            tags: []
        });
    }
    let tabs = utility.sortBy(sortTypes.DATE_ASC, props.backingCollection).map(tab => {
        if (tab.collection === props.page) {
            return (
                <QuickTab
                    active={tab.id === props.active}
                    delete={tab.delete}
                    key={tab.id}
                    onClick={() => props.actions.toggle(tab)}
                    onClose={() => handle_onTabDelete(tab)}>
                    {tab.name}
                </QuickTab>
            );
        } else {
            return null;
        }
    });

    return (
        <section
            className={styles.TabBar}
            onClick={(e) => handle_onClick(e)}>
            <div>
                {tabs}
                <div className={[styles.QuickTab, styles.AddTab].join(' ')}>
                    <div>
                        <button
                            disabled={Object.keys(props.backingCollection).length >= 12}
                            onClick={(e) => handle_onAddTabClick(e)}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}


const mapStateToProps = state => {
    return {
        select_token: select.authToken(state),
        select_userId: select.authUser(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteTab_async: (token, user, tab) => dispatch(actions.deleteTab_async(token, user, tab))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(tabBar);