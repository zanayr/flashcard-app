// import React from 'react';

// import styles from '../Input/Input.module.css';


// const tagField = (props) => {
//     const remaining = 24 - props.value.length;
//     let counterCSS = [styles.Counter];
//     if (remaining < 4) {
//         counterCSS.push(styles.Low);
//     }
//     return (
//         <div className={styles.Field}>
//             <div>
//                 <label>{props.config.label}</label>
//                 <input
//                     className={props.className}
//                     {...props.config}
//                     autoComplete={'off'}
//                     maxLength={24}
//                     minLength={3}
//                     name={props.config.name || props.target}
//                     placeholder={props.config.placeholder || props.config.label}
//                     name='tag'
//                     pattern={'[a-zA-z0-9 -.]+'}
//                     placeholder={props.label}
//                     required
//                     type='text'
//                     tabIndex={props.tabIndex || -1}
//                     value={props.value}
//                     onChange={(e) => props.onChange(e.target.value)}/>
//                 {props.children}
//                 <span className={counterCSS}><p>{remaining}</p></span>
//             </div>
//         </div>
//     );
// }


// export default tagField;