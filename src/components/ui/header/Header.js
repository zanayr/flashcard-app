import React, {Component} from 'react';

import Row from '../../structure/row/Row';
import Logo from '../../ui/button/logo/Logo';
import Search from '../../ui/bars/search/Search';
import Toolbar from '../../ui/bars/toolbar/Toolbar';
import Navigation from '../../ui/button/navigation/Navigation';

class Header extends Component {
    render() {
        return (
            <header>
                <div className={AppCSS.Inner}>
                    <Row>
                        <Logo/>
                        <Search/>
                        <Toolbar/>
                        <Navigation/>
                    </Row>
                </div>
            </header>
        );
    }
}

export default Header;