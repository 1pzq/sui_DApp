import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiParsedData } from "@mysten/sui.js/client";
import { DataList,Badge,Flex ,Code,IconButton} from "@radix-ui/themes";

export function LiquidityObject({ id }: { id: string }) {
  const { data, isPending, error } = useSuiClientQuery('getObject', {
    id: id,
    options: {
      showContent: true,
    },
  });

  if (isPending) return <div>Loading object information...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!data || !data.data) return <div>No object data found.</div>;

  const objectData = data.data.content as SuiParsedData;

  // 检查数据类型是否为 moveObject 并且 fields 存在
  if (objectData.dataType === 'moveObject' && objectData.hasOwnProperty('fields')) {
    const { id: objectId, lsp_supply, token_a, token_b } = objectData.fields as any;

    return (
      <div>
            <DataList.Root size="3">
                <DataList.Item align="center">
                    <DataList.Label minWidth="88px">
                        Status
                    </DataList.Label>
                    <DataList.Value>
                        <Badge color="jade" variant="soft" radius="full">
                            Running....
                        </Badge>
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">
                        PackageId
                    </DataList.Label>
                    <DataList.Value>
                        <Flex align="center" gap="2">
                            <Code variant="ghost">{objectId.id}</Code>
                            <IconButton
                                 size="1"
                                 aria-label="Copy value"
                                  color="gray"
                                variant="ghost" >
                            </IconButton>
                        </Flex>
                    </DataList.Value>

                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">
                        Token A Num
                    </DataList.Label>
                    <DataList.Value>
                         {token_a}
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">
                        Token B Num
                    </DataList.Label>
                    <DataList.Value>
                         {token_b}
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">
                        Fee Percent
                    </DataList.Label>
                    <DataList.Value>
                        0.3%
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">
                        1 Token A 
                    </DataList.Label>
                    <DataList.Value>
                         ≈{token_b/token_a} Token B
                    </DataList.Value>
                  </DataList.Item>
                
        </DataList.Root>
      </div>
    );
  }

  return <div>No valid Move object data found.</div>;
}
