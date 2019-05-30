import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types';
import * as select from '../../store/reducers/root';
import * as sortTypes from '../../utility/sortTypes';
import * as utility from '../../utility/utility';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import SimpleHeader from '../../components/Header/SimpleHeader';
import Table from '../../components/Table/Table';
import QuickBar from '../../components/ui/bar/Quick/QuickBar';
import TabBar from '../../components/ui/bar/Tab/TabBar';
import TabForm from '../../components/form/Tab/TabForm';
import Throbber from '../../components/ui/Throbber/Throbber';

import styles from './Report.module.css';

class Report extends Component {
    state = {
        aside: {
            actions: {},
            data: {},
            state: asideTypes.CLOSED
        },
        assigned: [],
        current: {
            group: [],
            id: 'all',
            tag: []
        },
        reports: {},
        filter: {
            group: [],
            search: '',
            tag: []
        },
        internal: [],
        main: 'LOADING',
        quick: [],
        selected: [],
        sort: sortTypes.DATE_ASC,
        tab: {},
        undo: {
            action: null,
            data: {}
        },
        columns: [],
        report: {}
    }
    undoTimeout = null;

    // componentDidMount () {
    //     const models = this.props.select_users;
    //     const reports = {};
    //     Object.keys(models).forEach(id => {
    //         reports[id] = models[id];
    //     });
    //     this.setState(prev => ({
    //         ...prev,
    //         group: this.props.select_user.group.slice(),
    //         reports: reports,
    //         main: 'LIST_VIEW',
    //         tab: this.props.select_user.report || {},
    //         tag: this.props.select_user.tag.slice()
    //     }));
    // }


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
    // _updateAsideData (property, data) {
    //     this.setState(prev => ({
    //         ...prev,
    //         aside: {
    //             ...prev.aside,
    //             data: {
    //                 ...prev.aside.data,
    //                 [property]: data
    //             }
    //         }
    //     }));
    // }
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

    //  Current  ------------------------------------------------------  Current SS  //
    // _setCurrent (tab) {
    //     this.setState(prev => ({
    //         ...prev,
    //         current: {...tab}
    //     }));
    // }

    //  Filter  --------------------------------------------------------  Filter SS  //
    // _clearFilter () {
    //     this.setState(prev => ({
    //         ...prev,
    //         filter: {
    //             ...prev.filter,
    //             group: [],
    //             tag: []
    //         }
    //     }));
    //     this._clearQuick('f');
    // }
    // _setAssigned (assigned) {
    //     this.setState(prev => ({
    //         ...prev,
    //         assigned: assigned
    //     }));
    // }
    // _setFilter (filter) {
    //     this.setState(prev => ({
    //         ...prev,
    //         filter: filter
    //     }));
    //     if (filter.tag.length || filter.group.length) {
    //         this._setQuick('f');
    //     } else {
    //         this._clearQuick('f');
    //     }
    // }

    //  Reports  ----------------------------------------------------------  Reports SS  //
    // _removeManyReports (reports) {
    //     const u = this.state.reports;
    //     reports.forEach(report => {
    //         delete u[report.id];
    //     });
    //     this.setState(prev => ({
    //         ...prev,
    //         reports: u
    //     }));
    // }
    // _setManyReports (reports) {
    //     const u = this.state.reports;
    //     reports.forEach(report => {
    //         u[report.id] = report;
    //     });
    //     this.setState(prev => ({
    //         ...prev,
    //         reports: u
    //     }));
    // }
    // _setReportValue (target, value) {
    //     const id = this.state.aside.data.report.id;
    //     this.setState(prev => ({
    //         ...prev,
    //         reports: {
    //             ...prev.reports,
    //             [id]: {
    //                 ...prev.reports[id],
    //                 [target]: value
    //             }
    //         }
    //     }));
    // }

    //  Selected  ----------------------------------------------------  Selected SS  //
    // _clearSelected () {
    //     this.setState(prev => ({
    //         ...prev,
    //         selected: []
    //     }));
    //     this._clearQuick('s');
    // }
    // _setSelected (selected) {
    //     this.setState(prev => ({
    //         ...prev,
    //         selected: selected
    //     }));
    //     if (selected.length) {
    //         this._setQuick('s');
    //     } else {
    //         this._clearQuick('s');
    //     }
    // }

    //  Main  ------------------------------------------------------------  Main SS  //
    // _setMainState (state) {
    //     this.setState(prev => ({
    //         ...prev,
    //         main: state
    //     }));
    // }

    //  Quick  ----------------------------------------------------------  Quick SS  //
    // _clearQuick (value) {
    //     if (value === 'u') {
    //         clearTimeout(this.undoTimeout);
    //     }
    //     this.setState(prev => ({
    //         ...prev,
    //         quick: prev.quick.filter(q => q !== value)
    //     }));
    // }
    // _setQuick (value) {
    //     if (!this.state.quick.includes(value)) {
    //         if (value === 'u') {
    //             clearTimeout(this.undoTimeout);
    //             this.undoTimeout = setTimeout(() => {
    //                 this._clearQuick('u');
    //                 this._clearUndo();
    //             }, 5000);
    //         }
    //         this.setState(prev => ({
    //             ...prev,
    //             quick: prev.quick.concat(value)
    //         }));
    //     }
    // }

    //  Tab  --------------------------------------------------------------  Tab SS  //
    // _setTab (tabs) {
    //     this.setState(prev => ({
    //         ...prev,
    //         tab: tabs
    //     }));
    // }

    // //  Sort  ------------------------------------------------------------  Sort SS  //
    // _setSort (sort) {
    //     this.setState(prev => ({
    //         ...prev,
    //         sort: sort
    //     }));
    // }

    // //  Undo  -----------------------------------------------------------  Undo SS  //
    // _clearUndo () {
    //     this.setState(prev => ({
    //         ...prev,
    //         undo: {
    //             action: null,
    //             data: {}
    //         }
    //     }));
    //     this._clearQuick('u');
    // }
    // _setUndo (undo) {
    //     this.setState(prev => ({
    //         ...prev,
    //         undo: undo
    //     }));
    //     this._setQuick('u');
    // }

    // handle_onFilterClear = () => {
    //     this._updateAsideData('filter', {
    //         group: [],
    //         search: this.state.filter.search,
    //         tag: []
    //     });
    //     this._clearFilter();
    // }

    //  PRIVATE METHODS  =========================================  PRIVATE METHODS  //
    //  Aside  ----------------------------------------------------------  Aside PM  //
    // _openFilterAside () {
    //     this._setAside({
    //         cancel: this.handle_onFilterClear,
    //         confirm: this.handle_onAsideClose,
    //         toggle: (filter, tag) => this.handle_onAsideFilterToggle(filter, tag)
    //     }, {
    //         all: {
    //             group: this.props.select_user.group.slice(),
    //             tag: this.props.select_user.tag.concat(this.state.internal)
    //         },
    //         labels: {
    //             confirm: 'Close'
    //         },
    //         filter: {...this.state.filter},
    //         tab: {...this.state.current}
    //     });
    // }

    //  Reports  ----------------------------------------------------------  Reports PM  //
    // _addManyReports = (reports) => {
    //     this._addManyReports_async(reports);
    //     this._clearAndCloseAside();
    // }
    // _addManyReports_async (reports) {
    //     this.props.addMany_async('report', this.props.select_authToken, reports);
    // }
    // _checkReport (report) {
    //     let valid = true;
    //     if (!report.primary.length > 0 && valid) {
    //         valid = false;
    //     }
    //     if (!report.secondary.length && valid) {
    //         valid = false
    //     }
    //     return valid;
    // }
    // _deleteManyReports () {
    //     const selected = this.state.selected.slice();
    //     this.props.deleteMany_async('report', this.props.select_authToken, selected);
    //     this._removeManyReports(selected);
    //     this._setUndo({
    //         action: this._undoManyReportsDeleted,
    //         data: selected
    //     });
    //     this._clearSelected();
    // }
    // _deleteReport = (report) => {
    //     this._deleteManyReports([report]);
    // }
    // _selectReport = (report) => {
    //     let selected = this.state.selected.slice();
    //     if (selected.find(i => i.id === report.id)) {
    //         selected = selected.filter(i => i.id !== report.id);
    //     } else {
    //         selected = selected.concat(report);
    //     }
    //     this._setSelected(selected);
    // }

    //  Tab  ------------------------------------------------------------------ Tab  //
    // _deleteTab (tab) {
    //     let tabs = {...this.state.tab};
    //     delete tabs[tab.id];
    //     this.props.deleteTab_async('report', 'report', this.props.select_authToken, this.props.select_authReport, tab);
    //     this._setTab(tabs);
    //     if (this.state.current.id === tab.id) {
    //         this._setCurrent({
    //             group: [],
    //             id: 'all',
    //             tag: []
    //         });
    //     }
    // }
    // _selectTab (tab) {
    //     this._setCurrent(tab);
    //     this._clearSelected();
    //     if (this.state.main === 'ADD_TAB') {
    //         this._setMainState('LIST_VIEW');
    //     }
    //     if (this.state.aside.state !== asideTypes.CLOSED) {
    //         this._clearFilter();
    //         this._clearAndCloseAside();
    //     }
    // }

    //  Undo  -----------------------------------------------------------  Undo  PM  //
    // _undoManyReportsDeleted = () => {
    //     const reports = this.state.undo.data.slice();
    //     this._addManyReports_async(reports);
    //     this._setManyReports(reports);
    // }
    

    //  EVENT HANDLERS  ===========================================  EVENT HANDLERS  //
    //  Aside  ----------------------------------------------------------  Aside EH  //
    // handle_onAsideFilterToggle = (category, tag) => {
    //     let filter = {...this.state.filter};
    //     if (filter[category].includes(tag)) {
    //         filter[category] = filter[category].filter(t => t !== tag);
    //     } else {
    //         filter[category] = filter[category].concat(tag);
    //     }
    //     this._updateAsideData('filter', filter);
    //     this._setFilter(filter);
    // }
    

    //  Header  --------------------------------------------------------  Header EH  //
    // handle_onActionToggle = (action) => {
    //     switch (action) {
    //         case 0:
    //             this._deleteManyReports();
    //             break;
    //         default:
    //             break;
    //     }
    // }
    // handle_onFilterToggle = (filter) => {
    //     this._openFilterAside();
    //     this._toggleAside(asideTypes.FILTER);
    // }
    // handle_onSortToggle = (sort) => {
    //     switch (sort) {
    //         case 0:
    //             this._setSort(sortTypes.ALPHA_ASC);
    //             break;
    //         case 1:
    //             this._setSort(sortTypes.ALPHA_DSC);
    //             break;
    //         case 2:
    //             this._setSort(sortTypes.DATE_ASC);
    //             break;
    //         case 3:
    //             this._setSort(sortTypes.DATE_DSC);
    //             break;
    //         default:
    //             break;
    //     }
    // }
    // handle_onNagivationToggle = () => {
    //     this._toggleAside(asideTypes.NAVIGATION);
    //     this._setAside({
    //         overlay: this.handle_onAsideClose
    //     });
    // }
    
    //  Report  ------------------------------------------------------------  Report EH  //
    // handle_onReportChange = (target, value) => {
    //     this._setReportValue(target, value);
    // }

    //  List  ------------------------------------------------------------  List EH  //
    // handle_onListClick = (action, data) => {
    //     switch (action) {
    //         case 0:
    //             this._selectReport(data);
    //             break;
    //         case 1:
    //             this.props.history.replace('/2/report/' + data.id);
    //             break;
    //         case 2:
    //             //  Suspend report
    //             // this._assignReport(data);
    //             break;
    //         case 3:
    //             //  Delete Report
    //             // this._deleteReport(data);
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // //  Main  -----------------------------------------------------------  Main EHs  //
    // handle_onMainClick = () => {
    //     this.handle_onAsideClose();
    //     this._clearSelected();
    //     this._clearFilter();
    // }

    //  Quicks  ----------------------------------------------------------  Quicks EH  //
    // handle_onQuickClick = (quick) => {
    //     switch (quick) {
    //         case 0:
    //             this._updateAsideData('filter', {
    //                 group: [],
    //                 search: this.state.filter.search,
    //                 tag: []
    //             });
    //             this._clearFilter();
    //             break;
    //         case 1:
    //             this._clearSelected();
    //             break;
    //         case 2:
    //             this.state.undo.action();
    //             this._clearUndo();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // Tab  ---------------------------------------------------------------  Tab EH  //
    // handle_onTabToggle = (tab, data) => {
    //     switch (tab) {
    //         case 0:
    //             this._setMainState('ADD_TAB');
    //             break;
    //         case 1:
    //             this._selectTab(data);
    //             break;
    //         case 2:
    //             this._deleteTab(data);
    //             break;
    //         default:
    //             break;
    //     }
    // }
    // handle_onTabCreate = (tab) => {
    //     const tabs = {...this.state.tab};
    //     tabs[tab.id] = tab;
    //     this.props.addTab_async('report', 'report', this.props.select_authToken, this.props.select_authReport, tab);
    //     this._setTab(tabs);
    //     this._setCurrent(tab);
    //     this._setMainState('LIST_VIEW');
    // }

    // setSearch (value) {
    //     this.setState(prev => ({
    //         ...prev,
    //         filter: {
    //             ...prev.filter,
    //             search: value.toUpperCase()
    //         }
    //     }));
    // }
    // handle_onSearchChange = (value) => {
    //     this.setSearch(value);
    // }
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
    //  Action  -----------------------------------------------------------  Action  //
    handle_onActionClick = (action) => {
        this._openReportAside();
    }

    //  Aside  -------------------------------------------------------------  Aside  //
    handle_onAsideClose = () => {
        this.clearAndCloseAside();
    }
    handle_onReportAsideConfirm = () => {
        //  Build table data.
        this.clearAndCloseAside();
    }

    render () {
        // let content;
        // switch (this.state.main) {
        //     case 'LIST_VIEW':
        //         content = (
        //             <List2
        //                 action={this.handle_onListClick}
        //                 collection={utility.sortBy(this.state.sort, this.state.reports)}
        //                 filters={this.state.filter}
        //                 current={this.state.current}
        //                 selected={this.state.selected}
        //                 aux={'suspend'}/>
        //         );
        //         break;
        //     case 'ADD_TAB':
        //         content = (
        //             <TabForm
        //                 tag={this.state.tag}
        //                 group={this.state.group}
        //                 onConfirm={this.handle_onTabCreate}/>
        //         );
        //         break;
        //     default:
        //         content = (<Throbber/>);
        //         break;
        // }
        return (
            <Aux>
                <SimpleHeader
                    actions={{
                        navigation: this.handle_onNagivationToggle
                    }}
                    onClick={this.handle_onAsideClose}/>
                <main
                    className={styles.Main}
                    onClick={this.handle_onMainClick}>
                    <div>
                        <Table
                            columns={this.state.columns}
                            source={this.state.report}/>
                        <ActionButton
                            onClick={this.handle_onActionClick}
                            state={0}
                            values={['Create']}/>
                        {/* <TabBar
                            action={this.handle_onTabToggle}
                            active={this.state.current.id}
                            collection={this.state.tab}
                            onClick={this.handle_onAsideClose}/>
                        {content}
                        <QuickBar
                            action={this.handle_onQuickClick}
                            data={this.state.quick}/> */}
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
        // select_authToken: select.authToken(state),
        // select_authUser: select.authUser(state),
        select_user: select.user(state),
        select_cards: select.cards(state)
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // addMany_async: (store, token, reports) => dispatch(actions.addMany_async(store, token, reports)),
        // addTab_async: (store, collection, token, report, model) => dispatch(actions.addTab_async(store, collection, token, report, model)),
        // delete_async: (store, token, report) => dispatch(actions.delete_async(store, token, report)),
        // deleteMany_async: (store, token, models) => dispatch(actions.deleteMany_async(store, token, models)),
        // deleteTab_async: (store, collection, token, report, tab) => dispatch(actions.deleteTab_async(store, collection, token, report, tab)),
        // update_async: (store, token, model) => dispatch(actions.update_async(store, token, model)),
    };
};

export default connect(mapStateToProps, null)(Report);