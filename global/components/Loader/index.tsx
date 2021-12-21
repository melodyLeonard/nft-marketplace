import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import colorsTheme from '../../theme/colors.theme';
import styles from '../../../styles/components/loader.module.css';

const Loader = () => {
  const [theme] = useTheme();

  return (
    <LoaderWrapper className={styles.loader}>
      <LoaderItem theme={theme} />
      <LoaderItem theme={theme} />
      <LoaderItem theme={theme} />
    </LoaderWrapper>
  );
};

export default Loader;

const backgroundMapper: any = {
  light: colorsTheme.light.danger,
  dark: colorsTheme.dark.danger,
};

const LoaderWrapper = styled.div``;

const LoaderItem = styled.div`
  background: ${({ theme = 'light' }: { theme: 'light' | 'dark' }) =>
    backgroundMapper[theme]} !important;
`;
