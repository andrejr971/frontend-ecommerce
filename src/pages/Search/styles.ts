import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 20px auto;
  padding: 10px;

  h1 {
    text-align: center;
    font-size: 30px;
    padding: 10px;
  }

  header {
    width: 100%;
    max-width: 400px;
    margin: 20px auto;

    div {
      width: 100%;
      height: 52px;
      padding: 14px 16px;
      border: 2px solid var(--orange-dark);
      background: var(--white);
      border-radius: 20px;
      display: flex;
      align-items: center;

      color: var(--primary);

      svg {
        margin-right: 10px;
        opacity: 0.5;
      }

      & + div {
        margin-top: 10px;
      }

      input {
        flex: 1;
        background: transparent;
        border: 0;

        color: var(--primary);
      }
    }
  }
`;

export const Main = styled.main`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
`;
