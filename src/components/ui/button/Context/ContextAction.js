import React, {Component} from 'react';

import ContextActionCSS from './ContextButton.module.css';

class ContextAction extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.active !== this.props.active;
    }

    render () {
        let classes = [];
        if (this.props.active) {
            classes = classes.concat(ContextActionCSS.Active);
        }
        if (this.props.confirm) {
            classes = classes.concat(ContextActionCSS.Confirm);
        }
        if (this.props.destructive) {
            classes = classes.concat(ContextActionCSS.Delete);
        }

        const handle_onClick = (e) => {
            e.stopPropagation();
            this.props.action(this.props.itemKey);
        }

        let button = (null);
        if (this.props.active) {
            button = (
                <button onClick={(e) => handle_onClick(e)}>
                    {this.props.children}
                </button>
            );
        }

        return (
            <div className={[ContextActionCSS.Context_Action].concat(classes).join(' ')}>
                <div>
                    {button}
                </div>
            </div>
        );
    }
}

export default ContextAction;