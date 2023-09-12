/** @type {import('next').NextConfig} */
const nextConfig = {
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
