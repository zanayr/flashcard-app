import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Row from '../../../hoc/Row/Row';
import Column from '../../../hoc/Column/Column';
import IconButton from '../../ui/button/Icon/IconButton';
import BarLink from '../../ui/link/Bar/BarLink';
import QuickForm from '../../form/Quick/QuickForm';
import TagForm from '../../form/Tag/TagForm';
import BarButton from '../../ui/button/Bar/BarButton';

import styles from './QuickAside.module.css';

class QuickAside extends Component {
    state = {
        form: this.props.data,
        tags: []
    }
    form = React.createRef();


    //  Methods  //
    //  Form  //
    udpate (target, value) {
        this.setState(prev => ({
            ...prev,
            form: {
                ...prev.form,
                [target]: value
            }
        }));
    }
    validate () {
        return this.form.current.reportValidity();
    }
    //  Tags  //
    add (tag) {
        this.setState(prev => ({
            ...prev,
            tags: prev.tags.concat(tag)
        }));
    }
    remove (tag) {
        this.setState(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag)
        }));
    }


    //  Event Handlers  //
    //  Form  //
    handle_onChange = (target, value) => {
        this.udpate(target, value);
        this.props.actions.onChange(target, value);
    }
    handle_onConfirm = () => {
        if (this.validate()) {
            this.props.actions.onConfirm(this.state);
        }
    }
    //  Tags  //
    handle_onTagToggle = tag => {
        if (this.state.tags.indexOf(tag) > -1) {
            this.remove(tag);
            this.props.actions.onRemove(tag);
        } else {
            this.add(tag);
            this.props.actions.onAdd(tag);
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
                    <form
                        className={styles.QuickForm}
                        ref={this.form}>
                        <QuickForm
                            data={this.state.form}
                            onChange={this.handle_onChange}/>
                    </form>
                    <TagForm
                        activeCollection={this.state.tags}
                        backingCollection={['foo', 'bar', 'spam', 'Really Long Tag Name', 'Tag', 'Tag2']}
                        toggle={this.handle_onTagToggle}/>
                    </div>
                    <div>
                        <BarButton onClick={this.handle_onConfirm}>Save</BarButton>
                        <BarLink path='u/inspect'>Edit</BarLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuickAside;