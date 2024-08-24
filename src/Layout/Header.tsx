import { Box,Flex,Heading,Link,AlertDialog,Badge,Avatar,TextArea} from "@radix-ui/themes";
const Header = ({children}) => (
    <Box className={"left_content"} height="150px">
       
       <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box width="80%">
           <Heading size="9" align="center" >Sui Liquidity</Heading>
        </Box>

        <Box>
          {children}
        </Box>
        </Flex>
        <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
        >
             <Avatar
    size="6"
    src="./images/1.png"
    fallback="A"
  />
            <Box>
                <TextArea placeholder="Reply to comment…" />
                 <Badge variant="solid" color="indigo">
    New
  </Badge>
           
            </Box>
            

        <Box>
          {children}
        </Box>
      </Flex>
        </Box>
       
       
);



export default Header;
