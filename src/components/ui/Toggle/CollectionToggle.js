// import React, {Component} from 'react';

// import * as utility from '../../../utility/utility';

// import Tag from '../../../ui/Tag/Tag';

// import styles from './CollectionToggle.module.css';


// class CollectionToggle extends Component {
//     state = {
//         selected: this.props.collection
//     }

//     toggleSelected (tag) {
//         const selected = this.state.selected.slice();
//     }

//     handle_onSelect = value => {
//         this.setState({selected: value});
//         this.props.toggle(value);
//     }
    
//     render () {
//         let tags = utility.sortByAlpha_asc(this.props.collection).map(collection => {
//             let isActive = false;
//             if (this.state.selectedItem === collection) {
//                 isActive = true;
//             }

//             return (
//                 <Tag
//                     active={isActive}
//                     key={collection}
//                     onClick={() => this.handle_onSelect(collection)}>
//                     {collection}
//                 </Tag>
//             );
//         });


//         return (
//             <div className={styles.CollectionToggle}>
//                 <div>
//                     {tags}
//                 </div>
//             </div>
//         );
//     }
// }


// export default CollectionToggle;