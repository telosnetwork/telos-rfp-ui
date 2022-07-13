module.exports = {
  chainId: process.env.NEXT_PUBLIC_TELOS_CHAIN_ID,
  nodeUrl: process.env.NEXT_PUBLIC_TELOS_NODE_URL,
  identifier: process.env.NEXT_PUBLIC_TELOS_IDENTIFIER,

  telosWorks: {
    contractName: process.env.NEXT_PUBLIC_TELOS_WORKS_CONTRACT_NAME,
    scope: process.env.NEXT_PUBLIC_TELOS_WORKS_SCOPE,
  },

  telosDecide: {
    contractName: process.env.NEXT_PUBLIC_TELOS_DECIDE_CONTRACT_NAME,
    treasurySymbol: process.env.NEXT_PUBLIC_TELOS_DECIDE_TREASURY_SYMBOL,
  },

  maxLimit: 9999999,
};
