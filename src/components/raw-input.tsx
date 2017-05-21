import * as React from 'react';

interface RawInputProps {
    text: string;
    onModify: (newValue: string) => void;
}

export class RawInput extends React.Component<RawInputProps, undefined> {
    public render() {
        const { text } = this.props;

        return (
            <textarea onKeyUp={this.onInputChange()} defaultValue={text}></textarea>
        )
    }

    private onInputChange() {
        const { onModify } = this.props;

        return (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
            const newValue = e.currentTarget.value;

            return onModify(newValue);
        }
    }
}
