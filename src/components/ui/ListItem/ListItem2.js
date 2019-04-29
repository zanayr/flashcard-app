import React, {PureComponent} from 'react';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';


class ListItem2 extends PureComponent {
    // shouldComponentUpdate (nextProps, nextState) {
    //     return nextProps.selected !== this.props.selected;
    // }
    render () {
        // console.log('rendering item');
        // let css = [ListItemCSS.List_Item];
        // if (this.props.selected) {
        //     css = css.concat(ListItemCSS.Selected)
        // }

        return (
            <section
                className={css.join(' ')}>
                <div className={AppCSS.Inner}>
                    {this.props.children}
                    <ListItemBack onSelect={this.props.onItemSelect}/>
                </div>
            </section>
        );
    }
}


export default ListItem2;