import React from 'react';
import styled from 'styled-components';
import { Paragraph } from '../../helpers/Typography';
import { useTheme } from '../../hooks/useTheme';
import colorsTheme from '../../theme/colors.theme';

const Footer = () => {
  const [theme] = useTheme();

  return (
    <FooterWrapper theme={theme}>
      <Paragraph color="text" themed={theme}>
        <a
          href="https://www.youtube.com/channel/UC8fWqQDSvqS9aPpXBxwdRsA"
          target="_blank"
          rel="noopener noreferrer"
        >
          &#169; lazyDevelopers
        </a>
      </Paragraph>
    </FooterWrapper>
  );
};

export default Footer;

const backgroundMapper: any = {
  light: colorsTheme.light.background,
  dark: colorsTheme.dark.background,
};

const FooterWrapper = styled.footer`
  display: flex;
  flex: 1;
  padding: 1rem 0;
  border-top: 1px solid #dedede !important;
  justify-content: center;
  align-items: center;
  background: ${({ theme = 'dark' }) => backgroundMapper[theme]};
`;
