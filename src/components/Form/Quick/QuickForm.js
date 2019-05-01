import React from 'react';

import TextField from '../../ui/input/Field/TextField';
import TextArea from '../../ui/input/TextArea/TextArea';

const quickInspectForm = (props) => {
    return (
        <div>
            <TextField
                config={{
                    label: 'Title',
                    maxLength: 64,
                    minLength: 6,
                    placeholder: 'Title',
                    value: props.data.title
                }}
                key='title'
                onChange={props.onChange}
                required
                target='title'/>
            <TextArea
                config={{
                    label: 'Details',
                    maxLength: 64,
                    placeholder: 'Details',
                    value: props.data.details
                }}
                key='details'
                onChange={props.onChange}
                target='details'/>
        </div>
    );
}

export default quickInspectForm;