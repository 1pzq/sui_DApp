import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiParsedData } from "@mysten/sui.js/client";

// 定义接口 MoveStruct，声明可选字段并允许使用字符串索引访问
interface MoveStruct {
    [key: string]: any;  // 允许任意字符串键的访问，避免类型检查错误
    name?: string;
    description?: string;
    url?: string;
}

export function NFTObject({ id }: { id: string }) {
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

    // 检查对象数据是否为Move对象，并提取所需的字段
    if (objectData.dataType === 'moveObject' && objectData.fields) {
        const fields = objectData.fields as MoveStruct;  // 使用 MoveStruct 接口

        const name = fields.name || "No Name";
        const description = fields.description || "No Description";
        const url = fields.url || "";

        return (
            <div>
                <h3>Object Details:</h3>
                <ul>
                    <li>Name: {name}</li>
                    <li>Description: {description}</li>
                    <li>URL: {url}</li>
                </ul>
                {url && <img src={url} alt={name} />}
            </div>
        );
    }

    return <div>No valid Move object data found.</div>;
}