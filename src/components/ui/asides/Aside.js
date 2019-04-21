import React, {Component} from "react";

import NavigationAiside from "./navigation/NavigationAside";
import QuickEditAside from "./quick/QuickEditAside";

import globalCSS from "../../../Global.module.css";
import asideCSS from "./Aside.module.css";

class Aside extends Component {
    handle_onClick = (e) => {
        e.stopPropagation();
    }
    handle_onXClicked = () => {
        this.props.onX();
    }

    render() {
        let asideContent;
        let cssClasses = [asideCSS.Aside];
        if (this.props.active) {
            cssClasses = [...cssClasses, asideCSS.Active];
        }

        switch (this.props.state) {
            case 0:
                asideContent = (
                    <h3>Aside #{this.props.state}</h3>
                );
                break;
            case 1:
                asideContent = (
                    <h3>Aside #{this.props.state}</h3>
                );
                break;
            case 2:
                asideContent = (
                    <NavigationAiside onX={this.handle_onXClicked}/>
                );
                break;
            case 3:
                asideContent = (
                    <QuickEditAside
                        data={this.props.data}
                        onChange={this.props.onChange}
                        onX={this.handle_onXClicked}/>
                );
                break;
            default:
                asideContent = (
                    <NavigationAiside onX={this.handle_onXClicked}/>
                );
                break;
        }

        return (
            <aside
                className={cssClasses.join(' ')}
                onClick={(e) => this.handle_onClick(e)}>
                <div className={globalCSS.Inner}>
                    {asideContent}
                </div>
            </aside>
        );
    }
}

export default Aside;