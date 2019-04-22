import React, {Component} from "react";

import Aux from "../aux/Aux";
import Modal from "../../components/ui/modal/Modal";

const withErrorModal = (Wrapped, axios) => {
    return class extends Component {
        state = {
            data: {
                details: [],
                message: "",
                title: ""
            },
            isActive: false
        }

        _modalClear = () => {
            this.setState(prev => ({
                ...prev,
                data: {
                    details: [],
                    message: "",
                    title: "" 
                },
                isActive: false
            }));
        }
        _modalSet = (data) => {
            this.setState(prev => ({
                ...prev,
                data: {
                    details: data.details,
                    message: data.message,
                    title: data.title
                },
                isActive: true
            }));
        }

        componentDidMount () {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this._modalClear();
                return request;
            });
            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this._modalSet({
                    details: [],
                    message: error.message,
                    title: "Database Error!"
                })
            });
        }
        componentWillUnmount () {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        handle_onConfirm = () => {
            this._modalClear();
        }

        render() {
            return (
                <Aux>
                    <Wrapped {...this.props}/>
                    <Modal
                        active={this.state.isActive}
                        data={this.state.data}
                        onConfirm={this.handle_onConfirm}/>
                </Aux>
            );
        }
    };
}

export default withErrorModal;