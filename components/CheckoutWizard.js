import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {['用戶登錄', '收件地址', '付款方式', '下訂'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? 'border-indigo-500   text-indigo-500'
           : 'border-gray-400 text-gray-400'
       }
          
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
