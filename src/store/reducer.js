// import { combineReducers } from 'redux';
import * as types from './types';

const userData = { className: "user", text: "user" };
const botData = { className: "bot", text: "bot" };

    const initialState = {
        conversation: [userData, botData],
        loading: false,
        code: `// type your code here...
            function (x) {
                return campK12.translate(x);
            }`,
        // userInput: [],
        // filter: ''
    };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CONVERSATION:
            return {
                ...state,
                conversation: action.conversation
            };
        case types.CODE:
            return {
                ...state,
                code: action.code
            };
        case types.TOGGGLE_LOADER:
            return {
                ...state,
                loading: !state.loading
            };
        // case types.FILTER:
        //     return {
        //         ...state,
        //         filter: action.filter
        //     };
        default:
            return state;
    }
};

// const filter = (state = '', action) => {
//     switch (action.type) {
//         case types.FILTER:
//             return action.filter;
//         default:
//             return state;
//     }
// };


// const rootReducer = combineReducers({
//     reducer,
//     filter
// });

export default reducer;
