import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { Text,Strong,Button,Box,Tabs,Heading,Grid,Inset,Flex,AlertDialog,Table,Card } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
import { QueryObject } from "./QueryObject";
import {LiquidityObject} from "./LiquidityObject"

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
    <Box className={"left_content"} height="400px">

      <Grid columns="3" gap="3" width="auto" rows="repeat(2, 64px)">
        
            <Box width="30%" >
                <Heading size="6" align="center">Contract interaction</Heading>

        </Box>
        
            <Box width="30%">
                <Heading align="center">New Message</Heading>

        </Box>
        <Box width="40%">
                <Heading align="center">Liquidity information</Heading>

        </Box>
        
        { /**left part */}
        <Box width="50%" className="hhh">
           <Tabs.Root defaultValue="account">
  <Tabs.List size="2" highContrast>
    <Tabs.Trigger value="account">Faucet</Tabs.Trigger>
    <Tabs.Trigger value="documents">Operate</Tabs.Trigger>
    <Tabs.Trigger value="settings">Swap</Tabs.Trigger>
  </Tabs.List>

            <Box pt="3">
               <Card size='2' ></Card>
              <Tabs.Content value="account">
                <Box height="30px"></Box>
               
                <Flex gap="4" align="center" justify="center" direction="column">
                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Button color="grass" size="4" variant="classic" radius="large">Coin_A_Faucet</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="500px">
                      <AlertDialog.Title>GET COIN_A</AlertDialog.Title>
                      <AlertDialog.Description size="2">
      Click the button to get coins
                      </AlertDialog.Description>
                      <Inset side="x" my="5">
                        <Table.Root>
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>Number</Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.RowHeaderCell>COIN_A</Table.RowHeaderCell>
                            <Table.Cell><input type="text" value={counter} onChange={(e) => setCounter(e.target.value)} className="PopoverInput"  placeholder="Enter the number"/>
                            </Table.Cell>
                          </Table.Body>

                        </Table.Root>
                      </Inset>
                      <Flex gap="3" justify="end">
                        <AlertDialog.Action>
                          <Button variant="soft"  color="gray" radius="large">
                             Cancel
                          </Button>
                        </AlertDialog.Action>
                         <AlertDialog.Action>
                          <Button color="red" onClick={mintCoinA} variant="classic" radius="large">
                             GET!!!
                          </Button>
                        </AlertDialog.Action>
                        
                       </Flex>
                    </AlertDialog.Content>
                  </AlertDialog.Root>

                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Button color="blue" size="4" variant="classic" radius="large">Coin_B_Faucet</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="500px">
                      <AlertDialog.Title>GET COIN_B</AlertDialog.Title>
                      <AlertDialog.Description size="2">
      Click the button to get coins
                      </AlertDialog.Description>
                      <Inset side="x" my="5">
                        <Table.Root>
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>Number</Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.RowHeaderCell>COIN_B</Table.RowHeaderCell>
                            <Table.Cell><input type="text" value={counter} onChange={(e) => setCounter(e.target.value)} className="PopoverInput"  placeholder="Enter the number"/>
                            </Table.Cell>
                          </Table.Body>

                        </Table.Root>
                      </Inset>
                      <Flex gap="3" justify="end">
                        <AlertDialog.Action>
                          <Button variant="soft"  color="gray" radius="large">
                             Cancel
                          </Button>
                        </AlertDialog.Action>
                         <AlertDialog.Action>
                          <Button color="red" onClick={mintCoinB} variant="classic" radius="large">
                             GET!!!
                          </Button>
                        </AlertDialog.Action>
                        
                        </Flex>
                        
                    </AlertDialog.Content>
                    </AlertDialog.Root>
                  </Flex>
    </Tabs.Content>
{/**中间部分 */}
              <Tabs.Content value="documents">
                 
                <Box height="30px"></Box>
                <Flex gap="4" align="center" justify="center" direction="column">
                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Button color="red" size="4" variant="classic" radius="large">Add_Liquidity</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="500px">
                      <AlertDialog.Title>ADD Liquidity</AlertDialog.Title>
                      <AlertDialog.Description size="2">
      Enter the id of Token A and Token B and add liquidity
                      </AlertDialog.Description>
                      <Inset side="x" my="5">
                        <Table.Root>
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>Number</Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.Row>
                            <Table.RowHeaderCell>COIN_A_PACKAGEID</Table.RowHeaderCell>
                            <Table.Cell><input type="text" value={coinAId} onChange={(e) => setCoinAId(e.target.value)} className="PopoverInput"  placeholder="Enter the coinA_Id"/>
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.RowHeaderCell>COIN_B_PACKAGEID</Table.RowHeaderCell>
                            <Table.Cell><input type="text" value={coinBId} onChange={(e) => setCoinBId(e.target.value)} className="PopoverInput"  placeholder="Enter the coinA_Id"/>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>

                        </Table.Root>
                      </Inset>
                      <Flex gap="3" justify="end">
                        <AlertDialog.Action>
                          <Button variant="soft"  color="gray" radius="large">
                             Cancel
                          </Button>
                        </AlertDialog.Action>
                         <AlertDialog.Action>
                          <Button color="red" onClick={addLiquidity} variant="classic" radius="large">
                             ADD!!!
                          </Button>
                        </AlertDialog.Action>
                        
                        </Flex>
                        
                    </AlertDialog.Content>
                  </AlertDialog.Root>
                  

                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Button color="blue" size="4" variant="classic" radius="large">Remove_Liquidity</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="500px">
                      <AlertDialog.Title>Remove Liquidity</AlertDialog.Title>
                      <AlertDialog.Description size="2">
      Enter the id of Token LSP and remove liquidity
                      </AlertDialog.Description>
                      <Inset side="x" my="5">
                        <Table.Root>
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>Number</Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.Row>
                            <Table.RowHeaderCell>COIN_LSP_PACKAGEID</Table.RowHeaderCell>
                            <Table.Cell><input type="text" value={lspId} onChange={(e) => setLspId(e.target.value)} className="PopoverInput"  placeholder="Enter the coinLSP_Id"/>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>

                        </Table.Root>
                      </Inset>
                      <Flex gap="3" justify="end">
                        <AlertDialog.Action>
                          <Button variant="soft"  color="gray" radius="large">
                             Cancel
                          </Button>
                        </AlertDialog.Action>
                         <AlertDialog.Action>
                          <Button color="red" onClick={removeLiquidity} variant="classic" radius="large">
                             REMOVE!!!
                          </Button>
                        </AlertDialog.Action>
                        
                        </Flex>
                        
                    </AlertDialog.Content>
                    </AlertDialog.Root>
                </Flex>
      
    </Tabs.Content>

              
              {/**右边部分 */}
    <Tabs.Content value="settings">
      <Box height="30px"></Box>
                <Flex gap="4" align="center" justify="center">
                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Button color="red" size="4" variant="classic" radius="large">Swap-A</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="500px">
                      <AlertDialog.Title>Swap_a</AlertDialog.Title>
                      <AlertDialog.Description size="2">
Enter the PackageId of token A and buy token B
                      </AlertDialog.Description>
                      <Inset side="x" my="5">
                        <Table.Root>
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>Number</Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.RowHeaderCell>COIN_A_PACKAGEID</Table.RowHeaderCell>
                            <Table.Cell><input type="text" value={coinAId} onChange={(e) => setCoinAId(e.target.value)} className="PopoverInput"  placeholder="Enter the package"/>
                            </Table.Cell>
                          </Table.Body>

                        </Table.Root>
                      </Inset>
                      <Flex gap="3" justify="end">
                        <AlertDialog.Action>
                          <Button variant="soft"  color="gray" radius="large">
                             Cancel
                          </Button>
                        </AlertDialog.Action>
                         <AlertDialog.Action>
                          <Button color="red" onClick={aSwap} variant="classic" radius="large">
                             SWAP!!!
                          </Button>
                        </AlertDialog.Action>
                        
                       </Flex>
                    </AlertDialog.Content>
                  </AlertDialog.Root>

                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Button color="red" size="4" variant="classic" radius="large">Swap-B</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="500px">
                      <AlertDialog.Title>Swap_b</AlertDialog.Title>
                      <AlertDialog.Description size="2">
Enter the PackageId of token B and buy token A
                      </AlertDialog.Description>
                      <Inset side="x" my="5">
                        <Table.Root>
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>Number</Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.RowHeaderCell>COIN_B_PACKAGEID</Table.RowHeaderCell>
                            <Table.Cell><input type="text" value={coinBId} onChange={(e) => setCoinBId(e.target.value)} className="PopoverInput"  placeholder="Enter the package"/>
                            </Table.Cell>
                          </Table.Body>

                        </Table.Root>
                      </Inset>
                      <Flex gap="3" justify="end">
                        <AlertDialog.Action>
                          <Button variant="soft"  color="gray" radius="large">
                             Cancel
                          </Button>
                        </AlertDialog.Action>
                         <AlertDialog.Action>
                          <Button color="red" onClick={bSwap} variant="classic" radius="large">
                             SWAP!!!
                          </Button>
                        </AlertDialog.Action>
                        
                       </Flex>
                    </AlertDialog.Content>
                  </AlertDialog.Root>

                </Flex>
    </Tabs.Content>
  </Box>
</Tabs.Root>
             

        </Box>

 { /**right part */}
        <Box width="100%">
          {createdObjectId ? (
    <div>
      <QueryObject id={createdObjectId} />
    </div>
  ) : (
    <Box maxWidth="240px">
  <Card size="2">
    <Inset clip="padding-box" side="top" pb="current">
      <img
        src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        alt="Bold typography"
        style={{
          display: 'block',
          objectFit: 'cover',
          width: '100%',
          height: 140,
          backgroundColor: 'var(--gray-5)',
        }}
      />
    </Inset>
    <Text as="p" size="3">
      <Strong>Instructions for use</Strong> <br/>
      This website is to help you better learn the principles of the flow pool. The left side is the operation of the flow pool, and the right side is the current status of the flow pool.
    </Text>
  </Card>
</Box>

  )}
</Box>
        <Box width="100%">
          <LiquidityObject  id={liquidPackageId}/>
        </Box>
      </Grid>
      </Box>
  );

  function mintCoinA() {
    if (!counter) {
      alert("请输入要铸造的数量")
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
