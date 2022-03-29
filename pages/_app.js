import App from "next/app";
import Layout from "../components/Layout/Layout";
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../utils/auth';
import axios from 'axios';
import baseUrl from '../utilsServer/baseUrl';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const { token } = parseCookies(ctx);
		let pageProps = {};

		const privateRoutes = ctx.pathname === "/dashboard";

		if (!token) {
			privateRoutes && redirectUser(ctx, "/");
		} else {
			if (Component.getInitialProps) {
				pageProps = await Component.getInitialProps(ctx);
			}
			
			try {
				const payload = { headers: { token: token } };
				const url = `${baseUrl}/api/user`;
				const response = await axios.get(url, payload);
				const user = response.data;
				if (user) !privateRoutes && redirectUser(ctx, "/dashboard");
				pageProps.user = user;
			} catch (error) {
				destroyCookie(ctx, 'token');
				redirectUser(ctx, "/");
			}
		}
		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
		<Layout {...pageProps}>
			<Component {...pageProps} />
				<style jsx global>{'body { background: "#fcfdff";}'}</style>
		</Layout>
		);
	}
}

export default MyApp;