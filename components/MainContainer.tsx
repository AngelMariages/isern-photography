import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const mainContainer = cva([], {
	variants: {
		intent: {
			primary: "text-[#FFFAF7] bg-[#2b2b2b]",
			secondary: "text-[#2b2b2b] bg-[#FFFAF7]",
		},
	},
	defaultVariants: {
		intent: "primary",
	},
});

export type MainContainerVariantProps = VariantProps<typeof mainContainer>;

export default function MainContainer({
	intent,
	children,
}: PropsWithChildren<MainContainerVariantProps>) {
	return <div className={mainContainer({ intent })}>{children}</div>;
}
