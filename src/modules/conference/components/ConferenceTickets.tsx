import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

import ConferenceTicketsTable from './ConferenceTicketsTable';

interface ConferenceTicketsProps {
  tickets: Record<string, any>[];
  onCreateTicket: () => void;
  onEditTicket: () => void;
}

const ConferenceTickets: React.FunctionComponent<ConferenceTicketsProps> = ({
  tickets,
  onCreateTicket,
  onEditTicket,
}: ConferenceTicketsProps) => (
  <Wrapper>
    <h2>Tickets</h2>
    <ButtonWrapper>
      <Button type="primary" onClick={(): void => onCreateTicket()}>
        Create Ticket
      </Button>
    </ButtonWrapper>
    <ConferenceTicketsTable tickets={tickets} onEditTicket={onEditTicket} />
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 20px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default ConferenceTickets;
