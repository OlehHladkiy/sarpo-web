import { Form } from 'antd';
import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ConferenceTickets from '../components/ConferenceTickets';
import ConferenceFormModal from '../modals/ConferenceFormModal';
import { updateConference } from '../ConferenceActions';
import { appendNewStep } from '../utils/conference-helpers';
import {
  getConferenceOnboardedSteps,
  getConferenceTickets,
} from '../ConferenceReducer';

interface ConferenceTicketsContainerProps {
  initialTickets: Record<string, any>[];
}

const ConferenceTicketsContainer: React.FunctionComponent<ConferenceTicketsContainerProps> = ({
  initialTickets,
}: ConferenceTicketsContainerProps) => {
  const { conferenceId, onboardingStep } = useParams();

  const [form] = Form.useForm();
  const [isVisibleCreateMode, setIsVisibleCreateModel] = useState(false);
  const [tickets, setTickets]: any = useState([]);
  const [ticketUpdatingId, setTicketUpdatingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const onboardedSteps = useSelector((state: any) =>
    getConferenceOnboardedSteps(state, conferenceId),
  );
  const currentTickets = useSelector((state: any) =>
    getConferenceTickets(state, conferenceId),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (Boolean(initialTickets)) {
      setTickets(initialTickets);
    }
  }, [initialTickets]);

  const onFinish = async (values: Record<string, any>): Promise<void> => {
    setLoading(true);

    if (Boolean(ticketUpdatingId)) {
      dispatch(
        updateConference({
          conferenceId,
          tickets: currentTickets.map((ticket: Record<string, any>) =>
            ticket._id === ticketUpdatingId
              ? R.mergeRight(R.omit(['participants'], ticket), values)
              : ticket,
          ),
        }),
      );
    } else {
      await dispatch(
        updateConference({
          conferenceId,
          onboardedSteps: appendNewStep(onboardingStep, onboardedSteps),
          tickets: [...currentTickets, values],
        }),
      );
    }

    setLoading(false);
    setIsVisibleCreateModel(false);
  };

  const onEditTicket = (ticket: any): void => {
    form.setFieldsValue(
      R.pick(
        ['title', 'quantity', 'type', 'minQuantity', 'maxQuantity', 'price'],
        ticket,
      ),
    );

    setTicketUpdatingId(ticket._id);
    setIsVisibleCreateModel(true);
  };

  return (
    <>
      <ConferenceFormModal
        loading={loading}
        onFinish={onFinish}
        form={form}
        isVisible={isVisibleCreateMode}
        onCancel={(): void => setIsVisibleCreateModel(false)}
      />
      <ConferenceTickets
        tickets={tickets}
        onEditTicket={onEditTicket}
        onCreateTicket={(): void => setIsVisibleCreateModel(true)}
      />
    </>
  );
};

export default ConferenceTicketsContainer;
