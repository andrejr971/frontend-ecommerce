import { keyframes } from 'styled-components';

const appearFromBottom = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
`;

export default appearFromBottom;
