import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../global/helpers/Button';
import { Flex } from '../global/helpers/Layout';
import { Lead } from '../global/helpers/Typography';
import { useNFTs } from '../global/hooks/useNFts';
import { useTheme } from '../global/hooks/useTheme';
import colorsTheme from '../global/theme/colors.theme';
import styles from '../styles/Home.module.css';
import { Input, TextArea } from '../global/helpers/Input';

const create_nft = () => {
  const [theme] = useTheme();
  const { upLoadFiletoNTFS } = useNFTs();
  const [formData, setFormData] = useState({
    price: '',
    name: '',
    description: '',
    fileURL: null,
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <WrapperContainer theme={theme}>
      <main className={styles.main}>
        <FormWrapper>
          <Lead className="mb-3" color="text" themed={theme}>
            Create your NFT
          </Lead>
          <Flex.Column>
            <Input
              className="mb-1"
              themed={theme}
              size="large"
              color="text"
              placeholder="NFT name"
              onChange={() => handleChange('name')}
            />
            <Input
              className="mb-1"
              themed={theme}
              size="large"
              color="text"
              placeholder="NFT name"
              onChange={() => handleChange('price')}
            />
            <TextArea
              className="mb-1"
              themed={theme}
              size="large"
              color="text"
              placeholder="NFT name"
              onChange={() => handleChange('description')}
            />
            <Input
              className="mb-1"
              themed={theme}
              size="large"
              color="text"
              type="file"
              placeholder="NFT name"
              onChange={() => handleChange('name')}
            />
            <Button size="large" themed={theme}>
              Create
            </Button>
          </Flex.Column>
        </FormWrapper>
      </main>
    </WrapperContainer>
  );
};

export default create_nft;

const backgroundMapper: any = {
  light: colorsTheme.light.background,
  dark: colorsTheme.dark.background,
};

const WrapperContainer = styled.div`
  background: ${({ theme = 'light' }) => backgroundMapper[theme]};
  padding: 4%;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;
