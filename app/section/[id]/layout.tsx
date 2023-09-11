import MainContainer from "../../../components/MainContainer";
import "../../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <MainContainer intent="secondary">{children}</MainContainer>;
}
