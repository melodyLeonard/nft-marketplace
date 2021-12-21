import styled from 'styled-components';
import { darken } from 'polished';
import colorsTheme from '../theme/colors.theme';

interface IProps {
  size?: 'large' | 'small' | 'middle' | 'xsmall';
  color?: 'primary' | 'secondary' | 'dark' | 'white';
  bold?: boolean;
  themed?: 'light' | 'dark';
  font?: number;
  bordered?: boolean;
  height?: number;
  width?: number;
}

const widthMapper: any = {
  xsmall: '120px',
  small: '120px',
  middle: '320px',
  large: '100%',
};

const heightMapper: any = {
  xsmall: '40px',
  small: '40px',
  middle: '40px',
  large: '40px',
};

const fontMapper: any = {
  xsmall: '14px',
  small: '16px',
  middle: '16px',
  large: '16px',
};

const backgroundColorMapper: any = {
  primary: colorsTheme.light.danger,
  secondary: '#FF6D05',
  dark: '#4B494D',
  white: '#FFFFFF',
};

const colorMapper: any = {
  primary: '#FFFFFF',
  secondary: '#FFFFFF',
  dark: '#FFFFFF',
  white: '#4B494D',
};
export const Button = styled.button<IProps>`
  background: ${({ color = 'primary', themed = 'light', bordered = false }) =>
    bordered
      ? 'none'
      : themed
      ? colorsTheme[themed].danger
      : backgroundColorMapper[color]} !important;
  color: ${({ bordered = false, color = 'primary' }) =>
    bordered ? backgroundColorMapper[color] : colorMapper[color]} !important;
  border-radius: 5px !important;
  padding: 5px 10px;
  border: ${({ bordered = false, color = 'primary' }) =>
    bordered ? ` 1px ${backgroundColorMapper[color]} solid` : 'none'} !important;
  width: ${({ width, size = 'medium' }) => (width ? `${width}px` : widthMapper[size])} !important;
  height: ${({ height, size = 'medium' }) =>
    height ? `${height}px` : heightMapper[size]} !important;
  font-size: ${({ font, size = 'medium' }) => (font ? `${font}px` : fontMapper[size])} !important;
  font-weight: ${({ bold = false }) => (bold ? 800 : 500)} !important;
  &:hover {
    background: ${({ bordered = false, color = 'primary', themed = 'light' }) =>
      bordered
        ? backgroundColorMapper[color]
        : colorsTheme[themed === 'light' ? 'dark' : 'light'].danger} !important;
    color: ${({ color = 'primary' }) => colorMapper[color]} !important;
  }
  @media (max-width: 600px) {
    font-size: 14px !important;
  }
`;
