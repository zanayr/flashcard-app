// import * as actionTypes from './actionTypes';
// import * as create from '../models/models';
// import axios from '../database';

// //  This file holds the action creators for the card redux
// //  store and interface with the firebase database


// //  ACTION CREATORS  ---------------------------------------------  ACTION CREATORS  //
// //  Add  -----------------------------------------------------------------  Add A.C. //
// export const addStudent_success = (data) => {
//     return {
//         type: actionTypes.ADD_STUDENT_SUCC,
//         payload: data
//     }
// }
// export const addStudentTab_success = (data) => {
//     return {
//         type: actionTypes.PATCH_TAB_SUCC,
//         payload: data
//     }
// }

// //  Delete  -----------------------------------------------------------  Delete A.C. //
// export const deleteStudent_success = (data) => {
//     return {
//         type: actionTypes.DELETE_STUDENT_SUCC,
//         payload: data
//     }
// }
// export const deleteStudentTab_success = (data) => {
//     return {
//         type: actionTypes.DELETE_STUDENT_TAB_SUCC,
//         payload: data
//     }
// }

// //  Failure  --------------------------------------------------------  Failure A.C.  //
// export const student_fail = (error) => {
//     return {
//         type: actionTypes.STUDENT_FAIL,
//         payload: error
//     }
// }

// //  Get All  ----------------------------------------------------------  Get All A.C. //
// export const getAllStudents_init = () => {
//     return {
//         type: actionTypes.GET_ALL_STUDENTS_INIT,
//         payload: {}
//     }
// }
// export const getAllStudents_success = (data) => {
//     return {
//         type: actionTypes.GET_ALL_STUDENTS_SUCC,
//         payload: data
//     }
// }

// //  Update  -----------------------------------------------------------  Update A.C. //
// export const updateStudent_success = (data) => {
//     return {
//         type: actionTypes.PUT_USER_SUCC,
//         payload: data
//     };
// };
// export const updateStudentTag_success = (tags) => {
//     return {
//         type: actionTypes.PUT_TAG_SUCC,
//         payload: tags
//     }
// }


// //  ASYNC FUNCTIONS  ---------------------------------------------  ASYNC FUNCTIONS  //
// //  Add  ----------------------------------------------------------------  Add Async //
// export const addStudent_async = (token, data) => {
//     return dispatch => {
//         axios.patch('/student/' + data.id + '.json?auth=' + token, data)
//         .then(response => {
//             dispatch(addStudent_success(data));
//         })
//         .catch(error => {
//             dispatch(student_fail(error));
//         });
//     };
// };

// //  Delete Tab --------------------------------------------------  Delete Tab Async  //
// export const deleteStudentTab_async = (token, user, data) => {
//     return dispatch => {
//         axios.delete('/student/' + user + '/tab/' + data.id + '.json?auth=' + token)
//         .then(response => {
//             dispatch(deleteTab_success(data.id));
//         })
//         .catch(error => {
//             dispatch(deleteTab_fail(error));
//         });
//     };
// };

// //  Get  ----------------------------------------------------------------  Get Async //
// export const getAllStudents_async = (token, user) => {
//     return dispatch => {
//         dispatch(getAllStudents_init());
//         axios.get('/student/' + user + '.json?auth=' + token)
//         .then(response => {
//             dispatch(getAllStudents_success(response.data));
//         })
//         .catch(error => {
//             dispatch(student_fail(error));
//         });
//     };
// };

// //  Update  ----------------------------------------------------------  Update Async //
// export const updateStudent_async = (token, data) => {
//     return dispatch => {
//         axios.put('/student/' + data.id + '.json?auth=' + token, data)
//         .then(response => {
//             dispatch(updateStudent_success(data));
//         })
//         .catch(error => {
//             dispatch(student_fail(error));
//         });
//     };
// };

// //  Update Tag  -------------------------------------------------  Update Tag Async  //
// export const updateStudentTag_async = (category, token, user, tags) => {
//     return dispatch => {
//         axios.put('/student/' + user + '/' + category + '.json?auth=' + token, tags)
//         .then(response => {
//             dispatch(updateStudentTag_success(tags));
//         })
//         .catch(error => {
//             dispatch(student_fail(error));
//         });
//     };
// };


// //  ASYNC TAB FUNCTIONS  ---------------------------------  ASYNC TAB FUNCTIONS  //
// export const patchTab_async = (token, user, data) => {
//     return dispatch => {
//         axios.patch('/student/' + user + '/tabs/' + data.id + '/.json?auth=' + token, create.tabModel(data))
//         .then(response => {
//             dispatch(patchTab_success(data));
//         })
//         .catch(error => {
//             dispatch(patchTab_fail(error));
//         });
//     };
// };