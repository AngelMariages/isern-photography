import { AuthorizationCode } from "simple-oauth2";
import { randomBytes } from "crypto";
import { config } from "../../../lib/config";
import { scopes } from "../../../lib/scopes";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const randomString = () => randomBytes(4).toString("hex");

export async function GET(request: NextRequest) {
	const host = headers().get("host");
	const provider = request.nextUrl.searchParams.get("provider");

	if (!provider || provider !== "github") {
		return NextResponse.json({ message: "Missin provider" }, { status: 400 });
	}

	// simple-oauth will use our config files to generate a client we can use to request access
	const client = new AuthorizationCode(config);

	// we then make a build the request to our provider
	const authorizationUri = client.authorizeURL({
		// your callback url is important! More on this later
		redirect_uri: `https://${host}/api/callback?provider=${provider}`,
		scope: scopes[provider],
		state: randomString(),
	});

	// and get redirected to Github for authorisation
	return NextResponse.redirect(authorizationUri);
}
