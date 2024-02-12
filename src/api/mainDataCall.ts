const TOKEN = import.meta.env.VITE_GIT_TOKEN;

export const getMainData = async (selectedUser: string) => {
  const userQuery = `
    {
      user(login: "${selectedUser}") {
        login
        name
        avatarUrl
        bio
        repositories(first: 50, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
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
      }
    }
  `;

  try {
    const userResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ query: userQuery }),
    });

    if (!userResponse.ok) {
      throw new Error(`Error retrieving data: ${userResponse.status} - ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();

    if (!userData.data || !userData.data.user) {
      throw new Error('GraphQL structure is wrong');
    }

    const userDetails = userData.data.user;
    const repositories = userDetails.repositories.nodes;

    return { userDetails, repositories };
  } catch (error) {
    console.error('Error requesting user data:', error);
    throw error;
  }
};
