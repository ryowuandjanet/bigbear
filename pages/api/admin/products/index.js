import { getToken } from 'next-auth/jwt';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || !user.isAdmin) {
    return res.status(401).send('需要管理員登錄');
  }
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: '方法不允許' });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: '商品名稱',
    slug: 'sample-name-' + Math.random(),
    image: '/images/shirt1.jpg',
    price: 0,
    disPrice: 0,
    category: '大分類',
    brand: '小分類',
    countInStock: 0,
    description: '商品描述',
    description1: '重點描述(紅字部份)',
    description2: '提醒描述(藍字部份)',
    description3: '一般描述(黑字部份)',
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: '產品建立成功', product });
};
const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};
export default handler;
