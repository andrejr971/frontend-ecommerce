import styled from 'styled-components';

export const Container = styled.li`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 0;
  position: relative;

  p {
    text-align: justify;
    margin: 10px 0;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      opacity: 0.7;
      font-size: 15px;
    }

    img {
      width: 36px;
      height: 36px;
      object-fit: cover;
      border-radius: 10px;

      border: 2px solid var(--gray-dark);

      margin-right: 10px;
    }
  }
`;

export const ButtonDelete = styled.button`
  position: absolute;
  top: 14px;
  right: 16px;
`;
