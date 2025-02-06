import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const apiBaseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_ENDPOINT;
const apiAuth = {
  username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
};

const wooCommerceApi = axios.create({
  baseURL: apiBaseUrl,
  auth: apiAuth,
});

const ProductBanner = ({ productId }) => {
  const [product, setProduct] = useState({});

  const fetchData = async (endpoint) => {
    try {
      const response = await wooCommerceApi.get(endpoint);
      if (response.status === 200) {
        return response;
      } else {
        throw new Error(`Error fetching data: ${response.status}`);
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        const response = await fetchData(`wc/v3/products/${productId}`);
        if (response !== null) {
          setProduct(response.data);
        }
      };
      fetchProductData();
    }
  }, [productId]);

  return (
    <>
    {/*Product Banner*/}
    <div className="inner-page-banner" style={{ height: 350 }}>
      <div className="banner-wrapper">
        <div className="container-fluid">
          <ul className="breadcrumb-list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li style={{ textTransform: "capitalize" }}>{product.name}</li>
          </ul>
          <div className="banner-main-content-wrap">
            <div className="row">
              <div className="col-xl-6 col-lg-7 d-flex align-items-center">
                <div className="banner-content">
                  <span className="sub-title">
                    Brand: {product.brands && product.brands.length > 0 ? product.brands[0].name : ''}
                  </span>
                  <h1>{product.name}</h1>
                  <h3>Price: {product.price}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductBanner;