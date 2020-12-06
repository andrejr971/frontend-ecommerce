import styled from 'styled-components';
import appearFromLeft from '../../utils/appearFromLeft';

interface TransitionProps {
  transitions: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 550px;

  position: relative;
`;

export const BackgroundBanner = styled.div<TransitionProps>`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    display: none;

    &.active {
      display: flex;
    }

    animation: ${appearFromLeft} 0.3s;
  }
`;

export const Background = styled.div`
  background: linear-gradient(
    180deg,
    rgba(213, 213, 213, 0.3) 0%,
    rgba(213, 213, 213, 0) 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const GroupButtons = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  z-index: 80;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    width: 20px;
    height: 7px;
    border-radius: 5px;
    border: 0;
    background: var(--white);

    & + button {
      margin-left: 5px;
    }

    transition: all 0.2s;

    &.active {
      background: var(--orange-dark);
      width: 30px;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ButtonCenter = styled.div`
  position: absolute;

  width: 100%;
  height: 50px;
  padding: 10px;

  top: 50%;
  left: 0;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 30px;
    border-radius: 15px;
    border: 2px solid var(--orange-dark);
    background: transparent;
    opacity: 0.8;

    transition: opacity 0.2s;

    svg {
      font-size: 25px;
      color: var(--orange-dark);
    }

    &:hover {
      opacity: 1;
    }
  }
`;
