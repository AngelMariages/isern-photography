import MainContainer from "../../../components/MainContainer";
import MainImage from "../../../components/MainImage";
import { PostImage } from "../../../lib/api";

export const metadata = {
	title: "Jordi Isern photography - Contact",
};

const mainImage: PostImage = {
	src: "/contact-bg.jpg",
	width: 2048,
	height: 2048,
	blurDataURL:
		"data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABkAGQDASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAAAAECAwQFBgcI/8QAIhAAAgIDAQADAAMBAAAAAAAAAAECAwQRITEFIiMSMjNB/8QAGgEAAgMBAQAAAAAAAAAAAAAAAQQCAwUABv/EABsRAQEBAQEBAQEAAAAAAAAAAAABAhEDMRIh/9oADAMBAAIRAxEAPwD5WAAJABREKFwQ9DUh0QhU1Xpex/UUq/S7QCjlsYb6jofj560c1iy1o2sOzWhb0nTflrjsfj7POnR4Vi0jisG/WunRYGR50S9MtHz26iE/qgKVV30XQKeL+vl0AA23nAhyEFQXFQ5CIdEkjUtZco9Kta6XseG2gUcr+P8A8NLHlrRTx6y7CGinRnDUxLtNG/gZHnTlqXpmvg2dQvvJrz07Cm/80Bn0T/NAK/k5NPAQADWYJUKhEKgxxyJIIjRNWukkViiO2auJVtoo40eo28Kvwr3ri3zz1bx6eLhYdekTUwSQtqSQv+jczyII8Zo4L6jN300cD+yBr4lj66LH/wAkA/GX5IBanI8DAANNhhD0NQ+KC4qRNX6RpEkAotDF9Ru4T8OfxpaZsYlmtFWzHlW7XL6jL58K8LeDLbNlEhq3+FU/safx8/sjEi9yNb499QdfAx9dbjS/FAQ40vyQCtOz48KAANNhliSRI0PiwuSIfEYhUworVMvDRx7NaMmtlymZDUWYvGzXbwWU9lKuZPGWynhma6s1dZsYC6jIx/UbWCuohpb5z+t+h/kgG0/5oBc5I8QAANJhhDkxqFOckTHJkSY6LCCeDLNTKkGWK2CjF6uRYrkUYSJ65ELFua1saXUbWDLw53Gn02sOzwq1DnlXR1S+iAqVW/RAUcPR4+AAPsAAAHOKOiABclgWKwAFcmiTQ9AAJxcx31GviN8ACrZzxa1cn/AAApaEf//Z",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<MainContainer intent="primary">
			<div className="h-screen text-gray-300">
				<div className="absolute h-screen w-full">
					<MainImage image={mainImage} />
				</div>
				<div className="pt-20 relative z-[9] pl-10 md:pl-20 md:pt-[8rem]">
					{children}
				</div>
			</div>
		</MainContainer>
	);
}
