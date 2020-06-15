import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import LayoutHeader from '@components/LayoutHeader';
import Footer from '@components/Footer';

import ConferencesTable from './ConferencesTable';

interface ConferencesPageViewProps {
  conferences: any[];
}

const ConferencesPageView: React.FunctionComponent<ConferencesPageViewProps> = ({
  conferences,
}: ConferencesPageViewProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <LayoutHeader />
      <Content>
        <TableHeader>
          <Title>{t('Conferences')}</Title>
          <Link to="/conferences/create">
            <Button type="primary">{t('Create conference')}</Button>
          </Link>
        </TableHeader>
        <ConferencesTable conferences={conferences} />
      </Content>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Content = styled.div`
  min-height: calc(100vh - 130px);
  margin: 0 10%;
  padding-top: 50px;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  color: #1e0a3c;
  font-size: 1.875rem;
  font-weight: 800;
`;

export default ConferencesPageView;
