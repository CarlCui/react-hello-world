import * as React from 'react';
import * as d3 from 'd3';

interface Node {
    name: string;
    children: Node[];
    _children: Node[];
    x0?: number;
    y0?: number;
    x?: number;
    y?: number;
}

interface Tree {
    root: Node;
}

interface TreeDisplayProps {
    astTree: Tree;
}

export class TreeDisplay extends React.Component<TreeDisplayProps, void> {
    private margin: any;
    private width: number;
    private height: number;

    private treemap: d3.TreeLayout<{}>;

    private duration = 750;

    constructor(props: TreeDisplayProps) {
        super(props);

        this.margin = {top: 20, right: 90, bottom: 30, left: 90};
        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.treemap = d3.tree().size([this.height, this.width]);
    }

    public render() {
        return (
            <div id="tree_svg"></div>
        )
    }

    public componentDidMount(): void {
        this.initializeTree();
    }

    private initializeTree(): void {
        const { astTree } = this.props;
        const treeData = astTree.root;

        let margin = this.margin;
        let width = this.width;
        let height = this.height;

        let svg = d3.select("body").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("
                + margin.left + "," + margin.top + ")");

        // Assigns parent, children, height, depth
        let root = d3.hierarchy<Node>(treeData, (d) => { return d.children; });
        root.data.x0 = height / 2;
        root.data.y0 = 0;
    }

    private update(source: d3.HierarchyNode<Node>): void {

    }
}
