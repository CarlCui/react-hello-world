import * as React from 'react';

interface RawInputProps {
    onModify: (newValue: string) => void
}

export class RawInput extends React.Component<RawInputProps, undefined> {
    public render() {
        return (
            <textarea onKeyUp={this.onInputChange}></textarea>
        )
    }

    private onInputChange = () => {
        const {onModify} = this.props;

        return (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
            const newValue = e.currentTarget.value;

            return onModify(newValue);
        }
    }
}
