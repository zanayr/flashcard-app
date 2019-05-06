// import React from 'react';

// import TextField from '../../ui/input/Field/TextField';
// import TextArea from '../../ui/input/TextArea/TextArea';

// const quickInspectForm = (props) => {
//     return (
//         <div>
//             <TextField
//                 config={{
//                     label: 'Title',
//                     maxLength: 32,
//                     minLength: 6,
//                     placeholder: 'Title',
//                     value: props.data.primary
//                 }}
//                 key='title'
//                 onChange={props.onChange}
//                 required
//                 target='title'/>
//             <TextArea
//                 config={{
//                     label: 'Details',
//                     maxLength: 64,
//                     placeholder: 'Details',
//                     value: props.data.secondary
//                 }}
//                 key='details'
//                 onChange={props.onChange}
//                 target='details'/>
//             <TextArea
//                 config={{
//                     label: 'Notes',
//                     maxLength: 128,
//                     placeholder: 'Notes',
//                     value: props.data.notes
//                 }}
//                 key='notes'
//                 onChange={props.onChange}
//                 target='notes'/>
//         </div>
//     );
// }

// export default quickInspectForm;