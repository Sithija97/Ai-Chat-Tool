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
import { resetPassword } from "../../store/auth/authslice";
import { Loader } from "../../components";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Confirm password must be at least 6 characters")
    .required("Confirm password is required"),
});

export const ResetPassword = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state: RootState) => state.auth);

  const bgColorFlex = useColorModeValue("gray.50", "gray.800");
  const bgColorBox = useColorModeValue("white", "gray.700");

  const handleSubmit = async ({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }) => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match, please check again.",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    } else {
      const response = await dispatch(resetPassword(password));
      if (response.meta.requestStatus === "fulfilled") {
        formik.resetForm();
        toast({
          title: "Password reset successfull!",
          status: "success",
          isClosable: true,
          position: "top-right",
          duration: 5000,
        });
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
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
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
          <Heading fontSize={"4xl"}>Reset your Password </Heading>
        </Stack>
        <Box rounded={"lg"} bg={bgColorBox} boxShadow={"lg"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                id="password"
                isInvalid={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
              >
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="confirmPassword"
                isInvalid={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? true
                    : false
                }
              >
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                <FormErrorMessage>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
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
                  Reset Password
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
