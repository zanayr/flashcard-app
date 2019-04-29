import React, {Component} from 'react';

import style from './ContextActions.module.css';

class ContextActions extends Component {
    onClick (e, action) {
        e.stopPropagation();
        action();
    }
    render () {
        let buttons = Object.keys(this.props.buttons).map(key => {
            console.log(key);
            let css = [style.ContextAction];
            if (key === 'destructive') {
                css.push(style.Destructive);
            }
            if (this.props.active) {
                css.push(style.Active);
            }
            return (
                <div
                    className={css.join(' ')}
                    key={key}>
                    <div>
                        <button onClick={(e) => {this.onClick(e, this.props.buttons[key].action)}}>
                            {this.props.buttons[key].value}
                        </button>
                    </div>
                </div>
            )
        });
        return buttons;
    }
}

export default ContextActions;