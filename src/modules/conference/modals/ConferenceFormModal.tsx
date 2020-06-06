import { Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import styled from 'styled-components';

import CreateOrEditTicketForm from '../forms/CreateOrEditTicketForm';

interface ConferenceFormModalProps {
  loading: boolean;
  form: FormInstance;
  isVisible: boolean;
  onFinish: (data: any) => void;
  onCancel: () => void;
}

const ConferenceFormModal: React.FunctionComponent<ConferenceFormModalProps> = ({
  loading,
  form,
  isVisible,
  onFinish,
  onCancel,
}: ConferenceFormModalProps) => (
  <ModalWrapper
    visible={isVisible}
    onCancel={onCancel}
    okText="Create"
    title="Create new ticket set"
    width={410}
  >
    <CreateOrEditTicketForm loading={loading} form={form} onFinish={onFinish} />
  </ModalWrapper>
);

const ModalWrapper = styled(Modal)`
  input {
    height: 45px;
  }

  .ant-modal-footer {
    display: none;
  }
`;

export default ConferenceFormModal;
