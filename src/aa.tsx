import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Box, Container, Flex, Heading,Theme} from "@radix-ui/themes";
import { useState } from "react";
import { Counter } from "./Counter";
import { CreateCounter } from "./CreateCounter";
import { MintNFT } from "./MintNFT";
import { Uniswap } from "./Uniswap"

function App11() {
  const currentAccount = useCurrentAccount();
  const [counterId, setCounter] = useState(() => {
    const hash = window.location.hash.slice(1);
    return isValidSuiObjectId(hash) ? hash : null;
  });

    return (
      <>
    

     
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>sui_dapp 模板</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          {currentAccount ? (
            <>
              {counterId ? (
                <Counter id={counterId} />
              ) : (
                <CreateCounter
                  onCreated={(id) => {
                    window.location.hash = id;
                    setCounter(id);
                  }}
                />
              )}
              {/* 在这里添加 MintNFT 组件 */}
              <MintNFT onCreated={(id) => {
                console.log(`Minted NFT ID: ${currentAccount}`);
                window.location.hash = id+11;
              }
              } />
              <Uniswap onCreated={(id) => console.log(`Uniswap ID: ${id}`)} />
            </>
          ) : (
            <Heading>请连接你的钱包</Heading>
          )}

         
     
        
         
        </Container>
        
            </Container>
            </>
   
  );
}

export default App11;