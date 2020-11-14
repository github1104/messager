import { userConstants } from "../actions/constants"

const initState = {
    conversations: [],
}

export default (state = initState, action) => {

    switch (action.type) {
        case userConstants.GET_REALTIME_MESSAGES:
            state = {
                ...state,
                conversations: action.payload.conversations
            }
            break;
        case `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`:
            state = {
                ...state,
                conversations: action.payload.conversations
            }
            break;
      
    }

    return state;
}