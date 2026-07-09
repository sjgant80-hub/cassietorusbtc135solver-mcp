#!/usr/bin/env node
// cassietorusbtc135solver-mcp · MCP stdio server wrapping cassietorusbtc135solver-sdk · MIT · AI-Native Solutions
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const server = new Server({ name: 'cassietorusbtc135solver-mcp', version: '1.0.0' }, { capabilities: { tools: {} } });

const TOOLS = [
  {
    name: 'cassietorusbtc135solver_mesh_post',
    description: 'meshPost · from cassietorusbtc135solver-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { meshPost } = await import('@ai-native-solutions/cassietorusbtc135solver-sdk');
      return typeof meshPost === 'function' ? await meshPost(args) : { error: 'meshPost not callable' };
    }
  },
  {
    name: 'cassietorusbtc135solver_decompose',
    description: 'decompose · from cassietorusbtc135solver-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { decompose } = await import('@ai-native-solutions/cassietorusbtc135solver-sdk');
      return typeof decompose === 'function' ? await decompose(args) : { error: 'decompose not callable' };
    }
  },
  {
    name: 'cassietorusbtc135solver_is_balanced',
    description: 'isBalanced · from cassietorusbtc135solver-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { isBalanced } = await import('@ai-native-solutions/cassietorusbtc135solver-sdk');
      return typeof isBalanced === 'function' ? await isBalanced(args) : { error: 'isBalanced not callable' };
    }
  },
  {
    name: 'cassietorusbtc135solver_is_spiked',
    description: 'isSpiked · from cassietorusbtc135solver-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { isSpiked } = await import('@ai-native-solutions/cassietorusbtc135solver-sdk');
      return typeof isSpiked === 'function' ? await isSpiked(args) : { error: 'isSpiked not callable' };
    }
  },
  {
    name: 'cassietorusbtc135solver_dominant_ring',
    description: 'dominantRing · from cassietorusbtc135solver-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { dominantRing } = await import('@ai-native-solutions/cassietorusbtc135solver-sdk');
      return typeof dominantRing === 'function' ? await dominantRing(args) : { error: 'dominantRing not callable' };
    }
  },
  {
    name: 'cassietorusbtc135solver_needs_search',
    description: 'needsSearch · from cassietorusbtc135solver-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { needsSearch } = await import('@ai-native-solutions/cassietorusbtc135solver-sdk');
      return typeof needsSearch === 'function' ? await needsSearch(args) : { error: 'needsSearch not callable' };
    }
  }
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map(({ handler, ...rest }) => rest)
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const t = TOOLS.find(x => x.name === req.params.name);
  if (!t) throw new Error('unknown tool: ' + req.params.name);
  const result = await t.handler(req.params.arguments || {});
  return { content: [{ type: 'text', text: JSON.stringify(result) }] };
});

await server.connect(new StdioServerTransport());
console.error('cassietorusbtc135solver-mcp v1.0.0 · stdio ready');
