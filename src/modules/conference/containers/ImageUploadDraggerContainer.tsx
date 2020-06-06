/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosRequestConfig } from 'axios';
import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import AppConfig from '@config/AppConfig';

import ImageUploadDragger from '../components/ImageUploadDragger';

interface ImageUploadDraggerContainerProps {
  value?: Record<string, any>;
  onChange?: (values: Record<string, any>) => void;
}

const ImageUploadDraggerContainer: React.FunctionComponent<ImageUploadDraggerContainerProps> = ({
  value,
  onChange,
}: ImageUploadDraggerContainerProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (Boolean(value)) {
      setUrl(value.url);
      setId(value.id);
    }
  }, [value]);

  const onDrop = async (files: any): Promise<void> => {
    setIsUploading(true);

    const formData = new FormData();
    const config: AxiosRequestConfig = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    formData.append('file', files[0]);

    const res = await axios.post(
      `${AppConfig.apiUrl}/file/upload`,
      formData,
      config,
    );
    const { url, public_id: id } = R.propOr({}, 'data', res);

    if (Boolean(url)) {
      setUrl(url);

      if (onChange) {
        onChange({ url, id });
      }
    }

    setIsUploading(false);
  };

  const onRemove = async (): Promise<void> => {
    const res = await axios.delete(`${AppConfig.apiUrl}/file/destroy/${id}`);

    if (res.status === 200) {
      setUrl('');
      setId('');

      if (onChange) {
        onChange({ url: '', id: '' });
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <ImageUploadDragger
      isUploading={isUploading}
      url={url}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      onRemove={onRemove}
    />
  );
};

export default ImageUploadDraggerContainer;
