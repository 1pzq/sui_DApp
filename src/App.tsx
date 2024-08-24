import { Box,Card, Flex } from "@radix-ui/themes";
import Header from "./Layout/Header";
import Body from "./Layout/Body";
import Footer from "./Layout/Footer";
import { ConnectButton } from "@mysten/dapp-kit";
import { MintNFT } from "./MintNFT";

function App() {
  return (
      <Box width="100%" height="780px">
      <Card size='1' >
          <Flex direction="column">
            <Card size='1' >
            <Header >
              <ConnectButton />

              </Header>
            </Card>
            <Card size='4' >
              <Body children={"hhhh"}></Body>
            </Card>
            <Card size='1' >
            <Footer >
              <MintNFT onCreated={(id) => console.log(`Uniswap ID: ${id}`)} />
               </Footer>
          </Card>    
        </Flex>
      </Card>
       </Box>
  );
}

export default App;
