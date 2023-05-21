import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleDrop = (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
    };
  
    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('file', selectedImage);
  
        const response = await axios.post('/graphql', {
          query: `
            mutation ($file: Upload!) {
              uploadImage(file: $file) {
                filename
                mimetype
                encoding
              }
            }
          `,
          variables: {
            file: selectedImage,
          },
        });
  
        const { filename, mimetype, encoding } = response.data.data.uploadImage;
        // Handle successful upload
        console.log('Image uploaded successfully!', filename, mimetype, encoding);
      } catch (error) {
        // Handle error
        console.error('Error uploading image:', error);
      }
    };
  
    return (
      <div>
        <Dropzone onDrop={handleDrop} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop an image here, or click to select an image.</p>
            </div>
          )}
        </Dropzone>
        {selectedImage && (
          <div>
            <p>Selected Image:</p>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" width="200" />
          </div>
        )}
        <button onClick={handleUpload} disabled={!selectedImage}>
          Upload
        </button>
      </div>
    );
  };

  export default ImageUpload;