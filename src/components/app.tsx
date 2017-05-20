import * as React from 'react';
import {connect} from 'react-redux';

import SourceCodeInput from '../containers/source-code-input';

export class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <SourceCodeInput />
        )
    }
}
