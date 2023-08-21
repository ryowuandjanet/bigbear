import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.company);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.orderName);
    setValue('postalCode', shippingAddress.phone);
    setValue('country', shippingAddress.taxIDNumber);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ company, address, orderName, phone, taxIDNumber }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { company, address, orderName, phone, taxIDNumber },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          company, 
          address, 
          orderName, 
          phone, 
          taxIDNumber,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">訂購資訊</h1>
        <div className="mb-4">
          <label htmlFor="company">公司行號</label>
          <input
            className="w-full"
            id="company"
            autoFocus
            {...register('company', {
              required: '請輸入公司行號',
            })}
          />
          {errors.company && (
            <div className="text-red-500">{errors.company.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">送達地址</label>
          <input
            className="w-full"
            id="address"
            {...register('address', {
              required: '請輸入送達地址',
              minLength: { value: 3, message: '地址最少要兩個字元' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="orderName">訂購人</label>
          <input
            className="w-full"
            id="orderName"
            {...register('orderName', {
              required: '請輸入訂購人姓名',
            })}
          />
          {errors.orderName && (
            <div className="text-red-500 ">{errors.orderName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone">聯絡電話</label>
          <input
            className="w-full"
            id="phone"
            {...register('phone', {
              required: '請輸入聯絡電話',
            })}
          />
          {errors.phone && (
            <div className="text-red-500 ">{errors.phone.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="taxIDNumber">統一編號</label>
          <input
            className="w-full"
            id="taxIDNumber"
            {...register('taxIDNumber', {
              required: '請輸入統一編號',
            })}
          />
          {errors.taxIDNumber && (
            <div className="text-red-500 ">{errors.taxIDNumber.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">下一步</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
