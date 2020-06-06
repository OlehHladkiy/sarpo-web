import { saveAs } from 'file-saver';

/**
 * Download file to local.
 */
export const downloadFile = (fileToUpload: any): void => {
  const req = new XMLHttpRequest();
  const URLToPDF = fileToUpload.url;
  req.open('GET', URLToPDF, true);
  req.responseType = 'blob';
  req.onload = function(): void {
    const file = new Blob([req.response], {
      type: 'application/pdf',
    });
    saveAs(file, fileToUpload.friendlyName);
  };
  req.send();
};
