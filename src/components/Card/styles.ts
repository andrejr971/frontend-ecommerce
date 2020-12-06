import { Link } from 'react-router-dom';
import styled from 'styled-components';
import appearFromBottom from '../../utils/appearFromBottom';

export const Container = styled(Link)`
  width: 100%;
  /* height: 300px; */
  border-radius: 20px;
  background: #f5f5f5;
  /* border: 2px solid transparent; */
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  color: var(--primary);
  transition: background-color 0.2s ease, transform 0.2s;

  position: relative;

  &:hover {
    background: var(--white);
    /* border-color: var(--orange-dark); */
    /* transform: scale(1.02); */

    .open {
      opacity: 1;
      display: flex;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 14px 16px 0;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export const Title = styled.div`
  border-left: 5px solid var(--orange-dark);
  width: 100%;
  padding-left: 20px;
`;

export const Footer = styled.div`
  width: 100%;
  padding: 14px 16px;

  display: flex;
  flex-direction: column;

  strong + strong {
    margin-top: 5px;
    font-size: 20px;
  }

  p {
    margin-top: 5px;
    font-size: 13px;

    > strong {
      margin: 0 5px;
    }
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

export const ButtonShow = styled.div`
  position: absolute;
  bottom: 14px;
  left: 50px;
  right: 50px;
  /* transform: translateX(50%); */

  width: calc(100% - 100px);
  background: var(--orange);
  padding: 14px;
  border-radius: 20px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

  display: none;
  align-items: center;
  justify-content: center;

  transition: opacity 0.2s ease-in-out, transform 0.2s;

  opacity: 0;

  animation: ${appearFromBottom} 0.2s;

  svg {
    margin-left: 10px;
    font-size: 20px;
    flex-shrink: 0;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const PriceReplace = styled.strong`
  text-decoration: line-through;
  opacity: 0.6;
  font-size: 13px;
`;
