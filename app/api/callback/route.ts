import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { AuthorizationCode, AuthorizationTokenConfig } from "simple-oauth2";
import { config } from "../../../lib/config";

export async function GET(request: NextRequest) {
	const host = headers().get("host");
	const code = request.nextUrl.searchParams.get("code");
	const provider = request.nextUrl.searchParams.get("provider");

	// Only supported provider is Github
	if (!provider || provider !== 'github') {
		return NextResponse.json({ message: "Missin provider" }, { status: 400 });
	}

	if (!code) {
		return NextResponse.json({ message: "Missing code" }, { status: 400 });
	}

	// we recreate the client we used to make the request
	const client = new AuthorizationCode(config);

	// create our token object
	const tokenParams: AuthorizationTokenConfig = {
		code,
		redirect_uri: `https://${host}/api/callback?provider=${provider}`
	};

	try {
		// try to create an access token from the client
		const accessToken = await client.getToken(tokenParams);
		const token: string = accessToken.token.access_token;

		if (!token) {
			return NextResponse.json({ message: "Missing token" }, { status: 400 });
		}

		const responseBody = renderBody("success", {
			token,
			provider
		});

		return new NextResponse(responseBody, {
			headers: {
				"content-type": "text/html",
			},
		});
	} catch (error) {
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	}
};

// This renders a simple page with javascript that allows the pop-up page
// to communicate with its opener
const renderBody = (status: string, content: { token: string | undefined, provider: string }): string => {
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
