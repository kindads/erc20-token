module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545, // Ganache Local
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 9545, // Internal Tunnel
      from: "0x831bc00330657E2CeC1e4Eb8Af452877Dfb40a6c",
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  }
};
