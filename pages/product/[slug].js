import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { useStateContext } from '../../context/StateContext';
import Image from 'next/image'; // Importing Image component

const ProductDetails = ({ product }) => {
    const { image, name, details, price, tags, care } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd } = useStateContext();

    const careList = care.map(item => item.children[0].text);

    return (
        <div className='products'>
            <div className='product-detail-container'>
                <div className='product-images'>
                    <div className='small-images-container'>
                        {image?.map((item, ind) => (
                            <div key={ind} className="small-image-container">
                                <Image
                                    src={urlFor(item)} 
                                    alt={`Thumbnail of ${name}`}
                                    width={100} 
                                    height={100} // You can adjust the width and height as necessary
                                    onMouseEnter={() => setIndex(ind)}
                                    className='small-image'
                                />
                            </div>
                        ))}
                    </div>
                    <div className='big-image-container'>
                        <Image
                            src={urlFor(image && image[index])}
                            alt={`Large image of ${name}`}
                            width={500} // Specify the width and height
                            height={500}
                        />
                    </div>
                </div>
                <div className='product-details'>
                    <div className='name-and-category'>
                        <h3>{name}</h3>
                        <span>{Array.isArray(tags) ? tags.join(', ') : tags}</span>
                    </div>
                    <div className='size'>
                        <p>SELECT SIZE</p>
                        <ul>
                            <li>XS</li>
                            <li>S</li>
                            <li>M</li>
                            <li>L</li>
                            <li>XL</li>
                        </ul>
                    </div>
                    <div className='quantity-desc'>
                        <h4>Quantity: </h4>
                        <div>
                            <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                        </div>
                    </div>
                    <div className='add-to-cart'>
                        <button className='btn' type='button' onClick={() => onAdd(product, qty)}>
                            <CgShoppingCart size={20} /> Add to Cart
                        </button>
                        <p className='price'>${price}.00</p>
                    </div>
                </div>
            </div>

            <div className='product-desc-container'>
                <div className='desc-title'>
                    <div className="desc-background">
                        Overview
                    </div>
                    <h2>Product Information</h2>
                </div>
                <div className='desc-details'>
                    <h4>PRODUCT DETAILS</h4>
                    <p>{details[0].children[0].text}</p>
                </div>
                <div className='desc-care'>
                    <h4>PRODUCT CARE</h4>
                    <ul>
                        {careList.map((list, index) => (
                            <li key={index}>{list}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: { products, product }
    };
};

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    };
};
