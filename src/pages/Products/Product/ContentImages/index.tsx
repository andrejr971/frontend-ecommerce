import React, { useCallback, useEffect, useState } from 'react';

import {
  Container,
  ListImages,
  Image,
  ListImagesMobile,
  Discount,
} from './styles';

interface IImage {
  id: number;
  image_url: string;
  path: string;
}

interface ContentImagesProps {
  images: IImage[];
  discount?: number;
}

const ContentImages: React.FC<ContentImagesProps> = ({ images, discount }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  const handleImage = useCallback(
    (id: number) => {
      const findImage = images.find(image => image.id === id);

      if (!findImage) return;

      setSelectedImage(findImage);
    },
    [images],
  );

  return (
    <Container>
      <ListImages>
        {images.map(image => (
          <li key={image.id}>
            <button
              type="button"
              className={selectedImage.id === image.id ? 'active' : ''}
              onClick={() => handleImage(image.id)}
            >
              <img src={image.image_url} alt={image.path} />
            </button>
          </li>
        ))}
      </ListImages>

      <Image>
        <img src={selectedImage.image_url} alt={selectedImage.path} />

        {discount && (
          <Discount>
            <span>{`-${Number(discount)}%`}</span>
          </Discount>
        )}
      </Image>

      <ListImagesMobile>
        {images.map(image => (
          <li key={image.id}>
            <button
              type="button"
              className={selectedImage.id === image.id ? 'active' : ''}
              onClick={() => handleImage(image.id)}
            >
              <img src={image.image_url} alt={image.path} />
            </button>
          </li>
        ))}
      </ListImagesMobile>
    </Container>
  );
};

export default ContentImages;
