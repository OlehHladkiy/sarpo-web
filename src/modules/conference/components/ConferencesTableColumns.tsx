import { Avatar } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

import { getConferenceDate } from '../utils/conference-helpers';

const TitleWrapper = styled(Link)`
  display: flex;
`;

const DateWrapper = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div:first-child {
    color: #d1410c;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  div:last-child {
    color: #6f7287;
    font-size: 1.125rem;
  }
`;

const IconWrapper = styled.div`
  margin-right: 20px;
`;

const AvatarIcon = styled(Avatar)`
  margin-top: 12px;
  background-color: #eff2f5;
  color: #adb0b6;
`;

const ConferenceDescription = styled.div`
  div:first-child {
    margin-bottom: 5px;
    font-size: 0.875rem;
    color: #1e0a3c;
    font-weight: 400;
  }

  div:nth-child(2),
  div:last-child {
    margin-bottom: 2px;
    color: #6f7287;
    font-size: 0.75rem;
  }
`;

interface TitleRenderProps {
  record: Record<string, any>;
}

const TitleRender: React.FunctionComponent<TitleRenderProps> = ({
  record,
}: TitleRenderProps) => (
  <TitleWrapper to={`/conference/${record._id}/details`}>
    <DateWrapper>
      <div>{moment(record.startDate).format('MMM')}</div>
      <div>{moment(record.startDate).format('D')}</div>
    </DateWrapper>
    <IconWrapper>
      <AvatarIcon size={40} shape="square" icon={<PictureOutlined />} />
    </IconWrapper>
    <ConferenceDescription>
      <div>{record.title}</div>
      <div>{record.address}</div>
      <div>{getConferenceDate(record.startDate, record.startTime)}</div>
    </ConferenceDescription>
  </TitleWrapper>
);

export { TitleRender };
