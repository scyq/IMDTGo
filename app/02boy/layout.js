export const metadata = {
	title: "与*乐乐学长*的对话",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	const layoutCSS = {
		width: "98vw",
		height: "98vh",
	};

	return (
		<html lang="en">
			<body style={layoutCSS}>{children}</body>
		</html>
	);
}
