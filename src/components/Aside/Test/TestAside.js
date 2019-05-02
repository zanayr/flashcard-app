import React, {Component} from 'react';

class TestAside extends Component {
    state = {
        foo: ''
    }

    componentDidMount () {
        this.setState({foo: this.props.data.foo});
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log(nextProps.data.foo !== this.props.data.foo);
        return true;
    }

    render () {
        console.log(this.props);
        return (
            <div>
                <div>
                    <h3>{this.state.foo}</h3>
                </div>
            </div>
        );
    }
}

export default TestAside;