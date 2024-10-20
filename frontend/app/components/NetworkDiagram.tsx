"use client";
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type NetworkDiagramProps = {
  width: number;
  height: number;
  data: { nodes: any[]; links: any[] };
};

export const RADIUS = 10;

// Draw network graph using canvas, without connection labels
export const drawNetwork = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  nodes: any[] = [],  // Default to empty array if nodes are undefined
  links: any[] = []   // Default to empty array if links are undefined
) => {
  // Clear the canvas before each frame
  context.clearRect(0, 0, width, height);

  // Draw the links first (lines)
  if (links && links.length > 0) {
    links.forEach((link) => {
      context.beginPath();
      context.moveTo(link.source.x, link.source.y);
      context.lineTo(link.target.x, link.target.y);
      context.strokeStyle = '#aaa';
      context.stroke();
    });
  }

  // Draw the nodes (circles)
  if (nodes && nodes.length > 0) {
    nodes.forEach((node) => {
      context.beginPath();
      context.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI);
      context.fillStyle = '#cb1dd1'; // Color for nodes
      context.fill();

      // **Draw node labels (text)**
      context.font = '12px Arial';
      context.fillStyle = 'black';

      // Center the node label below the node
      const textWidth = context.measureText(node.id).width;
      context.fillText(node.id, node.x - textWidth / 2, node.y + RADIUS + 12); // Centered label
    });
  }
};

export const NetworkDiagram = ({ width, height, data }: NetworkDiagramProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    // Initialize simulation
    const simulation = d3
      .forceSimulation(data.nodes || []) // Default to empty array
      .force(
        'link',
        d3.forceLink(data.links || []).id((d: any) => d.id).distance(100) // Default to empty array
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(RADIUS + 5));

    // On each tick, update the graph
    simulation.on('tick', () => {
      drawNetwork(context, width, height, data.nodes, data.links);
    });

    // Cleanup simulation on unmount
    return () => {
      simulation.stop();
    };
  }, [data, width, height]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
