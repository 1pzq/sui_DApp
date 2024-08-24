import { Box, Flex, Heading, Table,Avatar, TextArea } from "@radix-ui/themes";

const Header = ({ children }) => (
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
        <Heading size="9" align="center">
          Sui Liquidity
        </Heading>
      </Box>

      <Box>{children}</Box>
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
      <Box>
        <img src="src/Layout/1.png" alt="Example" style={{ height: '70px' }} />
      </Box>
      <Box>
        <Table.Root>
  

  <Table.Body>
    <Table.Row>
      <Table.RowHeaderCell>Twitter</Table.RowHeaderCell>
      <Table.Cell>@pzqy2</Table.Cell>
     
    </Table.Row>

    <Table.Row>
     
      <Table.Cell>Project address</Table.Cell>
      <Table.Cell><a href="https://github.com/1pzq/sui_DApp" target="_blank" rel="noopener noreferrer">Github</a></Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
      </Box>
    </Flex>
    
  </Box>
);

export default Header;
