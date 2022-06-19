const GITHUB_CLIENT_ID: string = process.env.OAUTH_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET: string = process.env.OAUTH_GITHUB_CLIENT_SECRET;
const GITHUB_TOKEN_HOST = 'https://github.com';
const GITHUB_TOKEN_PATH = '/login/oauth/access_token';
const GITHUB_TOKEN_AUTH_PATH = '/login/oauth/authorize'

export const config = () => ({
	client: {
		id: GITHUB_CLIENT_ID,
		secret: GITHUB_CLIENT_SECRET
	},
	auth: {
		tokenHost: GITHUB_TOKEN_HOST,
		tokenPath: GITHUB_TOKEN_PATH,
		authorizePath: GITHUB_TOKEN_AUTH_PATH
	}
});
