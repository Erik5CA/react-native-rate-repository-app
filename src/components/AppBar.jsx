import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backGround,
    flexDirection: "row",
  },
  text: {
    padding: 15,
    fontSize: 25,
    color: "white",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to={"/"}>
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link to={"/sing-in"}>
            <Text style={styles.text}>Sing In</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
