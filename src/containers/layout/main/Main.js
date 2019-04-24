// import React, {Component} from "react";
// import {connect} from "react-redux";
// import _deckConnection from "../../../database/deck";
// import withDatabaseLayer from "../../../hoc/database/withDatabaseLayer";
// import withErrorModal from "../../../hoc/withErrorModal/withErrorModal";

// import * as actions from "../../../store/actions/index";
// import _hashIdCreate from "../../../helper/id";

// import Aux from "../../../hoc/aux/Aux";
// import Header from "../../../components/ui/Header/Header";
// import Throbber from '../../../components/ui/throbber/Throbber';
// import List from "../../../components/ui/list/List";
// import ActionButton from "../../../components/ui/button/action/ActionButton";
// import Aside from "../../../components/ui/asides/Aside";
// import Modal from "../../../components/ui/modal/Modal";

// import "../../../style.css";
// import globalCSS from "../../../Global.module.css";
// import mainCSS from "./Main.module.css";

// class Main extends Component {
//     state = {
//         aside: {
//             data: {},
//             isActive: false,
//             state: 0
//         },
//         action: {
//             isActive: true,
//             state: false
//         },
//         quick: {
//             original: {}
//         },
//         decks: this.props.data,
//         selectedIDs: [],
//         isLoading: true,
//         modal: {
//             data: {
//                 cancel: '',
//                 confirm: '',
//                 details: [],
//                 message: '',
//                 title: '',
//                 type: 0
//             },
//             isActive: false,
//             onConfirm: null,
//             onCancel: null,
//             state: 0
//         }
//     }

//     componentDidMount () {
//         this.setState(previousState => ({
//             ...previousState,
//             decks: {...this.props.data},
//             isLoading: false,
//         }));
//     }

//     //  Aside  //
//     toggleAside = () => {
//         this.setState(previousState => ({
//             ...previousState,
//             aside: {
//                 ...previousState.aside,
//                 isActive: !previousState.aside.isActive
//             }
//         }));
//     }
//     closeAside = () => {
//         this.setState(previousState => ({
//             ...previousState,
//             aside: {
//                 ...previousState.aside,
//                 isActive: false
//             }
//         }));
//     }
//     updateAside = (payload) => {
//         this.setState(previousState => ({
//             ...previousState,
//             aside: {
//                 ...previousState.aside,
//                 data: {
//                     id: payload.id,
//                     title: payload.data.title,
//                     details: payload.data.details,
//                     onChange: payload.action,
//                     onSubmit: this.handle_onDeckUpdate
//                 },
//                 state: payload.state
//             }
//         }));
//     }

//     //  Quick Edit  //
//     updateQuick = (payload) => {
//         this.setState(previousState => ({
//             ...previousState,
//             quick: {
//                 ...previousState.quick,
//                 original: {
//                     title: payload.data.title,
//                     details: payload.data.details
//                 }
//             }
//         }));
//     }

//     //  Decks  //
//     resetDeck = (payload) => {
//         let deck = this.state.decks[payload.id];
//         Object.keys(this.state.quick.original).map(key => {
//             deck[key] = this.state.quick.original[key];
//         });

//         this.setState(previousState => ({
//             ...previousState,
//             decks: {
//                 ...previousState.decks,
//                 [payload.id]: deck
//             }
//         }));
//     }
//     updateDeck_async = (payload) => {
//         this.props.deckUpdate_async(this.props.token, this.props.userId, payload);
//     }

//     //  Action  //
//     toggleAction = () => {
//         this.setState(previousState => ({
//             ...previousState,
//             action: {
//                 ...previousState.action,
//                 state: Object.keys(this.state.selectedIDs).length >= 1
//             }
//         }));
//     }
//     createDeck = () => {
//         const deck = {
//             details: "Sed ut perspiciatis unde omnis iste natus error sit",
//             userId: this.props.userId,
//             title: "New Flashcard Deck"
//         }
//         this.props.deckPost_async(this.props.token, deck);
//     }
//     startSession = () => {
//         console.log("Starting Session...");
//     }

//     //  EVENT HANDLERS --------------------------------------------- EVENT HANDLERS  //
//     //  Aside //
//     handle_onAsideToggle = (data) => {
//         if (this.state.aside.isActive) {
//             if (this.state.aside.state === data.state) {
//                 this.toggleAside();
//             } else {
//                 this.updateAside(data);
//             }
//         } else {
//             this.updateAside(data);
//             this.toggleAside();
//         }
//     }
//     handle_onAsideClose = () => {
//         if (this.state.aside.isActive) {
//             this.closeAside();
//             switch (this.state.aside.state) {
//                 case 99:
//                     this.resetDeck({id: this.state.aside.data.id});
//                     break;
//                 default:
//                     break;
//             }
//         }
//     }

//     //  Decks  //
//     handle_onDeckSelect = (passedData) => {
//         if (this.state.aside.state === 99 && this.state.aside.isActive) {
//             this.toggleAside();
//             this.resetDeck({id: this.state.aside.data.id});
//         }
//         if (this.state.selectedIDs.indexOf(passedData.data.id) > -1) {
//             let selected = this.state.selectedIDs.filter(id => id !== passedData.data.id);
//             this.setState(previousState => ({
//                 ...previousState,
//                 selectedIDs: selected
//             }), () => {
//                 this.toggleAction();
//             });
//         } else {
//             this.setState(previousState => ({
//                 ...previousState,
//                 selectedIDs: [
//                     ...previousState.selectedIDs,
//                     passedData.data.id
//                 ]
//             }), () => {
//                 this.toggleAction();
//             });
//         }
//     }
//     handle_onEditClick = (payload) => {
//         const data = {
//             id: payload.id,
//             data: {
//                 title: this.state.decks[payload.id].title,
//                 details: this.state.decks[payload.id].details
//             },
//             state: payload.state,
//             action: this.handle_onDeckChange
//         }
//         this.updateAside(data);
//         this.updateQuick(data);
//         this.toggleAside();
//     }
//     handle_onDeckChange = (payload) => {
//         let decks = this.state.decks;
//         decks[payload.id][payload.updated.property] = payload.updated.value;
//         this.setState(previousState => ({
//             ...previousState,
//             decks: {
//                 ...decks
//             }
//         }), () => {
//             this.setState(previousState => ({
//                 ...previousState,
//                 aside: {
//                     ...previousState.aside,
//                     data: {
//                         ...previousState.aside.data,
//                         [payload.updated.property]: this.state.decks[payload.id][payload.updated.property]
//                     }
//                 }
//             }))
//         });
//     }
//     handle_onDeckUpdate = (payload) => {
//         this.updateDeck_async(payload);
//     }

//     //  Action Button  //
//     handle_onActionClicked = (data) => {
//         if (this.state.action.state) {
//             this.startSession();
//         } else {
//             this.createDeck();
//         }
//     }


//     //  Render Method
//     render() {
//         let list = (<Throbber/>);
//         if (!this.state.isLoading) {
//             list = (
//                 <List
//                     header='Collections'
//                     listItems={this.state.decks}
//                     onDelete={this.handle_onDeckDelete}
//                     onEdit={this.handle_onEditClick}
//                     onSelect={this.handle_onDeckSelect}>
//                     <ActionButton
//                         active={this.state.action.isActive}
//                         onClick={this.handle_onActionClicked}
//                         state={this.state.action.state}
//                         values={['Create', 'Study']}/>
//                 </List>
//             )
//         }
//         return (
//             <Aux>
//                 <Header
//                     onA={this.handle_onAsideToggle}
//                     onB={this.handle_onAsideToggle}
//                     onClick={this.handle_onAsideClose}
//                     onNavigation={this.handle_onAsideToggle}/>
//                 <main
//                     className={mainCSS.Main}
//                     onClick={this.handle_onAsideClose}>
//                     <div className={[globalCSS.Inner, globalCSS.With_Padding].join(' ')}>
//                         {list}
//                     </div>
//                 </main>
//                 <Aside
//                     active={this.state.aside.isActive}
//                     data={this.state.aside.data}
//                     onClose={this.handle_onAsideClose}
//                     state={this.state.aside.state}/>
//                 <Modal
//                     active={this.state.modal.isActive}
//                     data={this.state.modal.data}
//                     onConfirm={this.state.modal.onConfirm}
//                     onCancel={this.state.modal.onCancel}
//                     state={this.state.modal.state}/>
//             </Aux>
//         )
//     }
// }
// const mapStateToProps = state => {
//     return {
//         decks: state.deck.decks,
//         loading: state.deck.isLoading,
//         token: state.auth.token,
//         userId: state.auth.userId
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         handle_onDeckLoaded: (token, userId) => dispatch(actions.deckGet_async(token, userId)),
//         deckPost_async: (token, data) => dispatch(actions.deckPost_async(token, data)),
//         deckUpdate_async: (token, user, payload) => dispatch(actions.deckUpdate_async(token, user, payload))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorModal(withDatabaseLayer(Main), _deckConnection));