import { Layout as LayoutWrapper, Menu } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import LayoutHeader from '@components/LayoutHeader';
import { getCurrentPath } from '@modules/router/utils/router-helpers';
import { ConferenceOnboardingStep } from '@modules/conference/models/conference';
import {
  getConferenceTitle,
  getConferenceStartDate,
  getConferenceStartTime,
  getConferenceOnboardedSteps,
} from '@modules/conference/ConferenceReducer';
import { getConferenceDate } from '@modules/conference/utils/conference-helpers';
import { fetchConference } from '@modules/conference/ConferenceActions';

const { Content, Sider } = LayoutWrapper;

interface LayoutProps {
  children: React.ReactChild;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  const { conferenceId } = useParams();
  const history = useHistory();
  const location = useLocation();

  const conferenceTitle = useSelector((state: Record<string, any>) =>
    getConferenceTitle(state, conferenceId),
  );
  const conferenceStartDate = useSelector((state: Record<string, any>) =>
    getConferenceStartDate(state, conferenceId),
  );
  const conferenceStartTime = useSelector((state: Record<string, any>) =>
    getConferenceStartTime(state, conferenceId),
  );
  const conferenceOnboardedSteps = useSelector((state: Record<string, any>) =>
    getConferenceOnboardedSteps(state, conferenceId),
  );

  const path = getCurrentPath(location);

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = { _id: conferenceId };
    dispatch(fetchConference({ filters }));
  }, []);

  const getIsChecked = (key: string): boolean =>
    conferenceOnboardedSteps.includes(key);

  return (
    <StyledLayout>
      <LayoutHeader />
      <StyledContent>
        <LayoutWrapper>
          <StyledSider width={250}>
            <ConferenceShortInfo>
              <ConferenceTitle>{conferenceTitle}</ConferenceTitle>
              <div>
                {getConferenceDate(conferenceStartDate, conferenceStartTime)}
              </div>
            </ConferenceShortInfo>
            <Menu
              mode="inline"
              defaultSelectedKeys={[path]}
              onClick={({ key }: any): void =>
                history.push(`/conference/${conferenceId}/${key}`)
              }
            >
              <Menu.Item key={ConferenceOnboardingStep.Basic}>
                {getIsChecked(ConferenceOnboardingStep.Basic) && (
                  <CheckCircleTwoTone />
                )}
                Basic Info
              </Menu.Item>
              <Menu.Item key={ConferenceOnboardingStep.Details}>
                {getIsChecked(ConferenceOnboardingStep.Details) ? (
                  <CheckCircleTwoTone />
                ) : (
                  <CloseCircleTwoTone />
                )}
                Details
              </Menu.Item>
              <Menu.Item key={ConferenceOnboardingStep.Tickets}>
                {getIsChecked(ConferenceOnboardingStep.Tickets) ? (
                  <CheckCircleTwoTone />
                ) : (
                  <CloseCircleTwoTone />
                )}
                Tickets
              </Menu.Item>
              <Menu.Item key="dashboard">Dashboard</Menu.Item>
            </Menu>
          </StyledSider>
          <StyledContent>{children}</StyledContent>
        </LayoutWrapper>
      </StyledContent>
    </StyledLayout>
  );
};

const StyledLayout = styled(LayoutWrapper)`
  height: 100%;

  .ant-menu-item {
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .anticon {
    font-size: 18px;
  }

  ul {
    border: none;
  }
`;

const StyledSider = styled(Sider)`
  background-color: #fff;
  border-right: 1px solid #f0f0f0;
`;

const ConferenceShortInfo = styled.div`
  margin-bottom: 25px;
  padding: 15px 10px 0 24px;
  color: #39364f;
`;

const ConferenceTitle = styled.div`
  margin-bottom: 8px;
  font-size: 1.5rem;
`;

const StyledContent = styled(Content)`
  height: calc(100vh - 62px);
`;

export default Layout;
