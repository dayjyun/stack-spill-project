const SEARCH_GET_ALL_USERS = "search/searchGetAllUsers";

// get all users
const searchGetAll = (list) => {
  return {
    type: SEARCH_GET_ALL_USERS,
    list,
  };
};

export const searchGetAllUsers = () => async (dispatch) => {
    const searchAllUsers = await fetch('/api/users')

    if (searchAllUsers.ok) {
        const resSearchAllUsers = searchAllUsers.json()
        dispatch(searchGetAll(resSearchAllUsers));
    }
}

let initialState = {}

const searchBarReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_GET_ALL_USERS:
            initialState = { ...state };
            action.list.forEach(user => {
                initialState[user.id] = user;
            })
            return initialState

        default:
            return state;
    }
}

export default searchBarReducer
