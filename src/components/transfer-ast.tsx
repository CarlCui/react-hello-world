import * as React from 'react';

import * as Acorn from 'acorn';

import {Tree, Node, TreeDisplay} from './tree-display';

interface TransferAstProps {
    sourceCode: string;
}

interface TransferAstState {
    sourceCode: string;
}

export class TransferAst extends React.Component<TransferAstProps, TransferAstState> {
    constructor(props: TransferAstProps) {
        super(props);

        this.state = this.props;
    }

    public componentWillReceiveProps(nextProps: TransferAstProps) {
        const newSourceCode = nextProps.sourceCode;

        if (this.state.sourceCode !== newSourceCode) {
            this.setState({sourceCode:newSourceCode});
        }
    }

    public render() {
        const astTree = this.generateAstTree();

        return (
            <TreeDisplay astTree={astTree} />
        )
    }

    private generateAstTree(): Tree {
        const { sourceCode } = this.state;
        const ast = Acorn.parse(sourceCode);

        let astTree: Tree = {
            root: {
                name: ast.type,
                children: []
            }
        };

        let node = ast;

        this.generateNode(ast, astTree.root);

        return astTree;
    }

    private generateNode(astNode: any, parent: Node): void {
        for (let prop in astNode) {
            let value = astNode[prop];

            let child: Node = {
                name: `${prop}: ${this.displayValue(value)}`,
                children: []
            };

            parent.children.push(child);

            if (value instanceof Object) {
                this.generateNode(value, child);
            }
        }
    }

    private displayValue(value: any): string {
        if (Array.isArray(value)) {
            return value.length.toString();
        } else if (value instanceof Object && value.type) {
            return value.type;
        } else {
            return `${value}`;
        }
    }


}
