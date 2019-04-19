import React, {Component} from 'react';

import NavigationButton from '../../ui/button/navigation/NavigationButton';

import globalCSS from '../../../Global.module.css';
import asideCSS from './Aside.module.css';

class Aside extends Component {
    state = {
        navigation: [{
            value: "Sign Out",
            path: "/logout"
        }]
    }
    render() {
        let content = this.state.navigation.map(button => {
            return (
                <NavigationButton
                    key={this.state.navigation.indexOf(button)}
                    path={button.path}>
                    {button.value}
                </NavigationButton>
            );
        });
        if (this.props.asideState !== 2) {
            content = (<h3>Aside #{this.props.asideState}</h3>);
        }
        return (
            <aside className={[asideCSS.Aside, this.props.active ? asideCSS.Active : ''].join(' ')}>
                <div className={globalCSS.Inner}>
                    {content}
                </div>
            </aside>
        );
    }
}

export default Aside;