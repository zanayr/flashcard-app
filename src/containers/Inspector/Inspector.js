import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as sortTypes from '../../utility/sortTypes';
import * as utility from '../../utility/utility';


import Throbber from '../../components/ui/Throbber/Throbber';
import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside from '../../components/aside/Aside/Aside';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import QuickBar from '../../components/ui/bar/Quick/QuickBar';
import TabBar from '../../components/ui/bar/Tab/TabBar';
import TabForm from '../../components/form/Tab/TabForm';
import withUser from '../../hoc/withUser/withUser';

import styles from './Inspector.module.css';

class Inspector extends Component {
    state = {
        aside: {
            state: 0
        },
        current: {
            collection: this.props.match.params.id,
            date: 0,
            delete: false,
            group: [],
            id: 'all',
            name: 'All',
            tag: []
        },
        collection: {},
        deck: {},
        filters: {
            group: [],
            tag: []
        },
        group: this.props.user.group,
        isLoading: true,
        inspect: {},
        page: '',
        quick: [],
        selected: [],
        sort: sortTypes.DATE_ASC,
        tab: {
            all: {
                collection: this.props.match.params.id,
                date: 0,
                delete: false,
                group: [],
                id: 'all',
                name: 'All',
                tag: []
            }
        },
        tag: this.props.user.tag,
        undo: {
            action: null,
            data: {}
        },
    }

    componentDidMount () {
        // let collection = this.props.select_collection;
        // let allCards = this.props.select_cards;
        // let members = {};
        // Object.keys(allCards).map(id => {
        //     if (collection.members.includes(id)) {
        //         members[id] = {...allCards[id]};
        //     }
        // });

        // switch (this.props.match.url.match('u\/(.*)\/')[1]) {
        //     case 'deck':
        //         collection = this.props.select_collection;
        //         break;
        //     // case 'card':
        //     //     collection = [];
        //     //     break;
        //     default:
        //         break;
        // }
        // this.setState(prev => ({
        //     ...prev,
        //     collection: collection,
        //     members: members,
        //     isLoading: false
        // }));
        const cards = this.props.select_cards;
        const deck = this.props.select_deck;
        this.setState(prev => ({
            ...prev,
            deck: deck
        }));
        this.setState(prev => ({
            ...prev,
            collection: Object.keys(cards).filter(id => deck.member.includes(id)).map(id => {
                if (deck.member.includes(id)) {
                    return create.cardViewModel(id, cards[id]);
                }
            })
        }), () => {
            this.setState(prev => ({
                ...prev,
                isLoading: false
            }));
        });
    }

    componentDidUpdate (prevProps, prevState) {
        // let collection;
        // if (prevProps.match.params.collection !== this.props.match.params.collection) {
        //     switch (this.props.match.params.collection) {
        //         case 'deck':
        //             collection = this.props.select_decks;
        //             break;
        //         case 'card':
        //             collection = this.props.select_cards;
        //             break;
        //         default:
        //             break;
        //     }
        //     this.setState(prev => ({
        //         ...prev,
        //         collection: collection,
        //         page: this.props.match.params.collection
        //     }));
        // }
    }




    //  Quicks  ------------------------------------------------------------  Quicks //
    clearQuick (value) {
        this.setState(prev => ({
            ...prev,
            quick: prev.quick.filter(q => q !== value)
        }))
    }
    setQuick (value) {
        if (!this.state.quick.includes(value)) {
            this.setState(prev => ({
                ...prev,
                quick: prev.quick.concat(value)
            }));
        }
    }

    //  Aside  -------------------------------------------------------------  Aside  //
    clearAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                actions: {},
                data: {},
                state: 0
            }
        }));
    }
    setAsideData (data) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {
                    ...data
                }
            }
        }));
    }
    updateAsideData (property, data) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {
                    ...prev.aside.data,
                    [property]: data
                }
            }
        }));
    }
    setAsideActions (actions) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                actions: {
                    ...actions
                }
            }
        }));
    }
    toggleAside (state) {
        if (this.state.aside.state) {
            if (state !== this.state.aside.state && this.state.aside.isActive) {
                this.setState(prev => ({
                    ...prev,
                    aside: {
                        ...prev.aside,
                        state: state
                    }
                }));
            } else {
                this.setState(prev => ({
                    ...prev,
                    aside: {
                        ...prev.aside,
                        isActive: 0
                    }
                }));
            }
        } else {
            this.setState(prev => ({
                ...prev,
                aside: {
                    ...prev.aside,
                    state: state
                }
            }));
        }
    }
 
    //  Undo  --------------------------------------------------------------  Undo  //
    // clearUndo () {
    //     this.setState(prev => ({
    //         ...prev,
    //         undo: {
    //             action: null,
    //             data: {}
    //         }
    //     }));
    // }
    // setUndo (data) {
    //     this.setState(prev => ({
    //         ...prev,
    //         undo: {
    //             ...data
    //         }
    //     }));
    // }

    //  Inspector  -------------------------------------------------  Inspector  //
    addCard (card) {
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                [card.id]: card
            }
        }));
    }
    // removeItem (item) {
    //     const collection = this.state.collection;
    //     delete collection[item.id];
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: {
    //             ...collection
    //         }
    //     }));
    // }
    // resetCollection (collection) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: collection
    //     }));
    // }
    // setItem (item) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: {
    //             ...prev.collection,
    //             [item.id]: {...item}
    //         }
    //     }));
    // }
    // setManyItems (items) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: {
    //             ...prev.collection,
    //             ...items
    //         }
    //     }));
    // }
    setItemValue (target, value) {
        console.log(target, value);
        const itemId = this.state.aside.data.item.id;
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                [itemId]: {
                    ...prev.collection[itemId],
                    [target]: value
                }
            }
        }));
    }

    //  Inspected  -----------------------------------------------------  Inspected  //
    // setInspected (item) {
    //     this.setState(prev => ({
    //         ...prev,
    //         inspected: item
    //     }));
    // }

    //  Lists  -------------------------------------------------------------  Lists  //
    clearSelected (item) {
        if (typeof item === 'undefined') {
            this.setState(prev => ({
                ...prev,
                selected: []
            }));
        } else {
            this.setState(prev => ({
                ...prev,
                selected: [item]
            }));
        }
    }
    setSelected (selected) {
        this.setState(prev => ({
            ...prev,
            selected: selected
        }));
    }

    //  Filters  ---------------------------------------------------------  Filters  //
    // clearFilters () {
    //     this.setState(prev => ({
    //         ...prev,
    //         aside: {
    //             ...prev.aside,
    //             data: {
    //                 ...prev.aside.data,
    //                 selected: []
    //             }
    //         },
    //         filters: {
    //             groups: [],
    //             tags: []
    //         }
    //     }));
    // }
    // setFilters (category, filters) {
    //     this.setState(prev => ({
    //         ...prev,
    //         aside: {
    //             ...prev.aside,
    //             data: {
    //                 ...prev.aside.data,
    //                 selected: filters[category]
    //             }
    //         },
    //         filters: {
    //             ...prev.filters,
    //             [category]: filters[category]
    //         }
    //     }));
    // }

    //  Tags  ---------------------------------------------------------------  Tags  //
    // setTags (category, tags) {
    //     this.setState(prev => ({
    //         ...prev,
    //         [category]: tags
    //     }));
    // }

    //  Tabs  ---------------------------------------------------------------  Tabs  //
    // addTab (tab) {
    //     this.setState(prev => ({
    //         ...prev,
    //         tabs: {
    //             ...prev.tabs,
    //             [tab.id]: tab
    //         }
    //     }));
    // }
    // setCollection (collection) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: collection
    //     }));
    // }
    // setCurrent (tab) {
    //     this.setState(prev => ({
    //         ...prev,
    //         current: tab
    //     }));
    // }
    // resetTabs (tabs) {
    //     this.setState(prev => ({
    //         ...prev,
    //         tabs: {
    //             ...tabs
    //         }
    //     }));
    // }

    //  Sort  ---------------------------------------------------------------  Sort  //
    // setSort (sort) {
    //     this.setState(prev => ({
    //         ...prev,
    //         sort: sort
    //     }));
    // }

    //  Action  -----------------------------------------------------------  Action  //
    handle_onActionClick = () => {
        const card = create.cardViewModel(utility.createHashId(0), {
            owner: this.props.select_user.id,
            primary: 'New Card',
            secondary: 'Lorem ipsum'
        });
        this.addCard(card);
        this.toggleAside(97);
        this.setAsideData({
            group: this.state.group,
            item: card,
            deckId: this.state.deck.id,
            tag: this.state.tag
        });
        this.setAsideActions({change: this.handle_onItemChange});
        this.clearSelected();
        this.clearQuick('s');
    }


    //  Aside  -------------------------------------------------------------  Aside  //
    // handle_onInspectOut = () => {
    //     const original = this.state.aside.data.item;
    //     const item = this.state.collection[original.id];
    //     if (JSON.stringify(item) !== JSON.stringify(original)) {
    //         this._checkForNewTags('tags', item.tags);
    //         this._checkForNewTags('groups', item.groups);
    //         switch (this.state.aside.state) {
    //             case 98:
    //                 this.props.addCard_async(this.props.token, item);
    //                 break;
    //             case 99:
    //                 this.props.updateCard_async(this.props.token, item);
    //                 this.setQuick('u');
    //                 break;
    //             default:
    //                 break;
    //         }
    //     } else if (this.state.aside.state === 98) {
    //         this.removeItem(item);
    //     }
    // }
    // handle_onAsideClose = () => {
    //     if (this.state.aside.state >= 98) {
    //         this.handle_onInspectOut();
    //     }
    //     this.clearAside();
    // }
    
    // handle_onFilterSelect = (category, tag) => {
    //     const filters = {...this.state.filters};
    //     if (filters[category].includes(tag)) {
    //         filters[category] = filters[category].filter(t => t !== tag);
    //     } else {
    //         filters[category] = filters[category].concat(tag);
    //     }
    //     this.setFilters(category, filters);
    //     this.updateAsideData('filters', filters);
    //     if (filters.tags.length || filters.groups.length) {
    //         this.setQuick('f');
    //     } else {
    //         this.clearQuick('f');
    //     }
    // }

    // handle_onAsideToggle = (state) => {
    //     if (this.state.aside.state !== state) {
    //         if (state === 2 || state === 3) {
    //             this.setAsideActions({
    //                 filter: this.handle_onFilterSelect
    //             });
    //             this.setAsideData({
    //                 current: this.state.current,
    //                 filters: this.state.filters,
    //                 groups: this.state.groups,
    //                 tags: this.state.tags
    //             });
    //         }
    //         this.toggleAside(state);
    //     } else {
    //         this.handle_onAsideClose();
    //     }
    // }

    handle_onItemChange = (target, value) => {
        this.setItemValue(target, value);
    }
    handle_onItemInspect = (item) => {
        // this.toggleAside(99);
        // this.setAsideData({
        //     groups: this.state.groups,
        //     item: item,
        //     tags: this.state.tags
        // });
        // this.setAsideActions({change: this.handle_onItemChange});
        // this.setUndo({
        //     action: this.handle_onItemReset,
        //     data: item
        // });
        // this.clearQuick('s');
    }
    handle_onItemSelect = (item) => {
        let selected = this.state.selected.slice();
        if (selected.find(i => i.id === item.id)) {
            selected = selected.filter(i => i.id !== item.id);
        } else {
            selected = selected.concat(item);
        }
        if (selected.length) {
            this.setQuick('s');
        } else {
            this.clearQuick('s');
        }
        if (this.state.aside.state === 99) {
            this.handle_onAsideClose();
        }
        this.setSelected(selected);
    }

    // _checkForNewTags (category, tags) {
    //     const newTags = tags.filter(tag => this.state[category].indexOf(tag) < 0);
    //     let allTags;
    //     if (newTags.length) {
    //         allTags = this.state[category].concat(newTags);
    //         this.setTags(category, allTags);
    //         this.props.putTag_async(category, this.props.token, this.props.user.id, allTags);
    //     }
    // }
    // _findTheNextTab (tab) {
    //     const tabs = utility.sortBy(sortTypes.DATE_DSC, this.state.tabs).filter(tab => tab.collection === this.state.page);
    //     return tabs[tabs.indexOf(tab) + 1];
    // }


    //  EVENT HANDLERS  //
    //  Inspector  ---------------------------------------------  Inspector EHs  //
    // handle_onCollectionSort = (sort) => {
    //     this.setSort(sort);
    // }
    // handle_onItemsCreate = (items) => {
    //     const created = {};
    //     items.forEach(item => {
    //         created[item.id] = item;
    //     });
    //     this.setManyItems(created);
    //     this.clearSelected();
    //     this.clearQuick('s');
    // }
    handle_onItemsDelete = () => {
        // const collection = this.state.collection;
        // this.state.selected.slice().forEach(item => {
        //     delete collection[item.id];
        // });
        // this.setUndo({
        //     action: this.handle_onItemsRecover,
        //     data: this.state.selected.slice()
        // });
        // this.setQuick('u');
        // this.resetCollection(collection);
        // this.clearQuick('s');
        // this.clearSelected();
    }
    // handle_onItemsRecover = () => {
    //     const deleted = this.state.undo.data;
    //     const recovered = {}
    //     deleted.map(item => {
    //         recovered[item.id] = item
    //     });
    //     this.setManyItems(recovered);
    //     this.clearQuick('u');
    //     this.clearUndo();
    //     this.props.addManyCards_async(this.props.select_token, deleted);
    // }
    // handle_onItemReset = () => {
    //     const item = this.state.undo.data;
    //     this.setItem(item);
    //     this.clearQuick('u');
    //     this.clearUndo();
    //     this.props.addCard_async(this.props.select_token, item);
    // }
    
    // //  Filters  -----------------------------------------------------  Filters EHs  //
    // handle_onFilterClear = () => {
    //     this.clearFilters();
    //     this.clearQuick('f');
    //     this.updateAsideData('filters', {
    //         groups: [],
    //         tags:[]
    //     });
    // }

    // //  Main  -----------------------------------------------------------  Main EHs  //
    // handle_onMainClick = () => {
    //     this.handle_onAsideClose();
    //     this.clearSelected();
    //     this.clearQuick('s');
    // }

    // //  Selected  ---------------------------------------------------  Selected EHs  //
    // handle_onItemSelectClear = (card) => {
    //     this.clearSelected(card);
    //     this.clearQuick('s');
    // }

    // //  Tab  -------------------------------------------------------------  Tab EHs  //
    // handle_onTabDelete = (tab) => {
    //     let tabs = this.state.tabs;
    //     if (this.state.current.id === tab.id) {
    //         this.handle_onTabToggle(this._findTheNextTab(tab));
    //     }
    //     delete tabs[tab.id];
    //     this.resetTabs(tabs);
    // }
    // handle_onTabToggle = (tab) => {
    //     this.setCurrent(tab);
    //     if (this.state.aside.state && this.state.aside.state === 2 || this.state.aside.state === 3) {
    //         this.updateAsideData('current', tab);
    //     }
    //     this.clearSelected();
    //     this.clearQuick('s');
    // }
    // handle_onTabCreate = (tab) => {
    //     this._checkForNewTags('groups', tab.groups);
    //     this._checkForNewTags('tags', tab.tags);
    //     this.addTab(tab);
    //     this.handle_onTabToggle(tab);
    // }


    render () {
        let mainContent = null;
        if (this.state.isLoading) {
            mainContent = (<Throbber/>);
        } else {
            mainContent = (
                <List
                    actions={{
                        delete: this.handle_onItemsDelete,
                        inspect: this.handle_onItemInspect,
                        select: this.handle_onItemSelect
                    }}
                    backingCollection={utility.sortBy(this.state.sort, this.state.collection)}
                    filters={this.state.filters}
                    tab={{
                        tag: [],
                        group: []
                    }}
                    page={this.state.page}
                    selected={this.state.selected}/>
            );
        }
        return (
            <Aux>
                <h1>{this.props.match.params.id}</h1>
                <Header
                    actions={{
                        create: this.handle_onItemsCreate,
                        delete: this.handle_onItemsDelete,
                        sort: this.handle_onCollectionSort,
                        toggle: this.handle_onAsideToggle
                    }}
                    page={this.state.page}
                    selected={this.state.selected}
                    onClick={this.handle_onAsideClose}/>
                <main
                    className={styles.Main}
                    onClick={this.handle_onMainClick}>
                    <div>
                        <TabBar
                            actions={{
                                delete: this.handle_onTabDelete,
                                toggle: this.handle_onTabToggle,
                            }}
                            page={this.state.page}
                            backingCollection={this.state.tab}
                            // active={this.state.current.id}
                            onClick={this.handle_onAsideClose}/>
                        {mainContent}
                        <ActionButton
                            onClick={this.handle_onActionClick}
                            state={0}
                            values={['Create', 'Study']}/>
                        <QuickBar
                            actions={{
                                onUndo: this.state.undo.action,
                                onFilterClear: this.handle_onFilterClear,
                                onSelectClear: this.handle_onItemSelectClear
                            }}
                            data={this.state.quick}/>
                    </div>
                </main>
                <Aside
                    actions={this.state.aside.actions}
                    data={this.state.aside.data}
                    page={this.state.page}
                    state={this.state.aside.state}/>
            </Aux>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        //select_collection: select.collection(state, ownProps.match.url.match('u\/(.*)\/')[1], ownProps.match.params.id),
        select_deck: select.deck(state, ownProps.match.params.id),
        select_cards: select.cards(state),
        select_token: select.authToken(state),
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addCard_async: (token, item) => dispatch(actions.addCard_async(token, item)),
        addManyCards_async: (token, items) => dispatch(actions.addManyCards_async(token, items)),
        updateCard_async: (token, item) => dispatch(actions.updateCard_async(token, item)),
        putTag_async: (category, token, user, data) => dispatch(actions.putTag_async(category, token, user, data)),
        patchTab_async: (token, user, data) => dispatch(actions.patchTab_async(token, user, data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(Inspector));