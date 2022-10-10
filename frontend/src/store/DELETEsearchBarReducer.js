// const SEARCH_GET_ALL = "search/searchGetAllUsers";

// // get all users
// const searchAll = (list) => {
//   return {
//     type: SEARCH_GET_ALL,
//     list,
//   };
// };

// export const searchGetAll = () => async (dispatch) => {
//     const searchRes = await fetch('/api/users')

//     if (searchRes.ok) {
//       const resSearchAllUsers = searchRes.json();
//       dispatch(searchAll(resSearchAllUsers));
//     }
// }

// let initialState = {}

// const searchBarReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case SEARCH_GET_ALL:
//         initialState = { ...state };
//         action.list.forEach((user) => {
//           initialState[user.id] = user;
//         });
//         return initialState;

//       default:
//         return state;
//     }
// }

// export default searchBarReducer
