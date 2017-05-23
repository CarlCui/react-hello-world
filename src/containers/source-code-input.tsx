import * as React from 'react';
import {connect} from 'react-redux';

import {modifySourceCode} from '../actions';

import {RawInput} from '../components/raw-input';
import {RawDisplay} from '../components/raw-display';
import {TreeDisplay, Tree, Node} from '../components/tree-display';

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
export class SourceCodeInput extends React.Component<SourceCodeInputProps, void> {
    public render(): JSX.Element | null {
        const { sourceCode, modify } = this.props;

        let mockTreeData: Tree = {
            root: {
                name: '1',
                children: [
                    {
                        name: '2',
                        children: [
                            {
                                name: '3',
                                children: []
                            },
                            {
                                name: '4',
                                children: []
                            }
                        ]
                    },
                    {
                        name: '5',
                        children: []
                    }
                ]
            }
        };

        return (
            <div>
                <RawInput onModify={modify} text={sourceCode}/>
                <RawDisplay text={sourceCode} />
                <TreeDisplay astTree={mockTreeData} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceCodeInput);
