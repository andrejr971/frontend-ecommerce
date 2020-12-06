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
`;

export const Main = styled.main`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
`;
