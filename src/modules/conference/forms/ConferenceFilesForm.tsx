import { Form } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import React from 'react';

import FormLayout from '../components/FormLayout';
import FilesUploadContainer from '../containers/FilesUploadContainer';

const ConferenceFilesForm: React.FunctionComponent = () => (
  <FormLayout
    title="Files"
    description="Upload files to display them on preview page"
    icon={<FileOutlined />}
  >
    <Form.Item name="files">
      <FilesUploadContainer />
    </Form.Item>
  </FormLayout>
);

export default ConferenceFilesForm;
