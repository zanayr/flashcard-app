import React, {Component} from 'react';
//import * as utility from '../../../utility';

import Aux from '../../../hoc/Aux/Aux';
import Row from '../../../hoc/Row/Row';
import IconButton from '../../ui/button/Icon/IconButton';
import BarButton from '../../ui/button/Bar/BarButton';

import styles from '../Aside.module.css';

class FilterAside extends Component {
    state = {
        selected: []
    }

    handle_onSelect = (tag) => {
        if (this.state.selected.includes(tag)) {
            this.setState({selected: this.state.selected.filter(t => t !== tag)});
        } else {
            this.setState({selected: this.state.selected.concat(tag)});
        }
        this.props.actions.onSelect(this.props.data.category, tag);
    }


    render () {
        const tagButtons = this.props.data.tags.map((tag, i) => {
            let css = [styles.FilterButton];
            if (this.state.selected.includes(tag)) {
                css.push(styles.Active);
            }
            return (
                <div
                    className={css.join(' ')}
                    key={i}
                    onClick={() => this.handle_onSelect(tag)}>
                    <div>
                        <p>{tag}</p>
                    </div>
                </div>
            );
        });
        
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <h3>Filter</h3>
                    <p>Instructions on how to filter here.</p>
                    <div className={styles.FilterAside}>
                        <div>
                            {tagButtons}
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default FilterAside;