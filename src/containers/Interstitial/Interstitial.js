import React from 'react';
import {Redirect} from 'react-router-dom';


const interstitial = (props) => {
    let content;
    if (props.location.state) {
        content = <Redirect to={'/0/' + props.match.params.store + '/' + props.location.state.id}/>;
    } else {
        if (props.match.params.store === 'deck' || props.match.params.store === 'class') {
            content = <Redirect to={'/0/' + props.match.params.store}/>;
        } else {
            content = <Redirect to={'/1/' + props.match.params.store}/>;
        }
        
    }

    return content
}

export default interstitial;