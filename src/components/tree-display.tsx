import * as React from 'react';
import * as d3 from 'd3';

export interface Node {
    name: string;
    children: Node[];
}

export interface Tree {
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
    private root: d3.HierarchyNode<Node>;
    private svg: d3.Selection<any, {}, HTMLElement, any>;

    private duration = 750;
    private availableNodeId = 0;

    constructor(props: TreeDisplayProps) {
        super(props);

        this.margin = {top: 20, right: 90, bottom: 30, left: 90};
        this.width = 3000 - this.margin.left - this.margin.right;
        this.height = 3000 - this.margin.top - this.margin.bottom;
        this.treemap = d3.tree().size([this.height, this.width]);
    }

    public render() {
        return (
            <div id="tree_svg"></div>
        )
    }

    public componentDidUpdate(prevProps: TreeDisplayProps, prevState: void) {
        d3.select('#tree_svg').select('svg').remove();

        this.initializeTree();
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

        this.svg = d3.select("#tree_svg").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("
                + margin.left + "," + margin.top + ")");

        // Assigns parent, children, height, depth
        let root: any = d3.hierarchy<Node>(treeData, (d) => { return d.children; });
        root.x0 = height / 2;
        root.y0 = 0;
        this.root = root;

        this.update(root);
    }

    private update(source: d3.HierarchyNode<Node>): void {
         // Assigns the x and y position for the nodes
        let treeData = this.treemap(this.root);

        // Compute the new tree layout.
        let nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach((d) => { d.y = d.depth * 180});

        let svg = this.svg;

        // ****************** Nodes section ***************************
        let duration = this.duration;

        // Update the nodes...
        var node = svg.selectAll('g.node')
            .data(nodes, (d: any) => {return d.id || (d.id = ++this.availableNodeId); });

        // Enter any new modes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", (d) => {
                return "translate(" + (source as any).y0 + "," + (source as any).x0 + ")";
            })
            .on('click', this.click());

        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", (d: any) => {
                return d._children ? "lightsteelblue" : "#fff";
            });

        // Add labels for the nodes
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", (d: any) => {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", (d: any) => {
                return d.children || d._children ? "end" : "start";
            })
            .text((d: any) => { return d.data.name; });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", (d: any) => {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", (d: any) => {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr("transform", (d: any) => {
                return "translate(" + (source as any).y + "," + (source as any).x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = svg.selectAll('path.link')
            .data(links, (d: any) => { return d.id; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', (d: any) => {
                var o = {x: (source as any).x0, y: (source as any).y0}
                return this.diagonal(o, o)
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', (d: any) => { return this.diagonal(d, d.parent); });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', (d: any) => {
                var o = {x: (source as any).x, y: (source as any).y}
                return this.diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach((d: any) => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Creates a curved (diagonal) path from parent to the child nodes
    private diagonal(s: any, d: any) {
        let path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

        return path
    }

    // Toggle children on click.
    private click() {
        return (d: any) => {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            this.update(d);
        }
    }
}
