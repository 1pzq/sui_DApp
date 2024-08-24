import { Box } from "@radix-ui/themes";

const Footer = ({ children }) => (
    <Box className={"left_content"} height="100px"  style={{ backgroundColor: "gray" }}>
       
        {children}
    </Box>
);

export default Footer;