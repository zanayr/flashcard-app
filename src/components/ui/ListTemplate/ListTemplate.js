import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';

import ListItemTemplateStyles from './ListItemTemplate.module.css';

class ListItemTemplate extends Component {

    toggleSelected () {
        this.setState(prev => ({
            selected: !prev.selected
        }));
    }
    onSelect = () => {
        this.toggleSelected();
    }

    render () {
        let styling = [ListItemTemplateStyles.Display];
        if (this.state.selected) {
            styling = styling.concat(ListItemTemplateStyles.Selected);
        }
        return (
            <Aux>
                <div
                className={styling.join(' ')}
                onClick={this.onSelect}>
                    <div>
                        <h3>{this.props.display}</h3>
                        <p>{this.props.detail}</p>
                    </div>
                </div>
            </Aux>
        );
    }
}


export default ListItemTemplate;