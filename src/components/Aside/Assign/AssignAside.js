import React, {Component} from 'react';

import styles from '../Aside.module.css';

class AssignAside extends Component {
    handle_onSelect = (collection) => {
        this.props.actions.toggle(collection);
    }

    render () {
        console.log(this.props);
        const collectionButtons = this.props.data.all.map((collection, i) => {
            let css = [styles.AssignButton];
            let name = collection.primary;
            // if (this.props.data.selected.includes(collection.id)) {
            //     css.push(styles.Active);
            //     return (
            //         <div
            //             className={css.join(' ')}
            //             key={i + 1}
            //             onClick={() => this.handle_onSelect(collection)}>
            //             <div>
            //                 <p>{name}</p>
            //             </div>
            //         </div>
            //     );
            // } else if (this.props.data.member.includes(collection)) {
            //     css.push(styles.Static);
            //     return (
            //         <div
            //             className={css.join(' ')}
            //             key={i + 1}>
            //             <div>
            //                 <p>{name}</p>
            //             </div>
            //         </div>
            //     );
            // }
            return (
                <div
                    className={css.join(' ')}
                    key={i + 1}
                    onClick={() => this.handle_onSelect(collection)}>
                    <div>
                        <p>{name}</p>
                    </div>
                </div>
            );
        });
        
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <h3>Filter</h3>
                    <p>Instructions on how to assign here.</p>
                    <div className={styles.AssignAside}>
                        <div>
                            {collectionButtons}
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}



export default AssignAside;