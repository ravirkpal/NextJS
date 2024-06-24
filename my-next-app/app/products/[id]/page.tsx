import React from "react";

function ProductCard() {
  return (
    <div>
      <p className="font-medium text-2xl">Product Detail</p>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-9/12">
          <div className="bg-gray-200 p-4">ravi</div>
          <div className="bg-gray-800 p-4">pal</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
