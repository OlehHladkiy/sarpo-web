import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LayoutHeader from '@components/LayoutHeader';

import ConferencesTable from './ConferencesTable';

interface ConferencesPageViewProps {
  conferences: any[];
}

const ConferencesPageView: React.FunctionComponent<ConferencesPageViewProps> = ({
  conferences,
}: ConferencesPageViewProps) => (
  <Wrapper>
    <LayoutHeader />
    <Content>
      <TableHeader>
        <Title>Conferences</Title>
        <Link to="/conferences/create">
          <Button type="primary">Create Conference</Button>
        </Link>
      </TableHeader>
      <ConferencesTable conferences={conferences} />
    </Content>
  </Wrapper>
);

const Wrapper = styled.div``;

const Content = styled.div`
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
