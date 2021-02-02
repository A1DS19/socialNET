import 'cropperjs/dist/cropper.css';
import React, { useRef } from 'react';
import Cropper from 'react-cropper';

interface PhotoCropperProps {
  setImage: React.Dispatch<React.SetStateAction<null>>;
  imagePreview: any;
}

export const PhotoCropper = ({ setImage, imagePreview }: PhotoCropperProps) => {
  const cropperRef = useRef<HTMLImageElement>(null);

  const cropImage = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    if (typeof cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    cropper.getCroppedCanvas().toBlob((blob: any) => {
      setImage(blob);
    }, 'image/jpeg');
  };

  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      // Cropper.js options
      initialAspectRatio={1}
      preview='.img-preview'
      guides={false}
      viewMode={1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
};
