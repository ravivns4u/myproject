import "../styles/root.scss";
import "../styles/global/_page.scss";
import "react-toastify/dist/ReactToastify.min.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import Notification from "../components/Common/Notifications/Notification";
import store from "../redux/app/store";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import MIUIHeader from "../components/Common/MUIComponents/MUI-Header/MUIFeedHead";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../styles/mui/themes";
import createEmotionCache from "../styles/mui/emotioncache";
import { EmotionCache } from "@emotion/utils";
import Script from "next/script";

const clientSideEmotionCache = createEmotionCache();

type NewPageProps = AppProps & {
  emotionCache: EmotionCache;
};

export default function MyApp(props: NewPageProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	
useEffect(() => {
    document.body.className = pageProps.isDark ? 'dark-mode' : 'light-mode';
  });	
	
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        {/* <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></Script> */}
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/logo-dark.png" type="image/png" />
          <title>Soul Says: BreakFree</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <React.Fragment>
            <MIUIHeader />
            <Component {...pageProps} />
            <ToastContainer theme='colored' autoClose={3000} hideProgressBar={true} />
            <Notification />
          </React.Fragment>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
