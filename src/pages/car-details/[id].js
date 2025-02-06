import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductAcf from '@/src/components/Mixcar/ProductAcf/Productafc';
import ProductMain from '@/src/components/Mixcar/ProductMain/Productmain';
import ProductVideo from '@/src/components/Mixcar/ProductVideo/Productvideo';
import BranchesLocation from '@/src/components/Mixcar/BranchesLocation/Brancheslocation';
import ProductSpecification from '@/src/components/Mixcar/ProductSpecification/Productspecification';
import ProductFeatured from '@/src/components/Mixcar/ProductFeatured/Productfeatured';
import MainLayout from '@/src/layout/MainLayout';
import axios from 'axios';
import i18n from '@/src/i18n'; // updated import statement

const apiBaseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_ENDPOINT;
const apiAuth = {
  username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
};

const wooCommerceApiConfig = axios.create({
  baseURL: apiBaseUrl,
  auth: apiAuth,
});

const ProductDetails = () => {
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({});
  const [acfData, setAcfData] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error('Product ID is not defined');
        return;
      }
      try {
        const response = await wooCommerceApiConfig.get(`wc/v3/products/${id}?acf_format=standard&wpml_language=${i18n.language === 'ar' ? 'ar' : 'en'}`);
        setProduct(response.data);
        setAcfData(response.data.acf);
      } catch (error) {
        console.error(error);
        setError('Failed to load data');
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MainLayout productId={id}>
        <div className="product-page">
          {/* Product Main */}
          <ProductMain product={product} acfData={acfData} />
          {/* ACF Data */}
          <ProductAcf productId={id} product={product} acfData={acfData} />
          {/* Product Specification */}
          <ProductSpecification productId={id} product={product} acfData={acfData} />
          {/* Product Branches Location */}
          <BranchesLocation productId={id} />
          {/* Product Video */}
          <ProductVideo productId={id} acfData={acfData}/>
          {/* Product Featured */}
          <ProductFeatured productId={id} acfData={acfData}/>
        </div>
      </MainLayout>
    </>
  );
};

export default ProductDetails;