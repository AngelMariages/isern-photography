import { NextApiRequest, NextApiResponse } from 'next';
import { AuthorizationCode, AuthorizationTokenConfig } from "simple-oauth2";
import { config } from "../../lib/config";

const callback = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const { host } = req.headers;
	const url = new URL(`https://${host}/${req.url}`);
	const urlParams = url.searchParams;
	const code = urlParams.get("code");
	const provider = urlParams.get("provider");

	if (!provider || provider !== 'github') {
		return res.status(400).json({
			error: "Missing provider"
		});
	}

	// we recreate the client we used to make the request
	const client = new AuthorizationCode(config(provider));

	// create our token object
	const tokenParams = {
		code,
		redirect_uri: `https://${host}/api/callback?provider=${provider}`
	} as AuthorizationTokenConfig;

	try {
		// try to create an access token from the client
		const accessToken = await client.getToken(tokenParams);
		const token = accessToken.token["access_token"];

		const responseBody = renderBody("success", {
			token,
			provider
		});

		res.statusCode = 200;
		res.end(responseBody);
	} catch (e) {
		res.statusCode = 200;
		res.end('error');
	}
};

// This renders a simple page with javascript that allows the pop-up page
// to communicate with its opener
const renderBody = (status: string, content: { token: string, provider: string}): string => {
	return `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:${content.provider}:${status}:${JSON.stringify(
		content
	)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:${content.provider}", "*");
    </script>
  `;
};

export default callback;
