import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import theme from "../theme";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

const createAlert = (deleteReviewId, deleteReview, refetch) => {
  return Alert.alert(
    "Delete Review",
    "Are you sure you want to delete this review?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteReview({ variables: { deleteReviewId } });
          refetch();
        },
      },
    ]
  );
};

function ReviewItem({ review, refetch }) {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const navigate = useNavigate();

  const handleViewRepo = (id) => {
    navigate(`/repository/${id}`);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.rating}>
          <Text color={"primary"} fontWeight={"bold"} fontSize={"subheading"}>
            {review.rating}
          </Text>
        </View>

        <View style={styles.text}>
          <Text fontWeight={"bold"} fontSize={"subheading"}>
            {review.repository.fullName}
          </Text>
          <Text color={"textTerceary"}>{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => handleViewRepo(review.repositoryId)}
        >
          <Text style={styles.btnTextColor}>View Repository</Text>
        </Pressable>
        <Pressable
          style={styles.buttonDel}
          onPress={() => createAlert(review.id, deleteReview, refetch)}
        >
          <Text style={styles.btnTextColor}>Delete Review</Text>
        </Pressable>
      </View>
    </View>
  );
}
const ItemSeparator = () => <View style={styles.separator} />;

function MyReviews() {
  const { data, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  return (
    <FlatList
      data={data?.me?.reviews.edges.map((item) => item.node)}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  mainContainer: {
    flexDirection: "column",
    backgroundColor: theme.colors.backGroundWhite,
    padding: 15,
    gap: 10,
  },
  container: {
    flexDirection: "row",
    gap: 10,
  },
  rating: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    borderRadius: 100,
    width: 70,
    height: 70,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    width: "82%",
    flexDirection: "column",
    gap: 5,
  },
  buttonsContainer: {
    // flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    padding: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  buttonDel: {
    padding: 15,
    backgroundColor: theme.colors.textRed,
    borderRadius: 5,
  },
  btnTextColor: {
    color: theme.colors.backGroundWhite,
  },
});

export default MyReviews;
