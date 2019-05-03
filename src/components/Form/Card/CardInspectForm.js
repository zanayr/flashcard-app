import React from 'react';

import TextField from '../../ui/input/Field/TextField';
import TextArea from '../../ui/input/TextArea/TextArea';

const cardInspectForm = (props) => {
    return (
        <div>
            <TextField
                config={{
                    label: 'Card Back',
                    maxLength: 32,
                    minLength: 6,
                    placeholder: 'Card Front',
                    value: props.card.primary
                }}
                key='primary'
                onChange={props.onChange}
                required
                target='primary'/>
            <TextArea
                config={{
                    label: 'Card Back',
                    maxLength: 64,
                    placeholder: 'Card Back',
                    value: props.card.secondary
                }}
                key='secondary'
                onChange={props.onChange}
                target='secondary'/>
            <TextArea
                config={{
                    label: 'Notes',
                    maxLength: 128,
                    placeholder: 'Notes',
                    value: props.card.notes
                }}
                key='notes'
                onChange={props.onChange}
                target='notes'/>
        </div>
    );
}

export default cardInspectForm;