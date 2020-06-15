import { Form } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

import FormLayout from '../components/FormLayout';
import FilesUploadContainer from '../containers/FilesUploadContainer';

const ConferenceFilesForm: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <FormLayout
      title={t('Files Title')}
      description={t('Files Desc')}
      icon={<FileOutlined />}
    >
      <Form.Item name="files">
        <FilesUploadContainer />
      </Form.Item>
    </FormLayout>
  );
};

export default ConferenceFilesForm;
