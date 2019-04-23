import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

import Aux from '../../../hoc/aux/Aux';
import Header from '../../../components/ui/Header/Header';
import Throbber from '../../../components/ui/throbber/Throbber';
import List from '../../../components/ui/list/List/List';
import ActionButton from '../../../components/ui/action/ActionButton';

class CollectionInspector extends Component {
    render () {
        return (
            <h1>Collection Inspector</h1>
        );
    };
}

export default CollectionInspector;