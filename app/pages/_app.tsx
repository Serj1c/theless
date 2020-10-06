import React, { useEffect } from 'react';
import Router from 'next/router';
import { YM_ID, YM_OPTIONS, GA_ID } from 'constants/common';
import { init as initYM } from 'utils/YandexMetrika';
import { init as initGA } from 'utils/GoogleAnalitics';
import './styles.css';

interface Props {
  Component: React.FunctionComponent;
  pageProps: {
    [key: string]: any;
  };
}

const handleRouteChangeComplete = (url: string): void => {
  window.ym(YM_ID, 'hit', url);
  window.ga('set', 'page', url);
  window.ga('send', 'pageview');
};

const App = ({ Component, pageProps }: Props): JSX.Element => {
  useEffect(() => {
    initYM(YM_ID, YM_OPTIONS);
    initGA(GA_ID);

    window.ym(YM_ID, 'hit', window.location.pathname + window.location.search);

    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return <Component {...pageProps} />;
};

export default App;
