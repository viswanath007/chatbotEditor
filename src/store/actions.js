import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function handleConversation(conversation) {
    return {
        type: types.CONVERSATION,
        conversation
    };
}

export function toggleLoader() {
    return {
        type: types.TOGGGLE_LOADER
    };
}

export function evaluateCode(code) {
    return {
        type: types.CODE,
        code
    };
}
