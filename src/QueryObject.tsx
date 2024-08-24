import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiMoveObject, SuiParsedData } from "@mysten/sui.js/client";
import { DataList,Badge,Flex ,Code,IconButton} from "@radix-ui/themes";
export function QueryObject({ id }: { id: string }) {
  // 使用 useSuiClientQuery 钩子来获取对象的详细信息
  const { data, isPending, error } = useSuiClientQuery('getObject', {
    id: id,
    options: {
      showContent: true,  // 设置 true 来显示对象详细信息
    },
  });

  // 如果数据仍在加载
  if (isPending) return <div>Loading object information...</div>;

  // 如果加载出现了错误
  if (error) return <div>An error occurred: {error.message}</div>;

  // 如果没有查询到数据
  if (!data || !data.data) return <div>No object data found.</div>;

  // 获取对象内容
  const content = data.data.content as SuiParsedData | null;

  // 检查对象数据类型并提取所需的字段
  if (content && content.dataType === 'moveObject') {
    const moveObject = content as SuiMoveObject;
    const { type, fields } = moveObject;

    // 检查 fields 是否有 id 字段
    const idValue = (fields as any)?.id?.id;

    return (
      <div>
        <Flex direction="column" gap="6">
          <DataList.Root size="3">
            <DataList.Item align="center">
            <DataList.Label minWidth="88px">Status</DataList.Label>
            <DataList.Value>
      <Badge color="jade" variant="soft" radius="full">
        Success
              </Badge>
              
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
    <DataList.Label minWidth="88px">PackageId</DataList.Label>
    <DataList.Value>
      <Flex align="center" gap="2">
                  <Code variant="ghost"> {idValue}</Code>
        <IconButton
          size="1"
          aria-label="Copy value"
          color="gray"
          variant="ghost"
        >
         
        </IconButton>
      </Flex>
    </DataList.Value>
            </DataList.Item>
            <DataList.Item>
    <DataList.Label minWidth="88px">Type</DataList.Label>
    <DataList.Value> {type}</DataList.Value>
  </DataList.Item>
          </DataList.Root>
          
       </Flex>
      </div>
    );
  }

  return <div>No valid Move object data found.</div>;
}
