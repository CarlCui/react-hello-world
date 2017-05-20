import * as React from 'react';
import {connect} from 'react-redux';

import {modifySourceCode} from '../actions';

import {RawInput} from '../components/raw-input';
import {RawDisplay} from '../components/raw-display';

interface StateProps {
    sourceCode: string;
}

interface DispatchProps {
    modify: (newValue: string) => void;
}

interface SourceCodeInputProps extends StateProps, DispatchProps {

}

function mapStateToProps(state: any) {
    return {
        sourceCode: state.sourceCode
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        modify: (newValue: string) => dispatch(modifySourceCode(newValue))
    };
}

//@connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)
export class SourceCodeInput extends React.Component<SourceCodeInputProps, any> {
    public render(): JSX.Element | null {
        const { sourceCode, modify } = this.props;
        return (
            <div>
                <RawInput onModify={modify} />
                <RawDisplay text={sourceCode} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceCodeInput);
