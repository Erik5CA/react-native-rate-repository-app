import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORI_BY_ID } from "../graphql/queries";
import { FlatList, StyleSheet, View } from "react-native";
import theme from "../theme";
import { formatDate } from "../utils/formatDate";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.backGroundWhite,
    padding: 15,
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
});

const ItemSeparator = () => <View style={styles.separator} />;

function ReviewItem({ review }) {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text color={"primary"} fontWeight={"bold"} fontSize={"subheading"}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.text}>
        <Text fontWeight={"bold"} fontSize={"subheading"}>
          {review.user.username}
        </Text>
        <Text color={"textTerceary"}>{formatDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
}

function ViewRepository() {
  const params = useParams();
  const { data, fetchMore, loading } = useQuery(GET_REPOSITORI_BY_ID, {
    variables: { repositoryId: params.id, first: 4 },
    fetchPolicy: "cache-and-network",
  });
  const reviews = data?.repository.reviews.edges.map((item) => item.node);

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: params.id,
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  return (
    <>
      {data && (
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryItem data={data.repository} />}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      )}
    </>
    // <Text>ID</Text>
  );
}

export default ViewRepository;
