import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as select from '../../store/reducers/root';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import SimpleHeader from '../../components/Header/SimpleHeader';
import Table from '../../components/Table/Table';

import styles from '../Container.module.css';


class Report extends Component {
    state = {
        aside: {
            actions: {},
            data: {},
            state: asideTypes.CLOSED
        },
        report: []
    }

    //  STATE SETTERS  ==============================================  STATE SETTERS  //
    //  Aside  -----------------------------------------------------------  Aside SS  //
    clearAndCloseAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                actions: {},
                data: {},
                state: asideTypes.CLOSED
            }
        }));
    }
    openAside (state) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                state: state
            }
        }));
    }
    setAside (actions, data) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {
                    ...data
                },
                actions: {
                    ...actions
                }
            }
        }));
    }
    toggleAside (state) {
        if (this.state.aside.state !== asideTypes.CLOSED) {
            if (state !== this.state.aside.state) {
                this.openAside(state);
            } else {
                this.clearAndCloseAside();
            }
        } else {
            this.openAside(state);
        }
    }
    setReport (data) {
        this.setState(prev => ({
            ...prev,
            report: data
        }));
    }

    handle_onNagivationToggle = () => {
        this.toggleAside(asideTypes.NAVIGATION);
        this.setAside({
            overlay: this.handle_onAsideClose
        });
    }
    
    //  Aside  -------------------------------------------------------------  Aside  //
    _openReportAside () {
        this.toggleAside(asideTypes.REPORT);
        this.setAside({
            cancel: this.handle_onAsideClose,
            confirm: this.handle_onReportAsideConfirm,
            overlay: this.handle_onReportAsideConfirm
        },
        {
            group: this.props.select_user.group,
            tag: this.props.select_user.tag
        });
    }
    
    _rollUpWeek (report) {
        const rolled = {
            1: {
                seen: 0,
                time: 0,
            }
        };
        let week = 1;
        Object.keys(report).forEach(session => {
            if (new Date(report[session].date).getDay() ? false : true) {
                week++;
                rolled[week] = {
                    seen: 0,
                    time: 0
                };
            }
            rolled[week].seen = rolled[week].seen + report[session].seen;
            rolled[week].time = rolled[week].time + (Math.round(report[session].time / 1000) / 3600);
        });
        return Object.keys(rolled).map(week => {
            return [week, rolled[week].time, rolled[week].seen];
        });
    }
    _createReport (data) {
        const cards = this.props.select_cards;
        const report = {};
        const filtered = [];
        Object.keys(cards).forEach(id => {
            let group = true;
            let tag = data.tag.length ? false : true;
            data.group.forEach(t => {
                group = cards[id].group.includes(t) && group;
            });
            data.tag.forEach(t => {
                tag = cards[id].tag.includes(t) || tag;
            });
            if (group && tag) {
                filtered.push(cards[id]);
            }
        });
        filtered.forEach(card => {
            Object.keys(card.meta).forEach(session => {
                if (report[session]) {
                    report[session].time = report[session].time + card.meta[session].time;
                    report[session].seen = report[session].seen + 1;
                } else {
                    report[session] = {
                        date: card.meta[session].date,
                        seen: 1,
                        time: card.meta[session].time
                    }
                }
            });
        });
        this.setReport(this._rollUpWeek(report));
    }
    //  Action  -----------------------------------------------------------  Action  //
    handle_onActionClick = (action) => {
        this._openReportAside();
    }

    //  Aside  -------------------------------------------------------------  Aside  //
    handle_onAsideClose = () => {
        this.clearAndCloseAside();
    }
    handle_onReportAsideConfirm = (data) => {
        this._createReport(data);
        this.clearAndCloseAside();
    }

    render () {
        return (
            <Aux>
                <SimpleHeader
                    actions={{
                        navigation: this.handle_onNagivationToggle
                    }}
                    navigation={{
                        label: 'Back',
                        path: '0/deck/'
                    }}/>
                <main
                    className={styles.List}
                    onClick={this.handle_onMainClick}>
                    <div>
                        <Table
                            columns={['week', 'study hours', 'cards seen']}
                            source={this.state.report}/>
                        <ActionButton
                            onClick={this.handle_onActionClick}
                            state={0}
                            values={['Create']}/>
                    </div>
                </main>
                <Aside2
                    actions={this.state.aside.actions}
                    data={this.state.aside.data}
                    state={this.state.aside.state}/>
            </Aux>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        select_user: select.user(state),
        select_cards: select.cards(state)
    };
};

export default connect(mapStateToProps, null)(Report);