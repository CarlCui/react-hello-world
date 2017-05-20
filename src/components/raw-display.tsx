import * as React from 'react';

interface RawDisplayProps {
    text: string;
}

export class RawDisplay extends React.Component<RawDisplayProps, void> {
    public render() {
        let { text } = this.props;

        return (
            <div>{text}</div>
        );
    }
}
