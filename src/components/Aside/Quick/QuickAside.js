import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Row from '../../../hoc/Row/Row';
import Column from '../../../hoc/Column/Column';
import IconButton from '../../ui/button/Icon/IconButton';
import BarLink from '../../ui/link/Bar/BarLink';
import QuickForm from '../../form/Quick/QuickForm';
import TagForm from '../../form/Tag/TagForm';

import styles from './QuickAside.module.css';

class QuickAside extends Component {
    state = {
        tags: []
    }

    handle_onTagToggle = tag => {
        console.log(tag);
        if (this.state.tags.indexOf(tag) > -1) {
            this.setState(prev => ({
                ...prev,
                tags: prev.tags.filter(t => t !== tag)
            }));
        } else {
            this.setState(prev => ({
                ...prev,
                tags: prev.tags.concat(tag)
            }));
        }
    }

    render () {
        return (
            <div className={styles.QuickInspect_Aside}>
                <div>
                    <div>
                    <Row just='Between'>
                        <h3>Quick Inspect</h3>
                        <IconButton onClick={this.props.onClose}>X</IconButton>
                    </Row>
                    <QuickForm
                        actions={this.props.actions}
                        data={this.props.data}/>
                    <TagForm
                        activeCollection={this.state.tags}
                        backingCollection={['foo', 'bar', 'spam', 'Really Long Tag Name', 'Tag', 'Tag2']}
                        toggle={this.handle_onTagToggle}/>
                    </div>
                    <Row>
                        <BarLink path='u/inspect'>Open Inspector</BarLink>
                    </Row>
                </div>
            </div>
        );
    }
}

export default QuickAside;