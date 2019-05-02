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


    toggleSelectedFilters = filter => {
        if (this.state.selected.indexOf(filter) > -1) {
            this.setState({selected: this.state.selected.filter(f => f !== filter)});
        } else {
            this.setState({selected: this.state.selected.concat(filter)});
        }
    }

    handle_onFilterClick = (category, filter) => {
        this.toggleSelectedFilters(filter);
        this.props.actions.onToggle(category, filter);
    }


    render () {
            const filterButtons = this.props.data.filters.map((filter, i) => {
            let css = [styles.FilterButton];
            if (this.state.selected.indexOf(filter) > -1) {
                css.push(styles.Active);
            }
            return (
                <div
                    className={css.join(' ')}
                    key={i}
                    onClick={() => this.handle_onFilterClick(this.props.data.category, filter)}>
                    <div>
                        <p>{filter}</p>
                    </div>
                </div>
            );
        });
        
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <Row just='Between'>
                        <h3>Filter</h3>
                        <IconButton onClick={() => this.props.onClose()}>X</IconButton>
                    </Row>
                    <div className={styles.FilterAside}>
                        <div>
                            {filterButtons}
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default FilterAside;