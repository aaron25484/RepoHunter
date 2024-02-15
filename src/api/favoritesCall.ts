const TOKEN = import.meta.env.VITE_GIT_TOKEN;

export const getFavoritesData = async (favorites: { owner: string; repoName: string }[]) => {
  try {
    const queries = favorites.map((favorite, index) => `
      user${index}: user(login: "${favorite.owner}") {
        login
        name
        avatarUrl
        bio
        repository(name: "${favorite.repoName}") {
          name
          description
          url
          stargazers {
            totalCount
          }
          primaryLanguage {
            name
          }
        }
      }
    `);

    const usersQuery = `{
      ${queries.join('\n')}
    }`;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ query: usersQuery }),
    });

    if (!response.ok) {
      throw new Error(`Error retrieving data: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.data) {
      throw new Error('GraphQL structure is wrong');
    }

    const usersData = Object.values(data.data).map((userData: any) => userData);

    return usersData;
  } catch (error) {
    console.error('Error requesting user data:', error);
    throw error;
  }
};
