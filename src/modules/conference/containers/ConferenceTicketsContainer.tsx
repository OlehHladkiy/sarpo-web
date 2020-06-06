/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form } from 'antd';
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
  const [isUpdating, setIsUpdating] = useState(false);
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
    setIsUpdating(true);

    await dispatch(
      updateConference({
        conferenceId,
        onboardedSteps: appendNewStep(onboardingStep, onboardedSteps),
        tickets: [...currentTickets, values],
      }),
    );

    setIsUpdating(false);
    setIsVisibleCreateModel(false);
  };

  return (
    <>
      <ConferenceFormModal
        loading={isUpdating}
        onFinish={onFinish}
        form={form}
        isVisible={isVisibleCreateMode}
        onCancel={(): void => setIsVisibleCreateModel(false)}
      />
      <ConferenceTickets
        tickets={tickets}
        onEditTicket={(): void => setIsVisibleCreateModel(true)}
        onCreateTicket={(): void => setIsVisibleCreateModel(true)}
      />
    </>
  );
};

export default ConferenceTicketsContainer;
