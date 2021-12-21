import type { NextPage } from 'next';
import { useEffect } from 'react';
import styled from 'styled-components';
import Loader from '../global/components/Loader/index';
import { Lead } from '../global/helpers/Typography';
import { useNFTs } from '../global/hooks/useNFts';
import { useTheme } from '../global/hooks/useTheme';
import colorsTheme from '../global/theme/colors.theme';
import styles from '../styles/Home.module.css';
import { Flex } from '../global/helpers/Layout';
import ItemCard from '../global/components/Cards/ItemCard';

const Home: NextPage = () => {
  const [theme] = useTheme();
  const { getAllNFTs, loading, nfts } = useNFTs();

  useEffect(() => {
    getAllNFTs();
  }, []);

  return (
    <Container theme={theme}>
      <main className={styles.main}>
        {loading.getAllNFTs ? (
          <Loader />
        ) : nfts === undefined ? (
          <Flex.Row>
            <ItemCard
              image="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F6170e01f8d7639b95a7f2eeb%2FSotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs%2F0x0.png%3Ffit%3Dscale"
              name="Melody"
              description="This is the picture of a monkey king"
              price="1.3"
            />
            <ItemCard
              image="https://cdn.vox-cdn.com/thumbor/M-JI6uZz5smov6Qq_vNarBXtKkU=/155x65:995x648/1200x800/filters:focal(489x354:677x542)/cdn.vox-cdn.com/uploads/chorus_image/image/70264946/bored_ape_nft_accidental_.0.jpg"
              name="Melody"
              description="This is the picture of a monkey king"
              price="1.3"
            />
            <ItemCard
              image="https://lh3.googleusercontent.com/A567REGmeThxG16zYSANxzaVudd-rJE9KK5_mWPKl9fj01Sbgh2C_Vkhg1YaVfdPzTXb6EhOZRZcO0V4uiNiPp8szUiCmtDkBHnQiQ=w600"
              name="Melody"
              description="This is the picture of a monkey king"
              price="1.3"
            />
            <ItemCard
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf04kI1lRtmMI0mIPHpb6GeTJeQ5bUGmbywb5hhePskE5aVqA0GUlgjXCMIUrAlxaStjc&usqp=CAU"
              name="Melody"
              description="This is the picture of a monkey king"
              price="1.3"
            />
          </Flex.Row>
        ) : (
          <Flex.Row>
            {nfts?.map(({ image, name, price }: any) => (
              <ItemCard
                image="https://cdn.vox-cdn.com/thumbor/M-JI6uZz5smov6Qq_vNarBXtKkU=/155x65:995x648/1200x800/filters:focal(489x354:677x542)/cdn.vox-cdn.com/uploads/chorus_image/image/70264946/bored_ape_nft_accidental_.0.jpg"
                name="Melody"
                description="This is the picture of a monkey king"
                price={price}
              />
            ))}
          </Flex.Row>
        )}
      </main>
    </Container>
  );
};

export default Home;

const backgroundMapper: any = {
  light: colorsTheme.light.background,
  dark: colorsTheme.dark.background,
};

const Container = styled.div`
  background: ${({ theme = 'light' }) => backgroundMapper[theme]};
  padding: 4%;
`;
