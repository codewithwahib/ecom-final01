import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import Image from 'next/image'  // Import the Image component from Next.js

const Product = ({product: {image, name, slug, price}}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          {/* Use Image component instead of img */}
          <Image 
            src={urlFor(image && image[0])} 
            width={380} 
            height={400} 
            alt={name || 'Product image'} // Add alt text
            className='product-image' 
            quality={75}  // Optional: optimize image quality
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
