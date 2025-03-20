// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

interface IAggregationExecutor {
    event Exchange(address pair, uint256 amountOut, address output);

    struct Swap {
        bytes data;
        bytes32 selectorAndFlags; // [selector (32 bits) + flags (224 bits)]; selector is 4 most significant bytes; flags are stored in 4 least significant bytes.
    }

    struct SwapCallbackData {
        bytes path;
        address payer;
    }

    struct SwapCallbackDataPath {
        address pool;
        address tokenIn;
        address tokenOut;
    }

    struct PositiveSlippageFeeData {
        uint256 partnerPSInfor; // [partnerReceiver (160 bit) + partnerPercent(96bits)]
        uint256 expectedReturnAmount; // [minimumPSAmount (128 bits) + expectedReturnAmount (128 bits)]
    }

    struct SwapExecutorDescription {
        IAggregationExecutor.Swap[][] swapSequences;
        address tokenIn;
        address tokenOut;
        address to;
        uint256 deadline;
        bytes positiveSlippageData;
    }

    function rescueFunds(address token, uint256 amount) external;

    function callBytes(bytes calldata data) external payable;

    function swapSingleSequence(bytes calldata data) external;

    function multihopBatchSwapExactIn(
        IAggregationExecutor.Swap[][] memory swapSequences,
        address tokenIn,
        address tokenOut,
        address to,
        uint256 deadline,
        bytes memory destTokenFeeData
    ) external payable;

    function finalTransactionProcessing(address tokenIn, address tokenOut, address to, bytes calldata destTokenFeeData)
        external;

    function updateExecutor(bytes4 funcSelector, address executor) external;

    function updateBatchExecutors(bytes4[] memory funcSelectors, address[] memory executors) external;
}
