// import React, {Component} from 'react';

// import styles from './Context.module.css';

// class ContextAction extends Component {
//     onClick (e) {
//         e.stopPropagation();
        
//         this.props.action();
//     }

//     render () {
//         let css = [styles.ContextAction, styles.Confirm];
//         if (this.props.active) {
//             css.push(styles.Active);
//         }

//         return (
//             <div className={css.join(' ')}>
//                 <div>
//                     <button onClick={(e) => {this.onClick(e)}}>
//                         {this.props.children}
//                     </button>
//                 </div>
//             </div>
//         );
//     }
// }

// export default ContextAction;