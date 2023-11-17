import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Logo } from "./logo";
import { MenuItem } from "./menuItem";
import { LOGIN, REGISTER } from "../../routes";

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

export const Header = () => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["facebook.500", "facebook.500", "transparent", "transparent"]}
      color={["white", "white", "facebook.700", "facebook.700"]}
    >
      <Flex align="center">
        <Logo
          width="100px"
          color={["white", "white", "facebook.500", "facebook.500"]}
        />
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          {/* <MenuItem to="/#">Home</MenuItem>
          <MenuItem to="/#">How It works </MenuItem>
          <MenuItem to="/#">Features </MenuItem>
          <MenuItem to="/#">Pricing </MenuItem> */}
          <MenuItem to={LOGIN}>
            <Button
              size="sm"
              rounded="md"
              color={["facebook.500", "facebook.500", "white", "white"]}
              bg={["white", "white", "facebook.500", "facebook.500"]}
              _hover={{
                bg: [
                  "facebook.100",
                  "facebook.100",
                  "facebook.600",
                  "facebook.600",
                ],
              }}
            >
              Login
            </Button>
          </MenuItem>
          <MenuItem to={REGISTER} isLast>
            <Button
              size="sm"
              rounded="md"
              color={["facebook.500", "facebook.500", "white", "white"]}
              bg={["white", "white", "facebook.500", "facebook.500"]}
              _hover={{
                bg: [
                  "facebook.100",
                  "facebook.100",
                  "facebook.600",
                  "facebook.600",
                ],
              }}
            >
              Register
            </Button>
          </MenuItem>
        </Flex>
      </Box>
    </Flex>
  );
};
