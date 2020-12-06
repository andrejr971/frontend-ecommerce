import styled from 'styled-components';

export const Container = styled.footer`
  clear: both;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: var(--white);
  padding: 14px 16px;
  width: 100%;

  p {
    width: 100%;
    max-width: 500px;
    font-size: 13px;
    text-align: center;
  }

  div {
    margin-top: 10px;

    font-size: 15px;

    a {
      margin-left: 5px;
      text-decoration: none;
      font-weight: bold;
      color: inherit;
    }
  }
`;
