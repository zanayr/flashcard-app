import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../../store/actions/index';
import * as select from '../../../../store/reducers/root';
import * as sortTypes from '../../../../utility/sortTypes';
import * as utility from '../../../../utility/utility';

import QuickTab from '../../tab/QuickTab';
import QuickTab2 from '../../tab/QuickTab2';

import styles from '../Bar.module.css';


class TabBar extends Component {
    handle_onClick = (e) => {
        e.stopPropagation();
        this.props.onClick();
    }
    handle_onSelect = (tab) => {
        this.props.action(1, tab);
    }
    handle_onDelete = (tab) => {
        this.props.deleteTab_async(this.props.select_token, this.props.select_userId, tab);
        this.props.action(2, tab);
    }
    handle_onAdd = (e) => {
        e.stopPropagation();
        this.props.action(0, null);
    }

    render () {
        let tabs = null;
        let all = null;
        tabs = utility.sortBy(sortTypes.DATE_DSC, this.props.collection).map(tab => {
            return (
                <QuickTab2
                    active={this.props.active === tab.id}
                    delete
                    key={tab.id}
                    onClick={() => this.handle_onSelect(tab)}
                    onClose={() => this.handle_onTabDelete(tab)}>
                    {tab.name}
                </QuickTab2>
            );
        });
        if (tabs.length) {
            all = (
                <QuickTab2
                    active={this.props.active === 'all'}
                    key={'all'}
                    onClick={() => this.handle_onSelect({
                        group: [],
                        id: 'all',
                        tag: []
                    })}>
                    All
                </QuickTab2>
            );
        }

        return (
            <section
                className={styles.TabBar}
                onClick={(e) => this.handle_onClick(e)}>
                <div>
                    {all}
                    {tabs}
                    <div className={[styles.QuickTab, styles.AddTab].join(' ')}>
                        <div>
                            <button
                                disabled={Object.keys(this.props.collection).length >= 12}
                                onClick={(e) => this.handle_onAdd(e)}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
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


export default connect(mapStateToProps, mapDispatchToProps)(TabBar);