// import React, {Component} from 'react';
// import {connect} from 'react-redux';

// import * as actions from '../../store/actions/index';
// import * as select from '../../store/reducers/root';

// import ListItem from '../ui/ListItem/ListItem';
// import ContextAction from '../ui/button/Context/ContextAction';
// import ContextConfirm from '../ui/button/Context/ContextConfirm';

// import listStyles from './List.module.css';

// class List extends Component {
//     state = {
//         confirm: false
//     }

//     showConfirm () {
//         this.setState(prev => ({
//             ...prev,
//             confirm: true
//         }));
//     }
//     hideConfirm () {
//         this.setState(prev => ({
//             ...prev,
//             confirm: false
//         }));
//     }


//     onItemDelete = () => {
//         this.showConfirm();
//     }
//     onItemConfirm = (item) => {
//         this.props.deleteDeck_async(this.props.select_token, item);
//         this.props.actions.delete();
//     }
//     onItemSelect = (item) => {
//         this.hideConfirm();
//         this.props.actions.select(item);
//     }
//     _checkTags (item) {
//         const tags = this.props.current.tag.concat(this.props.filters.tag);
//         //const tags = this.props.filters.tag;
//         if (tags.length) {
//             let match = false;
//             item.tag.forEach(tag => {
//                 match = tags.includes(tag) || match;
//             });
//             return match;
//         } else {
//             return true;
//         }
//     }
//     _checkGroups (item) {
//         const groups = this.props.current.group.concat(this.props.filters.group);
//         //const groups = this.props.filters.group;
//         if (groups.length) {
//             if (item.group.length) {
//                 let match = true;
//                 item.group.forEach(tag => {
//                     match = groups.includes(tag) && match;
//                 });
//                 return match;
//             } else {
//                 return false;
//             }
//         } else {
//             return true;
//         }
//     }

//     render () {
//         let listItems = this.props.backingCollection.map(item => {
//             let isSelected = typeof this.props.selected.find(i => i.id === item.id) === 'object';
//             let isActive = isSelected && this.props.selected.length === 1;
//             if (this._checkGroups(item) && this._checkTags(item)) {
//                 return (
//                     <ListItem
//                         key={item.id}
//                         primary={item.primary}
//                         secondary={item.secondary}
//                         tags={item.tag}
//                         selected={isSelected}
//                         onSelect={() => this.onItemSelect(item)}>
//                         <ContextAction
//                             action={() => this.props.actions.inspect(item)}
//                             active={isActive}>
//                             Inspect
//                         </ContextAction>
//                         <ContextAction
//                             action={this.onItemDelete}
//                             active={isActive}
//                             destructive>
//                             Delete
//                         </ContextAction>
//                         <ContextConfirm
//                             action={() => this.onItemConfirm(item)}
//                             active={this.state.confirm && isActive}>
//                             Confirm
//                         </ContextConfirm>
//                     </ListItem>
//                 );
//             } else {
//                 return null;
//             }
//         });
//         return (
//             <section className={listStyles.List}>
//                 <div>
//                     {listItems}
//                 </div>
//             </section>
//         );
//     }
// }


// const mapStateToProps = state => {
//     return {
//         select_token: select.authToken(state)
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         deleteDeck_async: (token, item) => dispatch(actions.deleteDeck_async(token, item)),
//     };
// };


// export default connect(mapStateToProps, mapDispatchToProps)(List);