// import React, {Component} from 'react';

// import ContextAction from '../ui/button/Context/ContextAction';
// import SelectableListItem from '../ui/ListItem/SelectableListItem';

// import ListItem2 from '../ui/ListItem/ListItem2';
// import ListItemTemplate2 from '../ui/ListTemplate/ListItemTemplate2';

// import AppCSS from '../../App.module.css';
// import ListCSS from './List.module.css';


// import css from './../ui/ListItem/Back/Back.module.css';

// class ListItemBack extends Component {
//     state = {
//         selected: false
//     }

//     toggleSelect () {
//         this.setState(prev => ({selected: !prev.selected}));
//     }

//     onSelect = () => {
//         this.toggleSelect();
//         this.props.onSelect()
//     }

//     render () {
//         let style = [css.List_Item_Back];
//         if (this.state.selected) {
//             style = style.concat(css.Selected);
//         }
//         return (
//             <span
//                 className={style.join(' ')}
//                 onClick={this.onSelect}></span>
//         );
//     }
// }

// class SelectableList extends Component {
//     state = {
//         selected: [],
//         single: false,
//     }


//     render () {
//         // let items = this.state.collection.map(item => {
//         //     let isActive = this.state.selected.length === 1 && this.state.selected[0] === item.key;
//         //     let isSelected = false;
//         //     if (item.isSelected) {
//         //         isSelected = true;
//         //     }
//         //     let css = [ListCSS.List_Item]
//         //     if (item.isNew) {
//         //         css.push(ListCSS.New);
//         //     }
//         //     if (this.state.deleted.indexOf(item.key) > -1) {
//         //         css.push(ListCSS.Hidden);
//         //     }
//         //     // return (
//         //     //     <ListItem2
//         //     //         key={item.key}
//         //     //         selected={isSelected}>
//         //     //         <ListItemTemplate2
//         //     //             detail={item.details}
//         //     //             display={item.title}
//         //     //             onSelect={() => this.onItemSelect(item.key)}
//         //     //             state={item.state}/>
//         //     //         <ContextAction
//         //     //             action={() => this.onItemEdit(item.key)}
//         //     //             active={isActive}>
//         //     //             Edit
//         //     //         </ContextAction>
//         //     //         <ContextAction
//         //     //             action={() => this.onItemDelete(item.key)}
//         //     //             active={isActive}
//         //     //             destructive>
//         //     //             Delete
//         //     //         </ContextAction>
//         //     //         <ContextAction
//         //     //             action={() => this.onConfrim(item.key)}
//         //     //             active={this.state.confirm && isActive}
//         //     //             confirm>
//         //     //             Confirm
//         //     //         </ContextAction>
//         //     //         <ContextAction
//         //     //             action={() => this.onCancel(item.key)}
//         //     //             active={this.state.confirm && isActive}
//         //     //             cancel>
//         //     //             Cancel
//         //     //         </ContextAction>
//         //     //     </ListItem2>
//         //     // );
//         //     return (
//         //         <ListItem>
//         //             {this.props.children}
//         //             <ListItemBack onSelect={this.props.onItemSelect}/>
//         //         </ListItem>
//         //     );
//         // });
//         return (
//             <div className={ListCSS.List}>
//                 <div className={AppCSS.Inner}>
//                     {this.props.children}
//                 </div>
//             </div>
//         )
//     }
// }


// export default SelectableList;