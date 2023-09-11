/** @type {import('next').NextConfig} */

// next
const nextConfig = {
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
