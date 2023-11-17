import { Flex } from "@chakra-ui/react";
import { Header, Hero } from "../../components";
import { REGISTER } from "../../routes";

export const Home = () => {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Header />
      <Hero
        title="Streamline Your Inventory Management Effortlessly"
        subtitle="Our platform offers seamless control and visibility over your inventory, enabling efficient tracking, precise forecasting, and optimized stock levels. Say goodbye to stockouts and overstocking while boosting operational efficiency with our intuitive inventory management solution."
        image="https://img.freepik.com/premium-vector/vector-illustration-concept-inventory-control-warehouse-management_675567-3044.jpg?w=1380"
        ctaText="Create your account now"
        ctaLink={REGISTER}
      />
    </Flex>
  );
};
