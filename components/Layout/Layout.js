import React, { createRef } from "react";
import Navbar from "./NavigationBar";
import { Container } from "react-bootstrap";
import nprogress from "nprogress";
import Router from "next/router";

function Layout({children, user}) {
    const contextRef = createRef();

    Router.onRouteChangeStart = () => nprogress.start();
    Router.onRouteChangeComplete = () => nprogress.done();
    Router.onRouteChangeError = () => nprogress.done();
    return (
        <>
            <Navbar {...user} />
            <Container fluid>
                {children}
            </Container>
        </>
    )
}

export default Layout;