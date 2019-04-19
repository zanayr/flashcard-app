import React, {Component} from 'react';

//import HorizontalSpace from '../../structure/space/Horizontal';
import Logo from '../../ui/button/logo/Logo';
import Search from '../../ui/search/Search';
import Toolbar from '../../ui/toolbar/Toolbar';
import Navigation from '../navigation/Navigation';

import globalCSS from '../../../Global.module.css';
import headerCSS from './Header.module.css';

class Header extends Component {
    render() {
        return (
            <header className={headerCSS.Header}>
                <div className={globalCSS.Inner}>
                    <Logo/>
                    <Search/>
                    <Toolbar/>
                    <Navigation/>
                </div>
            </header>
        );
    }
}

export default Header;