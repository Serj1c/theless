import React from 'react';
import './styles.css'

interface Props {
    Component: React.FunctionComponent;
    pageProps: {
        [key: string]: any
    }
}

const App = ({ Component, pageProps }: Props): JSX.Element => (
    <Component {...pageProps} />
);

export default App;
