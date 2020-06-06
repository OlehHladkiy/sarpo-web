import { Badge } from 'antd';
import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  div > span {
    font-size: 14px;
  }
`;

const TicketTitle = styled.div`
  color: #4b4d63;
  font-size: 1.125rem;
`;

interface TitleRenderProps {
  record: Record<string, any>;
}

const TitleRender: React.FunctionComponent<TitleRenderProps> = ({
  record,
}: TitleRenderProps) => (
  <TitleWrapper>
    <TicketTitle>{record.title}</TicketTitle>
    <div>
      <Badge status="processing" />
      <span>On sale</span>
    </div>
  </TitleWrapper>
);

export { TitleRender };
