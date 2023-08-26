/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';

export default function HorizontalCardItem({ product, addToCartHandler }) {
  return (
    <>
      <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.brand}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">$ {product.price}</p>
            <button
              className="primary-button"
              type="button"
              onClick={() => addToCartHandler(product)}
            >
              加入購物車
            </button>
        </div>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        />
      </a>
    </>
  );
}
