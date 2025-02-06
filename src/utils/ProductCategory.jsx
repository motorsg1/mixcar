import Link from "next/link";
import React, { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import axios from 'axios';
import wooCommerceApi from '../utils/WooComerce';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useRouter } from 'next/router';

const apiBaseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_ENDPOINT;
const apiAuth = {
  username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
};

const fetchData = async (endpoint) => {
  try {
    const response = await wooCommerceApi.get(endpoint);
    return response.data;
  } catch (error) {
    // Handle error
  }
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [acfData, setAcfData] = useState([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const { t } = useTranslation();
  const router = useRouter();

  const fetchAcfData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}wc/v3/products?acf_format=standard&wpml_language=${router.locale}`, {
        auth: apiAuth,
      });
      setAcfData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAcfData();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetchData(`wc/v3/products?page=${currentPage}&wpml_language=${router.locale}`);
    setProducts((prevProducts) => [...prevProducts, ...response]);
    if (response.length === 0) {
      setHasMoreProducts(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchBrands = async () => {
    setLoading(true);
    const response = await axios.get(`${apiBaseUrl}wc/v3/products/brands?page=${currentPage}&wpml_language=${router.locale}`, {
      auth: apiAuth,
    });
    setProducts(response.data);
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (hasMoreProducts) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="product-page" dir={t('direction')}>
      <h1 className="text-center">{t('allProducts')}</h1>
      <div className="container">
        <div className="row justify-content-start">
          {loading ? (
            Array(12).fill(0).map((_, index) => (
              <ContentLoader
              height={300}
              width={300}
              speed={2}
              style={{ backgroundColor: '#f3f3f3' }}
            >
              <rect x="0" y="0" rx="10" ry="10" width="300" height="200" />
              <rect x="0" y="220" rx="10" ry="10" width="300" height="20" />
              <rect x="0" y="250" rx="10" ry="10" width="250" height="20" />
              <rect x="0" y="280" rx="10" ry="10" width="250" height="20" />
            </ContentLoader>
            ))
          ) : (
            products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4 text-left">
                <div className="product-card">
                  <Image
                    src={product.images && product.images.length > 0 ? product.images[0].src : '/path/to/placeholder-image.jpg'}
                    alt={product.name}
                    width={400}
                    height={400}
                  />
                  <p style={{ fontSize: '20px', fontWeight: '600', marginTop: '10px' }}>{product.name}</p>
                  <p style={{ fontSize: '18px', fontWeight: '400', marginTop: '0px' }}>{product.price} {t('currency')}</p>
                  <p style={{ fontSize: '16px', fontWeight: '400', marginTop: '0px' }}>
                    {t('category')}: {product.categories && product.categories.length > 0 ? product.categories[0].name : ''}
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: '600', marginTop: '0px' }}>
                    {t('brand')}: {product.brands && product.brands.length > 0 ? product.brands[0].name : ''}
                  </p>
                  {acfData && acfData.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginRight: '3px' }}>
                        <div className="icon">
                          <Image src="/assets/img/inner-page/icon/mileage.svg" alt="" width={18} height={18} />
                        </div>
                        {acfData.find((item) => item.id === product.id)?.acf.drive}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', marginRight: '3px'}}>
                        <div className="icon">
                          <Image src="/assets/img/inner-page/icon/engine.svg" alt="" width={18} height={18} />
                        </div>
                        {acfData.find((item) => item.id === product.id)?.acf.engine}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="icon">
                          <Image src="/assets/img/inner-page/icon/fuel.svg" alt="" width={18} height={18} />
                        </div>
                        {acfData.find((item) => item.id === product.id)?.acf.gasoline}
                      </div>
                    </div>
                  )}
                  <div className="btn btn-dark">
                    <Link href="/car-details/[id]" as={`/car-details/${product.id}`} locale={router.locale} className="view-details-link">{t('viewDetails')}</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {hasMoreProducts && !loading && (
          <div className="col-lg-12 text-center">
            <button style={{ marginBottom: '30px' }} onClick={handleLoadMore} className="btn btn-dark">{t('loadMore')}</button>
          </div>
        )}
        {!hasMoreProducts && !loading && (
          <div className="col-lg-12 text-center">
            <p>{t('allProductsLoaded')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;