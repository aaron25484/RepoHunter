const TOKEN = import.meta.env.VITE_GIT_TOKEN;

export const searchUsers = async (query: string) => {
  const userSuggestedQuery = `
    {
      search(query: "${query} in:user", type: USER, first: 5) {
        edges {
          node {
            ... on User {
              login
              avatarUrl
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ query: userSuggestedQuery }),
    });

    if (!response.ok) {
      throw new Error(`Error searching users: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.data || !data.data.search) {
      throw new Error('GraphQL structure is wrong');
    }

    const users = data.data.search.edges.map((edge: any) => edge.node);
    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};
