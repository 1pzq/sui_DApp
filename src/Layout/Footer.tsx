import { Box,Text,Quote,Flex,Badge } from "@radix-ui/themes";

const Footer = ({ children }) => (
    <Box className={"left_content"} height="100px" style={{ backgroundColor: "gray" }}>
        <Text weight="regular" as="div" align="center">
  
</Text>

<Text weight="medium" as="div" align="center" color="red">
   <Quote>Thank you for visiting this website</Quote>
</Text>

<Text weight="bold" as="div" align="center" color="red">
  <Quote>If you have better suggestions, please contact me</Quote>
        </Text>

       
        <Badge color='indigo'>Little Surprise</Badge>

  {children}
    </Box>
);

export default Footer;