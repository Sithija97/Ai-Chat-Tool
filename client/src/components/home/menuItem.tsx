import { ReactNode } from "react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type IMenuProps = {
  children: ReactNode;
  isLast?: boolean;
  to: string;
};

export const MenuItem = ({ children, isLast, to = "/" }: IMenuProps) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};
