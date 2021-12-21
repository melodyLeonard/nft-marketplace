import { motion } from 'framer-motion';
import styled from 'styled-components';
import colorsTheme from '../theme/colors.theme';

interface IProps {
  color?: 'white' | 'default' | 'dark' | 'background' | 'primary' | 'black' | 'danger' | 'text';
  weight?: 'light' | 'bold' | 'normal' | 'heavy';
  size?: 'sm' | 'normal' | 'md' | 'large' | 'xl';
  themed?: 'light' | 'dark';
  themeActive?: boolean;
}

const colorMapper: any = {
  white: colorsTheme.dark.text,
  default: '',
  dark: colorsTheme.light.text,
  danger: colorsTheme.light.danger,
  black: '#262426',
  gray: '#7D7980',
  primary: '#081241',
};

const sizeMapper: any = {
  sm: '12',
  normal: '14',
  md: '16',
  large: '20',
  xl: '30',
};

const bgSizeMapper: any = {
  sm: '30',
  normal: '40',
  md: '48',
  large: '55',
  xl: '60',
};

const weightMapper: any = {
  light: 300,
  normal: 400,
  bold: 700,
  heavy: 900,
};

export const H1 = styled(motion.h1)<IProps>`
  font-size: 60px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  color: ${({ themed = 'light', themeActive = true, color = 'default' }) =>
    themeActive ? colorsTheme[themed][color] : colorMapper[color]};
  font-weight: ${({ weight = 'heavy' }) => weightMapper[weight]};
`;

export const H2 = styled(motion.h2)<IProps>`
  color: ${({ themed = 'light', themeActive = true, color = 'default' }) =>
    themeActive ? colorsTheme[themed][color] : colorMapper[color]};
  font-family: 'Montserrat', sans-serif;
  font-weight: ${({ weight = 'heavy' }) => weightMapper[weight]};
`;

export const H3 = styled(motion.h3)<IProps>`
  color: ${({ themed = 'light', themeActive = true, color = 'default' }) =>
    themeActive ? colorsTheme[themed][color] : colorMapper[color]};
  font-weight: ${({ weight = 'bold' }) => weightMapper[weight]};
  letter-spacing: -1px;
  font-family: 'Montserrat', sans-serif;
`;

export const H4 = styled(motion.h4)<IProps>`
  color: ${({ themed = 'light', themeActive = true, color = 'default' }) =>
    themeActive ? colorsTheme[themed][color] : colorMapper[color]};
  font-weight: ${({ weight = 'bold' }) => weightMapper[weight]};
  font-family: 'Montserrat', sans-serif;
`;

export const Paragraph = styled(motion.p)<IProps>`
  color: ${({ themed = 'light', themeActive = true, color = 'default' }) =>
    themeActive ? colorsTheme[themed][color] : colorMapper[color]};
  font-weight: ${({ weight = 'normal' }) => weightMapper[weight]};
  font-size: ${({ size = 'normal' }) => sizeMapper[size]}px;
  line-height: 21px;
  letter-spacing: 1.5px;
  font-family: 'Montserrat', sans-serif;
`;

export const Lead = styled(Paragraph)<IProps>`
  color: ${({ themed = 'light', themeActive = true, color = 'default' }) =>
    themeActive ? colorsTheme[themed][color] : colorMapper[color]};
  font-weight: ${({ weight = 'bold' }) => weightMapper[weight]};
  font-size: ${({ size = 'large' }) => sizeMapper[size]}px;
  line-height: 32px;
  letter-spacing: 0.01em;
  font-family: 'Montserrat', sans-serif;
`;

export const Header = styled(H1)<IProps>`
  font-weight: ${({ weight = 'bold' }) => weightMapper[weight]};
  color: ${({ themed = 'light', themeActive = true, color = 'default' }) =>
    themeActive ? colorsTheme[themed][color] : colorMapper[color]};
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  line-height: 40px;
  font-size: ${({ size = 'normal' }) => bgSizeMapper[size]}px;
  @media (max-width: 900px) {
    font-size: 30px !important;
    line-height: 50px;
  }
  @media (min-width: 1200px) {
    font-size: ${({ size = 'normal' }) => bgSizeMapper[size]}px;
    line-height: 76px;
  }
`;
