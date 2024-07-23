import { useApolloClient, useMutation } from "@apollo/client";
import { GET_TOKEN } from "../graphql/mutations";

const useSingIn = (authStorage) => {
  const [mutate, result] = useMutation(GET_TOKEN);
  const apolloClient = useApolloClient();

  const singIn = async ({ username, password }) => {
    const credentials = { username, password };
    const { data } = await mutate({ variables: { credentials } });
    const token = data.authenticate.accessToken;
    authStorage.setAccessToken(token);
    apolloClient.resetStore();
    return { data };
  };

  return [singIn, result];
};

export default useSingIn;
