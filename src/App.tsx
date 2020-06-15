import { ApolloProvider } from '@apollo/react-hooks';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import client from '@graphql/client';
import { GlobalStyle } from '@theme/basic';
import OnLocationChange from '@components/OnLocationChange';
import Header from '@components/Header';
import Footer from '@components/Footer';

import routes from './routes';
import configureStore from './store/configureStore';
import 'antd/dist/antd.css';
import { getIsFullSize } from '@modules/router/utils/router-helpers';

const LayoutView: React.FunctionComponent = () => {
  const location = useLocation();

  const isFullSize = getIsFullSize(location);

  return (
    <Layout>
      <Header />
      <Content>{routes}</Content>
      {isFullSize && <Footer />}
    </Layout>
  );
};

const { history, persistor, store } = configureStore();

const App: React.FunctionComponent = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Helmet titleTemplate="Sarpo | %s" defaultTitle="Sarpo" />
          <GlobalStyle />
          <OnLocationChange />
          <LayoutView />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </ApolloProvider>
);

const Layout = styled.div`
  min-height: 100vh !important;
`;

const Content = styled.main`
  height: calc(100vh - 72px);
`;

export default App;
