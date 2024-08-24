import { getFullnodeUrl } from "@mysten/sui/client";
import {
  DEVNET_COUNTER_PACKAGE_ID,
  TESTNET_COUNTER_PACKAGE_ID,
  MAINNET_COUNTER_PACKAGE_ID,
  DEVNET_MINTNFT_PACKAGE_ID,
  TESTNET_MINTNFT_PACKAGE_ID,
  MAINNET_MINTNFT_PACKAGE_ID,
  DEVNET_COIN_A_TREASURYCAP_ID,
  TESTNET_COIN_A_TREASURYCAP_ID,
  MAINNET_COIN_A_TREASURYCAP_ID,
  DEVNET_COIN_B_TREASURYCAP_ID,
  TESTNET_COIN_B_TREASURYCAP_ID,
  MAINNET_COIN_B_TREASURYCAP_ID,
  DEVNET_UNISWAP_PACKAGE_ID,
  TESTNET_UNISWAP_PACKAGE_ID,
  MAINNET_UNISWAP_PACKAGE_ID,
  DEVNET_LIQUID_PACKAGE_ID,
  TESTNET_LIQUID_PACKAGE_ID,
  MAINNET_LIQUID_PACKAGE_ID
} from "./constants.ts";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        counterPackageId: DEVNET_COUNTER_PACKAGE_ID,
        mintnftPackageId: DEVNET_MINTNFT_PACKAGE_ID,
        coinAPackageId: DEVNET_COIN_A_TREASURYCAP_ID,
        coinBPackageId: DEVNET_COIN_B_TREASURYCAP_ID,
        uniswapPackageId: DEVNET_UNISWAP_PACKAGE_ID,
        liquidPackageId: DEVNET_LIQUID_PACKAGE_ID,
      },
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        counterPackageId: TESTNET_COUNTER_PACKAGE_ID,
        mintnftPackageId: TESTNET_MINTNFT_PACKAGE_ID,
        coinAPackageId: TESTNET_COIN_A_TREASURYCAP_ID,
        coinBPackageId: TESTNET_COIN_B_TREASURYCAP_ID,
        uniswapPackageId: TESTNET_UNISWAP_PACKAGE_ID,
        liquidPackageId: TESTNET_LIQUID_PACKAGE_ID,
      },
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        counterPackageId: MAINNET_COUNTER_PACKAGE_ID,
        mintnftPackageId: MAINNET_MINTNFT_PACKAGE_ID,
        coinAPackageId: MAINNET_COIN_A_TREASURYCAP_ID,
        coinBPackageId: MAINNET_COIN_B_TREASURYCAP_ID,
        uniswapPackageId: MAINNET_UNISWAP_PACKAGE_ID,
        liquidPackageId: MAINNET_LIQUID_PACKAGE_ID,
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
