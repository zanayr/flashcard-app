// import React from 'react';

// import InputCSS from '../Input/Input.module.css';


// const textArea = (props) => {
//     const handle_onChange = (e) => {
//         props.onChange(props.target, e.target.value);
//     }

//     let textarea = (
//         <textarea
//             className={InputCSS.Text_Area}
//             onChange={(e) => handle_onChange(e)}
//             {...props.config}/>
//     );
//     if (props.requierd) {
//         textarea = (
//             <textarea
//                 className={InputCSS.Text_Area}
//                 onChange={(e) => handle_onChange(e)}
//                 required
//                 {...props.config}/>
//         );
//     }
//     return (
//         <div className={InputCSS.Field}>
//             <div>
//                 <label>{props.config.label}</label>
//                 {textarea}
//                 <span><p>{props.config.maxLength - props.config.value.length}</p></span>
//                 {props.children}
//             </div>
//         </div>
//     );
// }


// export default textArea;