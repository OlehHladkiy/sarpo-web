import { Table } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { TitleRender } from './ConferencesTableColumns';

const columns = [
  {
    title: 'Conference',
    dataIndex: 'conference',
    key: 'conference',
    // eslint-disable-next-line react/display-name
    render: (_: any, record: Record<string, any>): any => (
      <TitleRender record={record} />
    ),
  },
  {
    title: 'Sold',
    dataIndex: 'sold',
    key: 'sold',
    // eslint-disable-next-line react/display-name
    render: (): any => <div>0 / 0</div>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    // eslint-disable-next-line react/display-name
    render: (): any => <div>draft</div>,
  },
];

interface ConferencesTableProps {
  conferences: any[];
}

const ConferencesTable: React.FunctionComponent<ConferencesTableProps> = ({
  conferences,
}: ConferencesTableProps) => {
  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={conferences}
        rowKey={(conference: Record<string, any>): string => conference._id}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 25px;
`;

export default ConferencesTable;
