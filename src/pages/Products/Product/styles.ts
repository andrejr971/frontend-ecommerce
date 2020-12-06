import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 20px auto 0;
  padding: 10px;

  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 10px;

  @media (max-width: 1090px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Description = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 10px;

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ContentDescription = styled.div`
  h1 {
    font-size: 25px;
    margin-bottom: 10px;
  }

  p {
    text-align: justify;

    a {
      margin-left: 5px;
      color: inherit;
    }
  }
`;

export const Images = styled.div`
  width: 100%;
`;

export const AsideRigth = styled.aside`
  width: 100%;

  display: flex;
  flex-direction: column;

  header {
    color: var(--red);

    strong {
      font-size: 20px;
      display: flex;
      align-items: center;

      svg {
        flex-shrink: 0;
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
`;

export const Prices = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  strong {
    font-size: 25px;

    & + strong {
      font-size: 17px;
    }
  }

  p {
    margin-top: 10px;
    text-align: justify;
    font-size: 15px;

    span {
      margin-left: 5px;
    }

    strong {
      font-size: 17px;
      margin: 0 5px;
    }
  }
`;

export const PriceReplace = styled.strong`
  text-decoration: line-through;
  opacity: 0.6;
  font-size: 13px;
`;

export const ContentAside = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    li {
      & + li {
        margin-left: 10px;
      }

      a {
        display: flex;

        width: 70px;
        height: 70px;
        border-radius: 20px;
        border: 2px solid transparent;

        img {
          border-radius: 20px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        &.selected {
          border: 2px solid var(--gray-dark);
        }
      }
    }
  }
`;

export const ContentSizes = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    li {
      & + li {
        margin-left: 5px;
      }

      button {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--white);
        border: 2px solid transparent;

        &.active {
          border-color: var(--gray-dark);
        }

        &:disabled {
          /* opacity: 0.99; */
          cursor: no-drop;
        }
      }
    }
  }
`;

export const ButtonBuy = styled.button`
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

  svg {
    margin-left: 10px;
    font-size: 20px;
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const DescriptionProduct = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 20px auto 0;
  padding: 14px 16px;
  border-radius: 20px;

  background: var(--white);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    text-align: justify;
    line-height: 24px;
  }

  ul {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    li {
      strong {
        margin: 0 5px 0 10px;
      }
    }
  }
`;

export const Comments = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 20px auto 0;
  padding: 14px 16px;
  border-radius: 20px;

  background: var(--white);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  form {
    display: flex;
    align-items: center;

    width: 100%;
    max-width: 600px;
    margin: 10px auto;

    button {
      margin-left: 10px;
    }
  }
`;
