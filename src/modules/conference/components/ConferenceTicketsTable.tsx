import { Table } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

import { TitleRender } from './ConferencesTicketsTableColumns';

const columns = (onEditTicket: () => void): Record<string, any>[] => [
  {
    dataIndex: 'title',
    key: 'title',
    // eslint-disable-next-line react/display-name
    render: (_: any, record: Record<string, any>): any => (
      <TitleRender record={record} />
    ),
  },
  {
    dataIndex: 'quantity',
    key: 'quantity',
    // eslint-disable-next-line react/display-name
    render: (_: any, record: Record<string, any>): any => (
      <div>
        {record.participants.length} / {record.quantity}
      </div>
    ),
  },
  {
    dataIndex: 'type',
    key: 'type',
    // eslint-disable-next-line react/display-name
    render: (_: any, record: Record<string, any>): any => (
      <div>{record.type}</div>
    ),
  },
  {
    // eslint-disable-next-line react/display-name
    render: (): any => (
      <div onClick={onEditTicket}>
        <MoreOutlined className="more-icon" />
      </div>
    ),
  },
];

interface ConferenceTicketsTableProps {
  tickets: any[];
  onEditTicket: () => void;
}

const ConferenceTicketsTable: React.FunctionComponent<ConferenceTicketsTableProps> = ({
  tickets,
  onEditTicket,
}: ConferenceTicketsTableProps) => (
  <Wrapper>
    <Table
      showHeader={false}
      columns={columns(onEditTicket)}
      dataSource={tickets}
      rowKey={(ticket: Record<string, any>): string => ticket._id}
      pagination={false}
    />
  </Wrapper>
);

const Wrapper = styled.div`
  margin-top: 25px;

  td:last-child {
    width: 20px;
    font-size: 15px;
  }

  .more-icon {
    cursor: pointer;
    font-size: 25px;
  }
`;

export default ConferenceTicketsTable;
