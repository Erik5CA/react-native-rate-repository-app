import { useFormik } from "formik";
import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import theme from "../theme";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.username && styles.errorInput]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />

      {formik.touched.username && formik.errors.username && (
        <Text color={"error"} style={styles.error}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        style={[styles.input, formik.errors.password && styles.errorInput]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />

      {formik.touched.password && formik.errors.password && (
        <Text color={"error"} style={styles.error}>
          {formik.errors.password}
        </Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text}>Sing In</Text>
      </Pressable>
    </View>
  );
};

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

export default SignIn;
