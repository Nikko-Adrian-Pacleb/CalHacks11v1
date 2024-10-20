"use client";
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type NetworkDiagramProps = {
    width: number;
    height: number;
    data: { nodes: any[]; links: any[] };
    activeNote: string;
    onNodeClick: (noteId: string) => void; // Callback for when a node is clicked
  };
  

export const RADIUS = 10;

// Draw network graph using canvas, without connection labels
export const drawNetwork = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    nodes: any[] = [],
    links: any[] = [],
    activeNote: string // Add activeNote parameter
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
  
        // Change color based on whether this node is the active one
        context.fillStyle = activeNote === node.id ? '#ff0000' : '#cb1dd1'; // Red for active node, purple for others
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
  

  export const NetworkDiagram = ({ width, height, data, activeNote, onNodeClick }: NetworkDiagramProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!context || !canvas) return;
  
      // Initialize simulation
      const simulation = d3
        .forceSimulation(data.nodes || [])
        .force(
          'link',
          d3.forceLink(data.links || []).id((d: any) => d.id).distance(100)
        )
        .force('charge', d3.forceManyBody().strength(-100)) // Weaken repulsion between all nodes (less repulsion than before)
        .force('center', d3.forceCenter(width / 2, height / 2)) // Standard centering for the whole graph
        .force('collide', d3.forceCollide().radius(RADIUS + 1)) // Slight collision radius to allow nodes to be closer without overlapping
        .force('activeNoteToCenter', (alpha) => {
          // This custom force pulls the active note toward the center
          data.nodes.forEach((node) => {
            if (node.id === activeNote) {
              node.vx += (width / 2 - node.x) * 0.05 * alpha; // Pull towards center X (reduce the strength slightly to avoid abrupt movement)
              node.vy += (height / 2 - node.y) * 0.05 * alpha; // Pull towards center Y
            }
          });
        });
  
      // On each tick, update the graph and pass activeNote
      simulation.on('tick', () => {
        drawNetwork(context, width, height, data.nodes, data.links, activeNote);
      });
  
      // Handle clicks on canvas
      const handleCanvasClick = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
  
        // Find the clicked node
        const clickedNode = data.nodes.find((node) => {
          const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
          return distance <= RADIUS;
        });
  
        // If a node is clicked, call onNodeClick
        if (clickedNode) {
          onNodeClick(clickedNode.id);
        }
      };
  
      // Add event listener to canvas
      canvas.addEventListener('click', handleCanvasClick);
  
      // Cleanup event listener on unmount
      return () => {
        simulation.stop();
        canvas.removeEventListener('click', handleCanvasClick);
      };
    }, [data, width, height, activeNote, onNodeClick]); // Add onNodeClick as dependency
  
    return (
      <div>
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
    );
  };
  