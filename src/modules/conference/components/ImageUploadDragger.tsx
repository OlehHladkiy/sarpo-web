import { Spin } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';

import React from 'react';
import styled from 'styled-components';

interface ImageUploadDraggerProps {
  isUploading: boolean;
  url: string;
  getRootProps: any;
  getInputProps: any;
  onRemove: () => void;
}

const ImageUploadDragger: React.FunctionComponent<ImageUploadDraggerProps> = ({
  isUploading,
  url,
  getRootProps,
  getInputProps,
  onRemove,
}: ImageUploadDraggerProps) => (
  <Spin tip="Uploading..." spinning={isUploading}>
    {Boolean(url) ? (
      <ImageWrapper>
        <img src={url} />
        <RemoveButton className="remove-btn" onClick={(): void => onRemove()} />
      </ImageWrapper>
    ) : (
      <UploadWrapper {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          <InboxOutlined className="upload-icon" />
        </p>
        <h3>Click or drag file to this area to upload</h3>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </UploadWrapper>
    )}
  </Spin>
);

const ImageWrapper = styled.div`
  border: 1px solid #d9d9d9;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .remove-btn {
    visibility: hidden;
  }

  &:hover {
    &::before {
      position: absolute;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      content: ' ';
    }

    .remove-btn {
      visibility: visible;
    }
  }
`;

const RemoveButton = styled(DeleteOutlined)`
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px !important;
  color: #fff;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const UploadWrapper = styled.div`
  height: 350px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  background: #fafafa;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: #40a9ff;
  }

  .upload-icon {
    color: #40a9ff;
    font-size: 40px;
  }
`;

export default ImageUploadDragger;
