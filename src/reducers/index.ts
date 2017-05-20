import {combineReducers, ReducersMapObject} from 'redux';

import {sourceCodeReducer} from './sourceCode';

const reducersMappedObject: ReducersMapObject = {
    sourceCode: sourceCodeReducer
};

export const reducers = combineReducers(reducersMappedObject);

/*
    {
        sourceCode: string,
        canModifySource: boolean,
        canModifyAst: boolean
    }

*/
