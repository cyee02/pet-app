import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({ uri: 'http://localhost:4000/graphql' });
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  link,
);

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         repositories: relayStylePagination(),
//       },
//     },
//     Repository: {
//       fields: {
//         reviews: relayStylePagination(),
//       },
//     },
//   },
// });

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      const output = {
        headers: {
          ...headers,
          authorization: accessToken ? `${accessToken}` : '',
        },
      };
      return output
    } catch (e) {
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(splitLink),
    uri: 'http://localhost:4000/', //connect to server
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;