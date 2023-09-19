import MainContainer from "../../../../components/MainContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <MainContainer intent="secondary">{children}</MainContainer>;
}
