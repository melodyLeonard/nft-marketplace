import { motion } from 'framer-motion';
import styled from 'styled-components';
import colorsTheme from '../theme/colors.theme';

interface IProps {
  color?: 'white' | 'default' | 'dark' | 'background' | 'primary' | 'black' | 'danger' | 'text';
  size?: 'sm' | 'normal' | 'md' | 'large' | 'xl';
  themed?: 'light' | 'dark';
  height?: number;
  width?: number;
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

const widthMapper: any = {
  xsmall: '120px',
  small: '120px',
  middle: '320px',
  large: '100%',
};

const textAreaHeightMapper: any = {
  xsmall: '40px',
  small: '60px',
  middle: '70px',
  large: '100px',
};

const heightMapper: any = {
  xsmall: '40px',
  small: '40px',
  middle: '40px',
  large: '40px',
};

const sizeMapper: any = {
  sm: '10',
  normal: '12',
  md: '12',
  large: '12',
  xl: '16',
};

export const Input = styled(motion.input)<IProps>`
  font-size: ${({ size = 'normal' }) => sizeMapper[size]}px;
  width: ${({ width, size = 'medium' }) => (width ? `${width}px` : widthMapper[size])} !important;
  height: ${({ height, size = 'medium' }) =>
    height ? `${height}px` : heightMapper[size]} !important;

  font-family: 'Montserrat', sans-serif;
  color: ${({ themed = 'light', themeActive = true, color = 'default' }) =>
    themeActive ? colorsTheme[themed][color] : colorMapper[color]};
  border-radius: 5px;
  padding: 10px;
  border: 1px solid ${({ themed = 'light' }) => colorsTheme[themed].shadow};
  background: ${({ themed = 'light' }) => colorsTheme[themed].background};
  &:active,
  &:focus {
    outline: 1px solid ${({ themed = 'light' }) => colorsTheme[themed].shadow};
  }
`;

export const TextArea = styled(motion.textarea)<IProps>`
  font-size: ${({ size = 'normal' }) => sizeMapper[size]}px;
  width: ${({ width, size = 'medium' }) => (width ? `${width}px` : widthMapper[size])} !important;
  height: ${({ height, size = 'medium' }) =>
    height ? `${height}px` : textAreaHeightMapper[size]} !important;

  font-family: 'Montserrat', sans-serif;
  background: ${({ themed = 'light', themeActive = true, color = 'default' }) =>
    themeActive ? colorsTheme[themed][color] : colorMapper[color]};
  border-radius: 5px;
  padding: 10px;
  border: 1px solid ${({ themed = 'light' }) => colorsTheme[themed].shadow};
  background: ${({ themed = 'light' }) => colorsTheme[themed].background};
  &:active,
  &:focus {
    outline: 1px solid ${({ themed = 'light' }) => colorsTheme[themed].shadow};
  }
`;
