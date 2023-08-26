import db from '../utils/db';
import Layout from '../components/Layout';
import Link from 'next/link';
import Product from '../models/Product';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { toast } from 'react-toastify';
import ProductItem from '../components/ProductItem';
import { Carousel } from 'react-responsive-carousel';

export default function Home({ topRatedProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Amazona">
      <Carousel showThumbs={false} autoPlay>
        <div>
          <img src="https://res.cloudinary.com/dp53ha8ie/image/upload/v1693064511/bigbear/%E6%A9%AB%E5%B9%85/slider_figj9t.png" />
        </div>
        <div>
          <img src="/images/banner2.jpg" />
        </div>
      </Carousel>

      
      <div className="grid gap-4">
        <div>
          <Link href='/class/triangular_desk_calendar_area'>
              <img className="h-auto max-w-full rounded-lg" src="https://2626731.weebly.com/uploads/1/0/9/3/109388399/1644706616_orig.jpg" alt="" />
          </Link>
        </div>
      </div>

      <h2 className="my-3 text-2xl">產品分類</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Link href='/class/triangular_desk_calendar_area'>
            <img className="h-auto max-w-full rounded-lg" src="https://2626731.weebly.com/uploads/1/0/9/3/109388399/942654648_orig.jpg" alt="" />
          </Link>
        </div>
        <div>
          <Link href='/class/calendar_area'>
            <img className="h-auto max-w-full rounded-lg" src="https://2626731.weebly.com/uploads/1/0/9/3/109388399/484110301_orig.jpg" alt="" />
          </Link>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://2626731.weebly.com/uploads/1/0/9/3/109388399/1479900923_orig.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://2626731.weebly.com/uploads/1/0/9/3/109388399/175403403_orig.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://2626731.weebly.com/uploads/1/0/9/3/109388399/2128708269_orig.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://2626731.weebly.com/uploads/1/0/9/3/109388399/405824704_orig.jpg" alt="" />
        </div>
      </div>

      <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://2626731.weebly.com/uploads/1/0/9/3/109388399/1178546123_orig.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://2626731.weebly.com/uploads/1/0/9/3/109388399/573798035_orig.jpg" alt="" />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}

// Home.auth = { adminOnly: true };