const { use } = require("chai");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const WETH = "0x1514000000000000000000000000000000000000";

  let metaAggregationRouter = await deploy("MetaAggregationRouterV2", {
    admin: deployer,
    from: deployer,
    gasLimit: 10000000,
    args: [WETH],
    log: true,
  });
};

module.exports.tags = ["metaAggregationRouter"];
