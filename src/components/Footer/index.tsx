import React from 'react';

import { Container } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <p>
        © DRESHOP 2020 - Todos os direitos reservados. Eventuais promoções,
        descontos e prazos de pagamento expostos aqui são válidos apenas para
        compras via internet ou telefone.
      </p>
      <div>
        Design e Desenvolvimento por
        <a href="https://andrejr.dev" target="blank">
          André Junior
        </a>
      </div>
    </Container>
  );
};

export default Footer;
