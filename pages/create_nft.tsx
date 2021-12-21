import { useRouter } from 'next/router';
import React, { useState } from 'react';

const create_nft = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    price: '',
    name: '',
    description: '',
    fileURL: null,
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return <div></div>;
};

export default create_nft;
