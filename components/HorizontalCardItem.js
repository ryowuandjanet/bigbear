/* eslint-disable @next/next/no-img-element */
import React,{useState} from 'react';
import Image from 'next/image';

export default function HorizontalCardItem({ product, addToCartHandler }) {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [fullImageSrc, setFullImageSrc] = useState('');

  const handleThumbnailClick = (src) => {
    setFullImageSrc(src);
    setOverlayVisible(true);
  };

  const handleCloseClick = () => {
    setOverlayVisible(false);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row">
        <div className="md:w-1/2 cursor-pointer" onClick={() => handleThumbnailClick("https://via.placeholder.com/800x600")}>
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-red-600 mb-4">{product.description1}</p>
          <p className="text-blue-600 mb-4">{product.description2}</p>
          <p className="text-gray-600 mb-4">{product.description3}</p>
          <div className="flex items-center mb-4">
            
            <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <p className="text-sm text-gray-500">{product.brand} - $ {product.price}</p>
          </div>
          <div className="flex justify-between">
            <button 
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                type="button"
                onClick={() => addToCartHandler(product)}
              >
                加入購物車
              </button>
          </div>
        </div>
      </div>

        {isOverlayVisible && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-4">
              <img src={fullImageSrc} alt="Full Image" className="w-full h-auto" />
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={handleCloseClick}>Close</button>
            </div>
          </div>
        )}
    </>
  );
}
