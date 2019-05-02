import React, {Component} from 'react';

import NavigationAiside from '../Nav/NavAside';
import FilterAside from '../Filter/FilterAside';
import QuickInspectAside from '../Quick/QuickAside';

import TestAside from '../Test/TestAside';

import styles from '../Aside.module.css';

class Aside extends Component {
    render () {
        let aside = null;
        if (this.props.active) {
            switch (this.props.state) {
                case 1:
                    aside = (
                        <NavigationAiside
                            actions={this.props.actions}
                            data={this.props.data}
                            onClose={this.props.onClose}/>
                    );
                    break;
                case 2:
                    aside = (
                        <FilterAside
                            actions={this.props.actions}
                            data={this.props.data}
                            onClose={this.props.onClose}/>
                    );
                    break;
                case 3:
                    aside = (
                        <TestAside
                            data={this.props.data}/>
                    );
                    break;
                case 99:
                    aside = (
                        <QuickInspectAside
                            actions={this.props.actions}
                            data={this.props.data}
                            onClose={this.props.onClose}/>
                    );
                    break;
                default:
                    aside = (
                        null
                    );
                    break;
            }
        }
        return aside;
    }
}

export default Aside;