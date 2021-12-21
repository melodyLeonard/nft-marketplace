import Image from 'next/image';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../../helpers/Button';
import { Lead, Paragraph } from '../../helpers/Typography';
import { useTheme } from '../../hooks/useTheme';
import colorsTheme from '../../theme/colors.theme';
import { Flex } from '../../helpers/Layout';

interface IProps {
  image: string;
  name: string;
  description: string;
  price: string;
}

const ItemCard: FC<IProps> = ({ image, name, description, price }) => {
  const [theme] = useTheme();
  return (
    <ItemWrapper themed={theme}>
      <Image layout="responsive" src={image} alt="" width={'100%'} height={'100%'} />
      <InnerSection>
        <Lead color="text" themed={theme}>
          {name}
        </Lead>
        <DescriptionWrapper>
          <Paragraph size="sm" color="text" themed={theme}>
            {description}
          </Paragraph>
        </DescriptionWrapper>
      </InnerSection>
      <ButtonContainer themed={theme}>
        <Lead color="background" themed={theme}>
          {price} ETH
        </Lead>
        <Button size="large" themed={theme}>
          Buy NFT
        </Button>
      </ButtonContainer>
    </ItemWrapper>
  );
};

export default ItemCard;

interface IStyledProps {
  themed?: 'light' | 'dark';
}

const ItemWrapper = styled.div<IStyledProps>`
  background: ${({ themed = 'light' }) => colorsTheme[themed].background};
  box-shadow: 0 4px 4px 0 ${({ themed = 'light' }) => colorsTheme[themed].shadow};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #dedede;
  width: 250px;
  height: 450px;
  margin: 1rem;
`;

const InnerSection = styled.div<IStyledProps>`
  padding: 10px;
  flex: 1;
`;

const ButtonContainer = styled(Flex.Column)<IStyledProps>`
  background: ${({ themed = 'light' }) => colorsTheme[themed].text};
  height: 100px;
  padding: 10px;
  justify-content: space-between;
  align-items: flex-start;
`;

const DescriptionWrapper = styled.div`
  height: 60%;
`;
