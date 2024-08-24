import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { Text,Strong,Button,Box,Tabs,Heading,Grid,Inset,Flex,AlertDialog,Table,Card } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
import * as Popover from "@radix-ui/react-popover";
import { QueryObject } from "./QueryObject";

export function MintNFT({ onCreated }: { onCreated: (id: string) => void }) {
  const mintnftPackageId = useNetworkVariable("mintnftPackageId");
  const suiClient = useSuiClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [createdObjectId, setCreatedObjectId] = useState<string | null>(null);

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
    <div>
      <AlertDialog.Root >
        <AlertDialog.Trigger>
          <Button color="red">Mint_NFT</Button>
        </AlertDialog.Trigger>
       <AlertDialog.Content maxWidth="500px">
          <AlertDialog.Title>Mint NFT</AlertDialog.Title>
        <AlertDialog.Description size="2">
     Enter the corresponding attributes to create NFT
        </AlertDialog.Description>
        <Inset side="x" my="5">
          <Table.Root>
            <Table.Header>
            <Table.Row>
               <Table.ColumnHeaderCell>NFT Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Describe</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Image URL</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            
            <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell> <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="PopoverInput"
          />
                </Table.RowHeaderCell>
                
                <Table.Cell>
                  <input
            type="text"
            placeholder="describe"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="PopoverInput"
          />

            </Table.Cell>
            <Table.Cell><input
            type="text"
            placeholder="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="PopoverInput"
          />
</Table.Cell>
              </Table.Row>
              </Table.Body>
          </Table.Root>
        </Inset>
         <Flex gap="3" justify="end">
      <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button onClick={create} variant="classic" radius="large">Mint NFT!!!</Button>
      </AlertDialog.Action>
          </Flex>
           </AlertDialog.Content>
      </AlertDialog.Root>
  
    </div>
  );

   function create() {
    const tx = new Transaction();

    tx.moveCall({
      target: `${mintnftPackageId}::devnet_nft::mint`,
      arguments: [
        tx.pure.string(name),
        tx.pure.string(description),
        tx.pure.string(url),
      ],
    });

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
      }
    );
  }
}