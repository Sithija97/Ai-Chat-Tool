import { Box, Button, Flex, Image, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type IHeroProps = {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
};

export const Hero = ({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
}: IHeroProps) => {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      minH="70vh"
      px={8}
      mb={16}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle}
        </Heading>
        <Link to={ctaLink}>
          <Button
            colorScheme="facebook"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
          >
            {ctaText}
          </Button>
        </Link>
      </Stack>
      <Box
        w={{ base: "90%", sm: "70%", md: "60%" }}
        mb={{ base: 12, md: 0 }}
        ml={10}
      >
        <Image src={image} sizes="100%" rounded="1rem" shadow="2xl" />
      </Box>
    </Flex>
  );
};

Hero.defaultProps = {
  title: "React landing page with Chakra UI",
  subtitle:
    "This is the subheader section where you describe the basic benefits of your product",
  image:
    "https://img.freepik.com/premium-vector/vector-illustration-concept-inventory-control-warehouse-management_675567-3044.jpg?w=1380",
  ctaText: "Create your account now",
  ctaLink: "/signup",
};
