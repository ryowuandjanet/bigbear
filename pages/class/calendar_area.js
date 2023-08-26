import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import HorizontalCardItem from '../../components/HorizontalCardItem';
import Product from '../../models/Product'; // 確保路徑正確

export default function ca({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('對不起。 產品缺貨');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('產品已添加到購物車');
  };
  return (
    <Layout>
      <h1>月曆區-清單</h1>
      {products.length === 0 && <div>沒有找到產品</div>}
      <ul>
        {products.map((product) => (
          <HorizontalCardItem
            key={product._id}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    // Fetch product data from the database using the Product model
    const products = await Product.find({ category: '月曆區' }); // 使用查詢條件
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)), // 將數據序列化以避免循環引用問題
      },
    };
  } catch (error) {
    console.error('獲取產品數據時出錯:', error);
    return {
      props: {
        products: [],
      },
    };
  }
}
