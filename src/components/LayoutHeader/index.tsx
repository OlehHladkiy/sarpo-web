import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
  UserOutlined,
  DownOutlined,
  // SettingOutlined,
  BookOutlined,
  LogoutOutlined,
  // ContainerOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getEmail, getName } from '@modules/user/UserReducer';
import { getCurrentPath } from '@modules/router/utils/router-helpers';

enum NavKey {
  Conferences = 'conferences',
  Settings = 'settings',
  Tickets = 'tickets',
  Signout = 'signout',
}

const { Header } = Layout;

const LayoutHeader: React.FunctionComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  const email = useSelector(getEmail);
  const name = useSelector(getName);

  const path = getCurrentPath(location);

  return (
    <Wrapper>
      <Logo to="/">Sarpo</Logo>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[path]}>
        <Menu.Item
          key={NavKey.Conferences}
          onClick={(): void => history.push(`/${NavKey.Conferences}`)}
        >
          {t('Conferences')}
        </Menu.Item>
      </Menu>
      <RightControls>
        <RightControlsMenu>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>{t('Preview')}</Menu.Item>
            <Menu.Item>{t('Publish Conference')}</Menu.Item>
          </Menu>
        </RightControlsMenu>
        <Dropdown
          placement="bottomCenter"
          overlay={
            <>
              <UserInfoWrapper>
                <AvatarWrapper>
                  <Avatar shape="circle" size={24} icon={<UserOutlined />} />
                </AvatarWrapper>
                <TwoLineInfo>
                  <div>{email}</div>
                  <div>{name}</div>
                </TwoLineInfo>
              </UserInfoWrapper>
              <StyledMenu
                onClick={({ key }: any): void => history.push(`/${key}`)}
              >
                <UserMenuItem icon={<BookOutlined />} key={NavKey.Conferences}>
                  {t('Conferences')}
                </UserMenuItem>
                {/* <BorderedBottomItem
                  icon={<SettingOutlined />}
                  key={NavKey.Settings}
                >
                  Settings
                </BorderedBottomItem>
                <UserMenuItem icon={<ContainerOutlined />} key={NavKey.Tickets}>
                  Tickets
                </UserMenuItem> */}
                <BorderedTopItem icon={<LogoutOutlined />} key={NavKey.Signout}>
                  Sign out
                </BorderedTopItem>
              </StyledMenu>
            </>
          }
        >
          <UserDropdownWrapper>
            <UserOutlined />
            <StyledDownOutlined />
          </UserDropdownWrapper>
        </Dropdown>
      </RightControls>
    </Wrapper>
  );
};

const Wrapper = styled(Header)`
  display: flex;
`;

const Logo = styled(Link)`
  padding-top: 2px;
  margin-right: 20px;
  margin-left: 10px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
  font-family: 'Lalezar', cursive;
`;

const StyledMenu = styled(Menu)`
  padding: 0;
`;

const UserDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
`;

const UserMenuItem = styled(Menu.Item)`
  padding: 10px 12px;
  margin: 0 !important;
`;

// const BorderedBottomItem = styled(UserMenuItem)`
//   border-bottom: 1px solid #eeedf2;
// `;

const BorderedTopItem = styled(UserMenuItem)`
  border-top: 1px solid #eeedf2;
`;

const RightControls = styled.div`
  display: flex;
  margin-left: auto;
`;

const RightControlsMenu = styled.div`
  margin-right: 40px;
`;

const StyledDownOutlined = styled(DownOutlined)`
  margin-left: 20px;
`;

const UserInfoWrapper = styled.div`
  position: relative;
  padding: 8px 16px 0 50px;
  display: flex;
  background-color: #fff;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 14px;
`;

const TwoLineInfo = styled.div`
  font-size: 0.75rem;

  div:first-child {
    font-weight: 800;
  }
`;

export default LayoutHeader;
