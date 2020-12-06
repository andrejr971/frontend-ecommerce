import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 10px;

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ListImages = styled.ul`
  width: 100%;

  @media (max-width: 750px) {
    display: none;
  }

  li {
    & + li {
      margin-top: 5px;
    }

    button {
      width: 70px;
      height: 70px;
      border: 2px solid transparent;
      border-radius: 20px;

      transition: border-color 0.2s;

      &.active,
      &:hover {
        border-color: var(--orange-dark);
      }

      img {
        border-radius: 20px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export const ListImagesMobile = styled.ul`
  width: 100%;

  @media (min-width: 750px) {
    display: none;
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  li {
    & + li {
      margin-top: 5px;
    }

    button {
      width: 70px;
      height: 70px;
      border: 2px solid transparent;
      border-radius: 20px;

      transition: border-color 0.2s;

      &.active,
      &:hover {
        border-color: var(--orange-dark);
      }

      img {
        border-radius: 20px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export const Image = styled.div`
  width: 100%;
  height: 100%;

  flex-shrink: 0;

  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const Discount = styled.div`
  position: absolute;
  top: 0;
  right: 16px;
  height: 70px;
  background: var(--orange-dark);
  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 5px 5px;

  span {
    font-weight: 500;
    font-size: 18px;
  }
`;
