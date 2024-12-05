import React from 'react';
import Image from 'next/image';  // Import the Image component from next/image

const AllProducts = ({ products }) => {
    return (
        <div className="all-products-container">
            {products?.map((product) => (
                <div key={product._id} className="product-card">
                    <div className="product-image">
                        {/* Replace img with Image component and add alt text */}
                        <Image
                            src={product.imageUrl} // Make sure to pass the correct image source
                            alt={product.name || 'Product Image'}  // Provide descriptive alt text
                            width={500}  // Provide width (adjust as needed)
                            height={500} // Provide height (adjust as needed)
                            quality={75} // Optional: controls image quality for further optimization
                        />
                    </div>
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllProducts;
