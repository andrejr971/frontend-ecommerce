import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100vh;
  padding: 10px;
  margin: 20px auto;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
  }
`;

export const ItemsCart = styled.div`
  width: 100%;
  height: auto;
  background: var(--white);
  padding: 14px 16px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  flex: 1;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
`;

export const ResumeCart = styled.div`
  width: 100%;
  max-width: 400px;

  height: auto;
  background: var(--white);
  padding: 14px 16px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  display: flex;
  flex-direction: column;

  ul {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;

      strong {
        span {
          margin-left: 5px;
          font-size: 15px;
          opacity: 0.8;
        }
      }

      & + li {
        border-top: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
  }

  button {
    margin-top: 20px;
    width: 100%;

    background: var(--orange);
    padding: 14px;
    border-radius: 20px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    transition: opacity 0.2s ease-in-out, transform 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 900px) {
    max-width: 100%;
    margin-top: 20px;
  }
`;
