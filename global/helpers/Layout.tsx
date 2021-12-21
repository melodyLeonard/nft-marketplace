import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Flex: any = styled(motion.div)``;

Flex.Row = styled(motion.div)`
  display: flex;
  flex-direction: ${({ flexType = 'row' }: { flexType: 'row' | 'row-reverse' }) => flexType};
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

Flex.Column = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
