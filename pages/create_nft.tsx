import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import Loader from '../global/components/Loader';
import { Button } from '../global/helpers/Button';
import { Input, TextArea } from '../global/helpers/Input';
import { Flex } from '../global/helpers/Layout';
import { Lead } from '../global/helpers/Typography';
import { useNFTs } from '../global/hooks/useNFts';
import { useTheme } from '../global/hooks/useTheme';
import colorsTheme from '../global/theme/colors.theme';
import styles from '../styles/Home.module.css';

const create_nft = () => {
  const [theme] = useTheme();
  const { upLoadFiletoNTFS, createItem, loading } = useNFTs();
  const [formData, setFormData] = useState({
    price: '',
    name: '',
    description: '',
    fileURL: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileOnChange = async (e) => {
    const file = e.target.files[0];
    const res = await upLoadFiletoNTFS(file);
    setFormData({ ...formData, fileURL: res });
  };

  const handleCreateItem = () => {
    createItem(formData);
  };

  return (
    <WrapperContainer theme={theme}>
      <main className={styles.main}>
        {loading?.createSale || loading?.createItem ? (
          <Loader />
        ) : (
          <FormWrapper>
            <Lead className="mb-3" color="text" themed={theme}>
              Create your NFT
            </Lead>
            <Flex.Column>
              <Input
                name="name"
                className="mb-1"
                themed={theme}
                size="large"
                color="text"
                placeholder="NFT name"
                onChange={handleChange}
              />
              <Input
                name="price"
                className="mb-1"
                themed={theme}
                size="large"
                color="text"
                placeholder="NFT price"
                onChange={handleChange}
              />
              <TextArea
                name="description"
                className="mb-1"
                themed={theme}
                size="large"
                color="text"
                placeholder="NFT description"
                onChange={handleChange}
              />
              <Flex.Row>
                <Input
                  name="fileURL"
                  className="mb-1"
                  themed={theme}
                  size="large"
                  color="text"
                  type="file"
                  placeholder="NFT File"
                  onChange={handleFileOnChange}
                  onClick={(event) => {
                    event.currentTarget.value = null;
                  }}
                />
                {formData.fileURL && (
                  <Image src={formData.fileURL} alt="" width={400} height={400} />
                )}
              </Flex.Row>
              {loading?.upLoadFiletoNTFS ? (
                <Loader />
              ) : (
                <Button onClick={() => handleCreateItem()} size="large" themed={theme}>
                  Create
                </Button>
              )}
            </Flex.Column>
          </FormWrapper>
        )}
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
