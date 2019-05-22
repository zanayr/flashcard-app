// import React from 'react';

// import TextField from '../../ui/input/Field/TextField';
// import TextArea from '../../ui/input/TextArea/TextArea';

// const deckInspectForm = (props) => {
//     return (
//         <div>
//             <TextField
//                 config={{
//                     label: 'Title',
//                     maxLength: 32,
//                     minLength: 6,
//                     placeholder: 'Title',
//                     value: props.deck.primary
//                 }}
//                 key='primary'
//                 onChange={props.onChange}
//                 required
//                 target='primary'/>
//             <TextArea
//                 config={{
//                     label: 'Details',
//                     maxLength: 64,
//                     placeholder: 'Details',
//                     value: props.deck.secondary
//                 }}
//                 key='secondary'
//                 onChange={props.onChange}
//                 target='secondary'/>
//             <TextArea
//                 config={{
//                     label: 'Notes',
//                     maxLength: 128,
//                     placeholder: 'Notes',
//                     value: props.deck.notes
//                 }}
//                 key='notes'
//                 onChange={props.onChange}
//                 target='notes'/>
//         </div>
//     );
// }

// export default deckInspectForm;