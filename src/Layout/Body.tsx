import { Box,Flex,Heading,Slider,Grid} from "@radix-ui/themes";
import { Uniswap } from "../Uniswap"
import { MintNFT } from "../MintNFT";



const Body = ({ children }) => (
    
    <Box className={"left_content"} height="400px">

       <Uniswap onCreated={(id) => console.log(`Uniswap ID: ${id}`)} />

    </Box>
    

);

export default Body;
