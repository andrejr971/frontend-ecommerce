import React, { useCallback, useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import {
  Container,
  GroupButtons,
  BackgroundBanner,
  ButtonCenter,
} from './styles';

import slide01 from '../../assets/slide/slide01.jpg';
import slide02 from '../../assets/slide/slide02.jpg';
import slide03 from '../../assets/slide/slide03.jpg';

const slides = [
  {
    id: 1,
    path: slide01,
  },
  {
    id: 2,
    path: slide02,
  },
  {
    id: 3,
    path: slide03,
  },
];

const Slide: React.FC = () => {
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const [transitions, setTransitions] = useState(true);
  const [indexes, setIndexes] = useState({
    prev: 2,
    next: 1,
  });

  const handleSelectedSlide = useCallback(
    (id: number) => {
      const findSlide = slides.find(slide => slide.id === id);

      if (!findSlide) return;

      setTransitions(!transitions);

      setSelectedSlide(findSlide);
    },
    [transitions],
  );

  useEffect(() => {
    let index = selectedSlide.id + 1;
    let prev = selectedSlide.id - 1;

    if (index > slides[2].id) {
      index = 1;
    }

    if (prev === 0) {
      prev = 3;
    }

    setIndexes({
      prev,
      next: index,
    });

    const timer = setTimeout(() => {
      handleSelectedSlide(index);
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedSlide, handleSelectedSlide]);

  return (
    <Container>
      <GroupButtons>
        {slides.map(slide => (
          <button
            type="button"
            key={slide.id}
            className={selectedSlide.id === slide.id ? 'active' : ''}
            onClick={() => handleSelectedSlide(slide.id)}
          />
        ))}
      </GroupButtons>

      <ButtonCenter>
        <button type="button" onClick={() => handleSelectedSlide(indexes.prev)}>
          <BsArrowLeft />
        </button>
        <button type="button" onClick={() => handleSelectedSlide(indexes.next)}>
          <BsArrowRight />
        </button>
      </ButtonCenter>
      <BackgroundBanner transitions={transitions}>
        {slides.map(slide => (
          <img
            key={slide.id}
            src={slide.path}
            alt="slide"
            className={selectedSlide.id === slide.id ? 'active' : ''}
          />
        ))}
      </BackgroundBanner>
    </Container>
  );
};

export default Slide;
