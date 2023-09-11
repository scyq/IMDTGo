/** @type {import('next').NextConfig} */

const nextConfig = {
	output: "export",

	basePath: "/IMDTGo",

	images: {
		unoptimized: true,
	},

	async redirects() {
		return [
			{
				source: "/",
				destination: "/template",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
