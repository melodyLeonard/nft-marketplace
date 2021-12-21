import axios from 'axios';
import ethers from 'ethers';
import Web3Modal from 'web3modal';
import { useState } from 'react';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json';
import { nftAddress, nftmarketAddress } from '../../config';
import { attachLoader } from '../functions/global.function';
import { actions, useDispatch, useStore } from '../reducers/nftReducers';
import { create as ipfsHttpClient } from 'ipfs-http-client';

interface ILoading {
  getAllNFTs: boolean;
}

interface IItem {
  name: string;
  description: string;
  price: string;
  fileURL: string;
}

const initialLoading = {
  getAllNFTs: false,
};

const client = ipfsHttpClient({
  host: 'ipfs.infura.io/api/v0',
  port: 5001,
  protocol: 'https',
});

export const useNFTs = () => {
  const store = useStore();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<ILoading>(initialLoading);
  const activate = attachLoader(setLoading);

  // load all nfts from blockchain
  const getAllNFTs = activate('getAllNFts', async (): Promise<any> => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
      const marketContract = new ethers.Contract(nftmarketAddress, Market.abi, provider);
      const data = await marketContract.fetchMarketItems();

      const items = await Promise.all(
        data.map(async (item: any) => {
          const tokenUri = await tokenContract.tokenURI(item.tokenId);
          const meta = await axios.get(tokenUri);
          let price = ethers.utils.formatUnits(item.price.toString(), 'ether');
          let eachItem = {
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

      dispatch({
        type: actions.LOADEDE_NFT_SUCCESS,
        payload: items,
      });
    } catch (err: any) {
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
      const data = await client.add(file, {
        progress: (p: any) => console.log('\n\n------>', p),
      });
      return `https//ipfs.infura.io/ipfs/${data?.path}`;
    } catch (err: any) {
      console.log(err);
    }
  });

  const createItem = activate('upLoadFiletoNTFS', async (formInput: IItem): Promise<any> => {
    try {
      const { name, description, price, fileURL } = formInput;
      if (!name || !description || !price || !fileURL) return;

      const data = JSON.stringify({
        name,
        description,
        image: fileURL,
        price,
      });
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
  };
};

export default useNFTs;
