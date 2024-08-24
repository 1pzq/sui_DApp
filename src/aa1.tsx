import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { Button, Container, Text } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
import * as Popover from "@radix-ui/react-popover";
import { QueryObject } from "./QueryObject";

export function Uniswap({ onCreated }: { onCreated: (id: string) => void }) {
  const liquidPackageId = useNetworkVariable("liquidPackageId");
  const coinAPackageId = useNetworkVariable("coinAPackageId");
  const coinBPackageId = useNetworkVariable("coinBPackageId");
  const uniswapPackageId = useNetworkVariable("uniswapPackageId");
  const suiClient = useSuiClient();

  const [counter, setCounter] = useState("");
  const [createdObjectId, setCreatedObjectId] = useState<string | null>(null);
  const [coinAId, setCoinAId] = useState("");
  const [coinBId, setCoinBId] = useState("");
  const [lspId, setLspId] = useState("")

  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });

  return (
    <Container>
      <text>hhhhh</text>


      <Popover.Root>
        <Popover.Trigger asChild>
          <Button size="3" radius="full" variant="soft">
            UNISWAP 合约交互部分
          </Button>
        </Popover.Trigger>
        <Popover.Content sideOffset={10} className="PopoverContent">
          <input
            type="text"
            placeholder="创建币的个数"
            value={counter}
            onChange={(e) => setCounter(e.target.value)}
            className="PopoverInput"
          />
          <input
            type="text"
            placeholder="输入 COIN_A ID"
            value={coinAId}
            onChange={(e) => setCoinAId(e.target.value)}
            className="PopoverInput"
          />
          <input
            type="text"
            placeholder="输入 COIN_B ID"
            value={coinBId}
            onChange={(e) => setCoinBId(e.target.value)}
            className="PopoverInput"
          />

          <input
            type="text"
            placeholder="输入 LSP ID"
            value={lspId}
            onChange={(e) => setLspId(e.target.value)}
            className="PopoverInput"
          />

          <Button
            size="2"
            radius="full"
            variant="soft"
            onClick={mintCoinA}
            className="PopoverButton"
          >
            COIN_A 的水龙头
          </Button>

          <Button
            size="2"
            radius="full"
            variant="soft"
            onClick={mintCoinB}
            className="PopoverButton"
          >
            COIN_B 的水龙头
          </Button>

          <Button
            size="2"
            radius="full"
            variant="soft"
            onClick={addLiquidity}
            className="PopoverButton"
            disabled={!coinAId || !coinBId}
          >
            添加流动性
          </Button>

          <Button
            size="2"
            radius="full"
            variant="soft"
            onClick={removeLiquidity}
            className="PopoverButton"
           
          >
            去除流动性
          </Button>

          <Button
            size="2"
            radius="full"
            variant="soft"
            onClick={aSwap}
            className="PopoverButton"
           
          >
            使用A买入B
          </Button>

          <Button
            size="2"
            radius="full"
            variant="soft"
            onClick={bSwap}
            className="PopoverButton"
           
          >
            使用B买入A
          </Button>
        </Popover.Content>
      </Popover.Root>

      {createdObjectId && (
        <div>
          <h3>创建成功! Object ID: {createdObjectId}</h3>
          <QueryObject id={createdObjectId} />
          <QueryObject id={'0x56ed0426db1fa5494149d71a2d12f1e463b2b4764580e4d6e061320652d3d25f'} />
        </div>
      )}
    </Container>
  );

  function mintCoinA() {
    if (!counter) {
      console.error("请输入要铸造的数量");
      return;
    }

    const tx = new Transaction();

    tx.moveCall({
      target: `${uniswapPackageId}::coin_a::mint`,
      arguments: [
        tx.object(coinAPackageId),
        tx.pure.u64(counter),
        tx.pure.address('0x69bb839c43b5062487b00b5efa10c6d4914e2036a8c71cea8ce92002e12a8508'),
      ],
    });

    executeTransaction(tx);
  }

  function mintCoinB() {
    if (!counter) {
      console.error("请输入要铸造的数量");
      return;
    }

    const tx = new Transaction();

    tx.moveCall({
      target: `${uniswapPackageId}::coin_b::mint`,
      arguments: [
        tx.object(coinBPackageId),
        tx.pure.u64(counter),
        tx.pure.address('0x69bb839c43b5062487b00b5efa10c6d4914e2036a8c71cea8ce92002e12a8508'),
      ],
    });

    executeTransaction(tx);
  }
  
  function addLiquidity() {
    if (!coinAId || !coinBId) {
        console.error("请确保已输入 COIN_A 和 COIN_B 的 ID");
        return;
    }

    const tx = new Transaction();
    const coinATarget = `${uniswapPackageId}::coin_a::COIN_A`;
    const coinBTarget = `${uniswapPackageId}::coin_b::COIN_B`;

    // 执行 moveCall，但不处理返回值
    tx.moveCall({
        target: `${uniswapPackageId}::simple_swap::add_liquidity`,
        typeArguments: [coinATarget, coinBTarget],
        arguments: [
            tx.object(liquidPackageId),
            tx.object(coinAId),
            tx.object(coinBId),
        ],
    });

    // 直接执行交易
    executeTransaction(tx);
  }
  
  function removeLiquidity() {
    const tx = new Transaction();
    const coinATarget = `${uniswapPackageId}::coin_a::COIN_A`;
    const coinBTarget = `${uniswapPackageId}::coin_b::COIN_B`;

    // 执行 moveCall，但不处理返回值
    tx.moveCall({
        target: `${uniswapPackageId}::simple_swap::remove_liquidity`,
        typeArguments: [coinATarget, coinBTarget],
        arguments: [
            tx.object(liquidPackageId),
            tx.object(lspId),
        ],
    });

    // 直接执行交易
    executeTransaction(tx);
  }
  function aSwap() {
    const tx = new Transaction();
    const coinATarget = `${uniswapPackageId}::coin_a::COIN_A`;
    const coinBTarget = `${uniswapPackageId}::coin_b::COIN_B`;

    // 执行 moveCall，但不处理返回值
    tx.moveCall({
        target: `${uniswapPackageId}::simple_swap::swap_a_to_b`,
        typeArguments: [coinATarget, coinBTarget],
        arguments: [
            tx.object(liquidPackageId),
            tx.object(coinAId),
        ],
    });

    // 直接执行交易
    executeTransaction(tx);
  }

  function bSwap() {
    const tx = new Transaction();
    const coinATarget = `${uniswapPackageId}::coin_a::COIN_A`;
    const coinBTarget = `${uniswapPackageId}::coin_b::COIN_B`;

    // 执行 moveCall，但不处理返回值
    tx.moveCall({
        target: `${uniswapPackageId}::simple_swap::swap_b_to_a`,
        typeArguments: [coinATarget, coinBTarget],
        arguments: [
            tx.object(liquidPackageId),
            tx.object(coinBId),
        ],
    });

    // 直接执行交易
    executeTransaction(tx);
  }




  function executeTransaction(tx: Transaction) {
    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          const objectId = result.effects?.created?.[0]?.reference?.objectId;
          if (objectId) {
            setCreatedObjectId(objectId);
            onCreated(objectId);
          }
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
        },
      }
    );
  }
}
