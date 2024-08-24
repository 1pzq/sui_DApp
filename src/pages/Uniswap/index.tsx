import { Table,TabNav } from "@radix-ui/themes";

const Uniswap = () => {
  return (
   <Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    <Table.Row>
      <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
      <Table.Cell>danilo@example.com</Table.Cell>
      <Table.Cell>Developer</Table.Cell>
    </Table.Row>

    <Table.Row>
      <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
      <Table.Cell>zahra@example.com</Table.Cell>
      <Table.Cell>Admin</Table.Cell>
    </Table.Row>

    <Table.Row>
      <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
      <Table.Cell>jasper@example.com</Table.Cell>
      <Table.Cell>Developer</Table.Cell>
    </Table.Row>
          </Table.Body>
          
          <TabNav.Root>
  <TabNav.Link href="#" active>
    Account
  </TabNav.Link>
  <TabNav.Link href="hhhh">Documents</TabNav.Link>
  <TabNav.Link href="ni1hao">Settings</TabNav.Link>
          </TabNav.Root>
          


          
      </Table.Root>
      

  );
};


export default Uniswap;

