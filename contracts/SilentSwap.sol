// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@zama/fhevm/contracts/FHE.sol";

contract SilentSwap {
    using FHE for *;

    struct Order {
        address owner;
        bool isBuy;
        euint64 encryptedPrice;
        uint256 amount;
        bool isActive;
    }

    mapping(bytes32 => Order[]) public orders;

    event TradeExecuted(
        address indexed buyer,
        address indexed seller,
        bytes32 pairId,
        uint256 clearPrice,
        uint256 amount
    );

    function placeOrder(
        bytes32 pairId,
        bool isBuy,
        euint64 encryptedPrice,
        uint256 amount
    ) public {
        require(amount > 0, "Amount must be > 0");

        Order memory newOrder = Order({
            owner: msg.sender,
            isBuy: isBuy,
            encryptedPrice: encryptedPrice,
            amount: amount,
            isActive: true
        });

        orders[pairId].push(newOrder);
        matchOrders(pairId);
    }

    function matchOrders(bytes32 pairId) internal {
        Order[] storage orderList = orders[pairId];

        for (uint256 i = 0; i < orderList.length; i++) {
            if (!orderList[i].isActive) continue;

            for (uint256 j = i + 1; j < orderList.length; j++) {
                if (!orderList[j].isActive) continue;

                Order storage orderA = orderList[i];
                Order storage orderB = orderList[j];

                if (orderA.isBuy == orderB.isBuy) continue;

                Order storage buyOrder = orderA.isBuy ? orderA : orderB;
                Order storage sellOrder = orderA.isBuy ? orderB : orderA;

                if (buyOrder.encryptedPrice.gte(sellOrder.encryptedPrice).decrypt()) {
                    executeTrade(buyOrder, sellOrder, pairId);
                    buyOrder.isActive = false;
                    sellOrder.isActive = false;
                    return;
                }
            }
        }
    }

    function executeTrade(
        Order storage buyOrder,
        Order storage sellOrder,
        bytes32 pairId
    ) internal {
        // Basit demo için: sadece event at
        uint256 executedPrice = sellOrder.encryptedPrice.decrypt();
        emit TradeExecuted(
            buyOrder.owner,
            sellOrder.owner,
            pairId,
            executedPrice,
            sellOrder.amount
        );
    }
}
