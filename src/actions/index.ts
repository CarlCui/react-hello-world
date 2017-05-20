import {Action} from 'redux';
import {MODIFY_SOURCE_CODE} from '../constants';

export interface ModifySourceCodeAction extends Action {
    type: MODIFY_SOURCE_CODE;
    newValue: string;
}

export function modifySourceCode(newValue: string): ModifySourceCodeAction {
    return {
        type: MODIFY_SOURCE_CODE,
        newValue: newValue
    };
}
