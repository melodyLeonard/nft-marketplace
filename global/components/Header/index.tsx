import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Lead, Paragraph } from '../../helpers/Typography';
import { useTheme } from '../../hooks/useTheme';
import colorsTheme from '../../theme/colors.theme';
import { Flex } from '../../helpers/Layout';
import Switch from 'react-switch';
import { MdDarkMode } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';

const TopBar = () => {
  const [theme, setTheme] = useTheme();

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <HeaderContainer theme={theme}>
      <Lead color="danger" themed={theme}>
        NFT Marketplace
      </Lead>
      <Flex.Row>
        <Link href="/">
          <a>
            <Paragraph themeActive={false} color="white" themed={theme}>
              Home
            </Paragraph>
          </a>
        </Link>
        <Link href="/create_nft">
          <a>
            <Paragraph themeActive={false} color="white" themed={theme}>
              Sell NFTs
            </Paragraph>
          </a>
        </Link>
        <Link href="/creator-dashboard">
          <a>
            <Paragraph themeActive={false} color="white" themed={theme}>
              Dasboard
            </Paragraph>
          </a>
        </Link>
        <Switch
          onColor={colorsTheme.light.background}
          offColor={colorsTheme.dark.background}
          uncheckedIcon={<MdDarkMode size={'100%'} color={colorsTheme[theme].background} />}
          checkedIcon={<BsFillSunFill size={'100%'} color={'#f5980c'} />}
          onChange={() => handleTheme()}
          checked={theme === 'dark'}
        />
      </Flex.Row>
    </HeaderContainer>
  );
};

export default TopBar;

const backgroundMapper: any = {
  light: colorsTheme.light.headerBackground,
  dark: colorsTheme.dark.headerBackground,
};

const HeaderContainer = styled.nav`
  position: sticky !important;
  background-color: ${({ theme = 'light' }) => backgroundMapper[theme]} !important;
  border-bottom: 1px solid #dedede;
  padding: 1% 4%;
`;
