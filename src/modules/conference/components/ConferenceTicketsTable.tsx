import { Table, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

import { TitleRender } from './ConferencesTicketsTableColumns';

const columns = ({ onEditTicket }: any): Record<string, any>[] => [
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
    render: (_: any, record: Record<string, any>): any => (
      <div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={(): void => onEditTicket(record)}>
                Edit
              </Menu.Item>
              <Menu.Item>Delete</Menu.Item>
            </Menu>
          }
        >
          <MoreOutlined className="more-icon" />
        </Dropdown>
      </div>
    ),
  },
];

interface ConferenceTicketsTableProps {
  tickets: any[];
  onEditTicket: (ticketData: any) => void;
}

const ConferenceTicketsTable: React.FunctionComponent<ConferenceTicketsTableProps> = ({
  tickets,
  ...columnsProps
}: ConferenceTicketsTableProps) => (
  <Wrapper>
    <Table
      showHeader={false}
      columns={columns(columnsProps)}
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
