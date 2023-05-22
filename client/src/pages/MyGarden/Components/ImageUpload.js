import React from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE } from '../../../utils/mutations';

const ImageUpload = () => {
  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { filePath } = await response.json();
        console.log('File uploaded successfully:', filePath);
        // Handle the response or perform additional actions
      } else {
        console.error('Error uploading file:', response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle the error
    }
  };

  return (
    <div>
      {/* Your dropzone component here */}
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
    </div>
  );
};

export default ImageUpload;