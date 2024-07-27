import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link, useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

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
  const { data } = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const isAuthenticate = data?.me ? true : false;

  const handleSignOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to={"/"}>
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>

        {isAuthenticate ? (
          <>
            <Pressable>
              <Link to={"/create-review"}>
                <Text style={styles.text}>Cerate a Review</Text>
              </Link>
            </Pressable>
            <Pressable>
              <Link to={"/my-reviews"}>
                <Text style={styles.text}>My Reviews</Text>
              </Link>
            </Pressable>
            <Pressable onPress={handleSignOut}>
              <Text style={styles.text}>Sing Out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable>
              <Link to={"/sing-in"}>
                <Text style={styles.text}>Sign In</Text>
              </Link>
            </Pressable>
            <Pressable>
              <Link to={"/sign-up"}>
                <Text style={styles.text}>Sign Up</Text>
              </Link>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
