import { Image, StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";
import RepositoryItemStat from "./RepositoryItemStat";

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: theme.colors.backGroundWhite,
  },
  header: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    objectFit: "fill",
    alignItems: "center",
    borderRadius: 8,
  },
  headerTexts: {
    flexDirection: "column",
    gap: 10,
    width: "82%",
  },
  description: {
    flex: 1,
  },
  language: {
    padding: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    color: theme.colors.backGroundWhite,
    alignSelf: "flex-start",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

function RepositoryItem({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: data.ownerAvatarUrl }} style={styles.image} />
        <View style={styles.headerTexts}>
          <Text fontSize={"subheading"} fontWeight={"bold"}>
            {data.fullName}
          </Text>
          <View style={{ flexGrow: 1, flex: 1 }}>
            <Text style={styles.description} color={"textTerceary"}>
              {data.description}
            </Text>
          </View>
          <Text style={styles.language}>{data.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <RepositoryItemStat value={data.stargazersCount} text={"Stars"} />
        <RepositoryItemStat value={data.forksCount} text={"Forks"} />
        <RepositoryItemStat value={data.reviewCount} text={"Reviews"} />
        <RepositoryItemStat value={data.reviewCount} text={"Rating"} />
      </View>
    </View>
  );
}

export default RepositoryItem;
