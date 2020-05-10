import { Layout as LayoutWrapper, Menu } from 'antd';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import LayoutHeader from '@components/LayoutHeader';
import { getCurrentPath } from '@modules/router/utils/router-helpers';

const { Content, Sider } = LayoutWrapper;

interface LayoutProps {
  children: React.ReactChild;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  const history = useHistory();
  const location = useLocation();

  const path = getCurrentPath(location);

  return (
    <StyledLayout>
      <LayoutHeader />
      <StyledContent>
        <LayoutWrapper>
          <StyledSider>
            <Menu
              mode="inline"
              defaultSelectedKeys={[path]}
              onClick={({ key }: any): void => history.push(`/${key}`)}
            >
              <Menu.Item key="basic">Basic Info</Menu.Item>
              <Menu.Item key="details">Details</Menu.Item>
              <Menu.Item key="tickets">Tickets</Menu.Item>
              <Menu.Item key="dashboard">Dashboard</Menu.Item>
            </Menu>
          </StyledSider>
          <StyledContent>{children}</StyledContent>
        </LayoutWrapper>
      </StyledContent>
    </StyledLayout>
  );
};

const StyledSider = styled(Sider)`
  background-color: #fff;
`;

const StyledLayout = styled(LayoutWrapper)`
  height: 100%;

  .ant-menu-item {
    margin: 0;
  }
`;

const StyledContent = styled(Content)`
  height: calc(100vh - 62px);
`;

export default Layout;
