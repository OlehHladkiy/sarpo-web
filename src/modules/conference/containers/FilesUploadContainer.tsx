import axios, { AxiosRequestConfig } from 'axios';
import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import AppConfig from '@config/AppConfig';

import FilesUpload from '../components/FilesUpload';

interface FilesUploadContainerProps {
  value?: any;
  onChange?: (files: any) => void;
}

const FilesUploadContainer: React.FunctionComponent<FilesUploadContainerProps> = ({
  value,
  onChange,
}: FilesUploadContainerProps) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (value) {
      setFiles(value);
    }
  }, [value]);

  const onDrop = async (droppedFiles: Record<string, any>[]): Promise<void> => {
    const formData = new FormData();
    const config: AxiosRequestConfig = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const file = R.last(droppedFiles);
    formData.append('file', file);

    const res = await axios.post(
      `${AppConfig.apiUrl}/file/upload`,
      formData,
      config,
    );

    const { url, public_id: id, friendlyName } = R.propOr({}, 'data', res);

    if (Boolean(url)) {
      const updatedFiles = R.append({ url, id, friendlyName }, files);
      setFiles(updatedFiles);

      if (onChange) {
        onChange(updatedFiles);
      }
    }
  };

  const onDelete = async (id: string): Promise<void> => {
    const res = await axios.delete(`${AppConfig.apiUrl}/file/destroy/${id}`);

    if (res.status === 200) {
      const newFiles = files.filter(
        (file: Record<string, any>) => file.id !== id,
      );
      setFiles(newFiles);

      if (onChange) {
        onChange(newFiles);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <FilesUpload
      files={files}
      getInputProps={getInputProps}
      getRootProps={getRootProps}
      onDelete={onDelete}
    />
  );
};

export default FilesUploadContainer;
