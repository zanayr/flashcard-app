// import React, {Component} from 'react';

// import styles from './Context.module.css';

// class ContextAction extends Component {
//     shouldComponentUpdate (nextProps, nextState) {
//         return nextProps.active !== this.props.active;
//     }

//     onClick (e) {
//         e.stopPropagation();
        
//         this.props.action();
//     }

//     render () {
//         let css = [styles.ContextAction];
//         if (this.props.active) {
//             css.push(styles.Active);
//         }
//         if (this.props.destructive) {
//             css.push(styles.Destructive);
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