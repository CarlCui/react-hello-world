import {Reducer, Action} from 'redux';

import {MODIFY_SOURCE_CODE} from '../constants';
import {ModifySourceCodeAction} from '../actions';

const INITIAL_STATE = 'var a = 123;';

export const sourceCodeReducer: Reducer<string> = (state = INITIAL_STATE, action: Action) => {
    switch(action.type) {
        case MODIFY_SOURCE_CODE:
            return (<ModifySourceCodeAction>action).newValue;
        default:
            return state;
    }
};
