// import * as actionTypes from '../actions/actionTypes';
// import * as create from '../models/models';

// //  ABOUT  ----------------------------------------------------------------  ABOUT  //
// //  This is the student reducer, it listens for action calls to the redux store


// //  Initial State  ------------------------------------------------  Initial State  //
// const initialState = {
//     student: {},
//     error: null,
//     isLoading: false
// };


// const studentFailure = (state, action) => {
//     return {
//         ...state,
//         error: action.payload,
//         isLoading: false
//     };
// }
// const addStudent = (state, action) => {
//     return {
//         ...state,
//         student: {
//             ...state.student,
//             [action.payload.id]: action.payload
//         },
//         error: null
//     }
// }
// const deleteStudent = (state, action) => {
//     const student = {...state.student};
//     delete student[action.payload.id];
//     return {
//         ...state,
//         student: student,
//         error: null
//     }
// }
// const getAllStudentsInit = (state, action) => {
//     return {
//         ...state,
//         isLoading: true
//     };
// }
// const getAllStudentsSuccess = (state, action) => {
//     return {
//         ...state,
//         isLoading: false,
//         student: action.payload
//     };
// }
// const updateStudent = (state, action) => {
//     return {
//         ...state,
//         students: {
//             ...state.students,
//             [action.payload.id]: action.payload
//         },
//         error: null
//     }
// }


// //  REDUCER  -------------------------------------------------------------  REDUCER  //
// const reducer = (state=initialState, action) => {
//     switch (action.type) {
//         case actionTypes.STUDENT_FAILURE:
//             return studentFailure(state, action);
//         case actionTypes.ADD_STUDENT:
//             return addStudent(state, action);
//         case actionTypes.DELETE_STUDENT:
//             return deleteStudent(state, action);
//         case actionTypes.GET_ALL_STUDENTS_INIT:
//             return getAllStudentsInit(state, action);
//         case actionTypes.GET_ALL_STUDENTS_SUCCESS:
//             return getAllStudentsSuccess(state, action);
//         case actionTypes.UPDATE_STUDENT:
//             return updateStudent(state, action);
//         default:
//             return state;
//     }
// }


// //  SELECTORS  ---------------------------------------------------------  SELECTORS  //
// export function selectStudents (state) {
//     return state.student
// }
// export function selectStudentsIsLoading (state) {
//     return state.isLoading;
// }
// export function selectStudentsError (state) {
//     return state.error;
// }


// export default reducer;