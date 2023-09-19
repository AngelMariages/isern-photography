import { PropsWithChildren } from "react";

export default function AdminPage({ children }: PropsWithChildren<{}>) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}
