import { StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  stats: {
    flexDirection: "column",
    alignItems: "center",
  },
});

const formatValue = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
};

function RepositoryItemStat({ value, text }) {
  return (
    <View style={styles.stats}>
      <Text fontWeight={"bold"}>{formatValue(value)}</Text>
      <Text color={"textTerceary"}>{text}</Text>
    </View>
  );
}

export default RepositoryItemStat;
