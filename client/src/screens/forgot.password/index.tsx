import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DASHBOARD, LOGIN } from "../../routes";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { forgotPassword } from "../../store/auth/authslice";
import { Loader } from "../../components";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const ForgotPassword = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state: RootState) => state.auth);

  const bgColorFlex = useColorModeValue("gray.50", "gray.800");
  const bgColorBox = useColorModeValue("white", "gray.700");

  const handleSubmit = async ({ email }: { email: string }) => {
    const response = await dispatch(forgotPassword(email));
    if (response.meta.requestStatus === "fulfilled") {
      formik.resetForm();
      navigate(DASHBOARD);
    }
    if (response.meta.requestStatus === "rejected") {
      toast({
        title: response.payload,
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  if (isLoading) return <Loader />;

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgColorFlex}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Forgot your Password ?</Heading>
        </Stack>
        <Box rounded={"lg"} bg={bgColorBox} boxShadow={"lg"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                id="email"
                isInvalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  type="submit"
                  bg={"facebook.400"}
                  color={"white"}
                  _hover={{
                    bg: "facebook.500",
                  }}
                >
                  Get Reset Email
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                  Go to{" "}
                  <Link as={RouterLink} to={LOGIN} color={"facebook.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
