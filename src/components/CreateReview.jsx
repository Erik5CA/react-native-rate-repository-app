import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

yup.setLocale({
  number: "Filed must be a number",
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .moreThan(0, "Rating must be more than 0")
    .lessThan(100, "Rating must be less than 100"),
  text: yup.string().optional(),
});

function CreateReview() {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const review = {
      ...values,
      rating: parseInt(values.rating),
    };
    try {
      const { data } = await createReview({ variables: { review } });
      const id = data.createReview.repository.id;
      navigate(`/repository/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const errorRating = formik.touched.rating && formik.errors.rating;
  const errorOwnerName = formik.touched.ownerName && formik.errors.ownerName;
  const errorRepositoryName =
    formik.touched.repositoryName && formik.errors.repositoryName;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errorOwnerName && styles.errorInput]}
        placeholder="Repository Owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {errorOwnerName && (
        <Text color={"error"} style={styles.error}>
          {formik.errors.ownerName}
        </Text>
      )}

      <TextInput
        style={[styles.input, errorRepositoryName && styles.errorInput]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {errorRepositoryName && (
        <Text color={"error"} style={styles.error}>
          {formik.errors.repositoryName}
        </Text>
      )}

      <TextInput
        style={[styles.input, errorRating && styles.errorInput]}
        placeholder="Raiting between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {errorRating && (
        <Text color={"error"} style={styles.error}>
          {formik.errors.rating}
        </Text>
      )}

      <TextInput
        style={styles.input}
        multiline
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
      />

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text} fontWeight={"bold"}>
          Create Review
        </Text>
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

export default CreateReview;
