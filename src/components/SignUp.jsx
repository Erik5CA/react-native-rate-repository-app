import { Pressable, StyleSheet, TextInput, View } from "react-native";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";
import useSignIn from "../hooks/useSingIn";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at last 5 characters")
    .max(30, "Username must be at last 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at last 5 characters")
    .max(50, "Password must be at last 50 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Password do not match"),
});

function SignUp() {
  const authStorage = useAuthStorage();
  const [signIn] = useSignIn(authStorage);
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const onSubmit = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
    };
    try {
      await createUser({ variables: { user } });
      await signIn(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const errorUsername = formik.touched.username && formik.errors.username;
  const errorPassword = formik.touched.password && formik.errors.password;
  const errroConfirmPassword =
    formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <View style={[styles.container]}>
      <TextInput
        style={[styles.input, errorUsername && styles.errorInput]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {errorUsername && (
        <Text color={"error"} style={styles.error}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        style={[styles.input, errorPassword && styles.errorInput]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {errorPassword && (
        <Text color={"error"} style={styles.error}>
          {formik.errors.password}
        </Text>
      )}

      <TextInput
        style={[styles.input, errroConfirmPassword && styles.errorInput]}
        placeholder="Confirm Password"
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange("confirmPassword")}
        secureTextEntry
      />
      {errroConfirmPassword && (
        <Text color={"error"} style={styles.error}>
          {formik.errors.confirmPassword}
        </Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    fontSize: theme.fontSizes.body,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: theme.colors.textTerceary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: theme.colors.backGroundWhite,
    textAlign: "center",
  },
  error: {
    marginBottom: 10,
  },
  errorInput: {
    borderColor: theme.colors.textRed,
  },
});

export default SignUp;
