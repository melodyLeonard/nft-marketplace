import axios from 'axios';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Web3Modal from 'web3modal';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json';
import { nftAddress, nftmarketAddress } from '../../config';
import { attachLoader } from '../functions/global.function';
import { actions, useDispatch, useStore } from '../reducers/nftReducers';

interface ILoading {
  getAllNFTs: boolean;
  upLoadFiletoNTFS: boolean;
  createSale: boolean;
  createItem: boolean;
}

interface IItem {
  name: string;
  description: string;
  price: string;
  fileURL: string;
}

const initialLoading = {
  getAllNFTs: false,
  upLoadFiletoNTFS: false,
  createSale: false,
  createItem: false,
};

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
});

export const useNFTs = () => {
  const store = useStore();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<ILoading>(initialLoading);
  const activate = attachLoader(setLoading);
  const router = useRouter();

  // load all nfts from blockchain
  const getAllNFTs = activate('getAllNFts', async (): Promise<any> => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
      const marketContract = new ethers.Contract(nftmarketAddress, Market.abi, provider);
      let data = await marketContract.fetchMarketItems();
      console.log(data);

      data = await Promise.all(
        data.map(async (item: any) => {
          const tokenUri = await tokenContract.tokenURI(item.tokenId);
          const meta = await axios.get(tokenUri);
          const price = ethers.utils.formatUnits(item.price.toString(), 'ether');
          const eachItem = {
            tokenId: item.tokenId.toNumber(),
            seller: item.seller,
            owner: item.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            price,
          };
          return eachItem;
        }),
      );

      console.log('------>', { data });

      dispatch({
        type: actions.LOADEDE_NFT_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      console.info('------>', { err });
      dispatch({
        type: actions.LOADED_NFT_ERROR,
        payload: err.message,
      });
    }
  });

  const buyNFT = activate('getAllNFts', async (nft): Promise<any> => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftmarketAddress, Market.abi, signer);

      const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

      const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
        value: price,
      });

      transaction.wait();
      getAllNFTs();
    } catch (err: any) {
      dispatch({
        type: actions.LOADED_NFT_ERROR,
        payload: err.message,
      });
    }
  });

  const upLoadFiletoNTFS = activate('upLoadFiletoNTFS', async (file): Promise<any> => {
    try {
      const res = await client.add(file);
      return `https://ipfs.infura.io/ipfs/${res?.path}`;
    } catch (err: any) {
      console.log(err);
    }
  });

  const createSale = activate('createSale', async ({ url, price }): Promise<any> => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
      let transaction = await contract.createToken(url);
      let tx = await transaction.wait();

      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();

      const _price = ethers.utils.parseUnits(price, 'ether');
      contract = new ethers.Contract(nftmarketAddress, Market.abi, signer);
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();

      transaction = await contract.createMarketItem(nftAddress, tokenId, _price, {
        value: listingPrice,
      });
      await transaction.wait();
      router.push('/');
    } catch (err: any) {
      console.log(err);
    }
  });

  const createItem = activate('createItem', async (formInput: IItem): Promise<any> => {
    const { name, description, price, fileURL } = formInput;
    if (!name || !description || !price || !fileURL) return;

    const data = JSON.stringify({
      name,
      description,
      image: fileURL,
      price,
    });
    try {
      const res = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${res?.path}`;
      createSale({ url, price });
    } catch (err: any) {
      console.log(err);
    }
  });
  const clearErrors = () => dispatch({ type: actions.CLEAR_NFT_ERROR });
  return {
    loading: loading,
    nftError: store.nftError,
    nfts: store.nfts,
    clearErrors,
    getAllNFTs,
    buyNFT,
    upLoadFiletoNTFS,
    createItem,
  };
};

export default useNFTs;
