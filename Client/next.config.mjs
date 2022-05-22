/** @type {import("next").NextConfig} */

export default {
	reactStrictMode: true,
	images: {
		domains: ["localhost"]
	},
	rewrites: async () => [
		{
			source: "/api/:path*",
			destination: `http://localhost:8000/:path*`
		}
	]
};
