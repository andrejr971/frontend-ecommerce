import styled from 'styled-components';

export const Container = styled.li`
  width: 100%;

  display: flex;
  flex-direction: column;
  position: relative;

  & + li {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

export const DescriptionItem = styled.div`
  display: flex;
  align-items: flex-start;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  ul {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    li {
      h4 {
        font-size: 20px;
        color: inherit;
      }

      strong {
        opacity: 0.9;
        margin-top: 10px;
        font-size: 15px;

        span {
          margin-left: 5px;
        }
      }
    }
  }
`;

export const FooterItem = styled.footer`
  margin-top: 10px;
  padding: 10px 10px 0;
  border-top: 1px solid var(--orange-dark);

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;

  strong {
    font-size: 15px;
    margin-right: 20px;
  }

  button {
    width: 36px;
    height: 36px;

    background: var(--orange-dark);
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

    &:disabled {
      cursor: no-drop;
    }
  }

  span {
    width: 50px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    border-radius: 10px;

    border: 2px solid rgba(0, 0, 0, 0.2);
  }
`;

export const PriceItem = styled.div`
  display: flex;
  align-items: center;

  strong + strong {
    margin-left: 5px;
    font-size: 20px;
  }

  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const PriceReplace = styled.strong`
  text-decoration: line-through;
  opacity: 0.6;
  font-size: 13px;
`;

export const ButtonDelete = styled.button`
  position: absolute;
  top: 14px;
  right: 16px;
`;
