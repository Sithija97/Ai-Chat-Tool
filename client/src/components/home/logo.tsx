import { Box, Text } from "@chakra-ui/react";

type ILogoProps = {
  width: string;
  color: object;
};

export const Logo = ({ width, color }: ILogoProps) => {
  return (
    <Box w={width} color={color}>
      <Text fontSize="lg" fontWeight="bold">
        Logo
      </Text>
    </Box>
  );
};
