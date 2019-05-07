// import React, {Component} from 'react';
// import Aux from '../../hoc/Aux/Aux';

// class Create extends Component {
//     state = {
//         foo: 'bar'
//     }
//     render () {
//         console.log(this.props);
//         return (
//             <Aux>
//                 <main
//                     className={styles.Main}
//                     onClick={this.handle_onMainClick}>
//                     <div>
//                         <div>
//                         <p>Instructions about this process here.</p>
//                         <form
//                             className={styles.CreateForm}
//                             ref={this.form}>
//                             {form}
//                         </form>
//                         <h4>Tags</h4>
//                         <TagForm
//                             activeCollection={this.state.item.tags}
//                             backingCollection={this.state.tags}
//                             field={{
//                                 label: 'Additional Tag',
//                                 placeholder: 'Verb'
//                             }}
//                             onClick={(tag) => this.handle_onTagToggle('tags', tag)}
//                             onConfirm={(tag) => this.handle_onTagCreate('tags', tag)}/>
//                         <h4>Groups</h4>
//                         <TagForm
//                             activeCollection={this.state.item.groups}
//                             backingCollection={this.state.groups}
//                             field={{
//                                 label: 'Additional Group',
//                                 placeholder: 'Spanish'
//                             }}
//                             onClick={(tag) => this.handle_onTagToggle('groups', tag)}
//                             onConfirm={(tag) => this.handle_onTagCreate('groups', tag)}/>
//                         </div>
//                         <div>
//                             <BarLink path='u/inspect'>Edit</BarLink>
//                         </div>
//                     </div>
//                 </main>
//             </Aux>
//         )
//     }
// }

// export default Create;