import { Button } from 'antd';
import {
  UploadOutlined,
  PaperClipOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

import { downloadFile } from '../helpers/conference-helpers';

interface FilesUploadProps {
  files: Record<string, any>[];
  getInputProps: any;
  getRootProps: any;
  onDelete: (id: string) => void;
}

const FilesUpload: React.FunctionComponent<FilesUploadProps> = ({
  files,
  getInputProps,
  getRootProps,
  onDelete,
}: FilesUploadProps) => (
  <>
    <FilesWrapper>
      {files.map((file: Record<string, any>) => (
        <FileWrapper key={file.id}>
          <PaperClipOutlined />
          <a
            className="name"
            target="blank"
            rel="noopener noreferrer"
            onClick={(): void => downloadFile(file)}
          >
            {file.friendlyName}
          </a>
          <ButtonWrapper onClick={(): void => onDelete(file.id)}>
            <DeleteOutlined className="clicked" />
          </ButtonWrapper>
        </FileWrapper>
      ))}
    </FilesWrapper>
    <Button {...getRootProps()}>
      <UploadOutlined /> Upload
      <input {...getInputProps()} />
    </Button>
  </>
);

const FilesWrapper = styled.div`
  margin-bottom: 10px;
`;

const FileWrapper = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  min-width: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .name {
    margin-left: 10px;
  }

  .anticon {
    font-size: 14px;
  }

  .clicked {
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
`;

export default FilesUpload;
