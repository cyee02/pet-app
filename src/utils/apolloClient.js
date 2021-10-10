import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({ uri: 'http://localhost:4000/graphql' });

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
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;