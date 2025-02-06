import ContentLoader from 'react-content-loader';
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from "../layout/MainLayout";

const apiBaseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_ENDPOINT;
const apiAuth = {
  username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
};

const BaicBrand = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [acfData, setAcfData] = useState([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true); // Track if there are more products to load

  const fetchAcfData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}wc/v3/products?acf_format=standard&brand=Baic`, {
        auth: apiAuth,
      });
      setAcfData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAcfData();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);  // Set loading to true when fetching products
    try {
      const response = await axios.get(`${apiBaseUrl}wc/v3/products?brand=Baic&page=${currentPage}`, {
        auth: apiAuth,
      });

      // If no products are returned, set hasMoreProducts to false
      if (response.data.length === 0) {
        setHasMoreProducts(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...response.data]); // Append new products
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleLoadMore = () => {
    if (hasMoreProducts) {
      setCurrentPage((prevPage) => prevPage + 1); // Increment the page number for loading more products
    }
  };

  const renderProduct = (product) => {
    return (
      <div key={product.id} className="col-md-4 mb-4">
        <div className="product-card text-left">
          <img src={product.images[0].src} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          <p style={{ fontSize: '20px', fontWeight: '600', marginTop: '10px' }}>{product.name}</p>
          <p style={{ fontSize: '18px', fontWeight: '400', marginTop: '0px' }}>{product.price} SAR</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <div className="icon">
                <img src="assets/img/inner-page/icon/mileage.svg" alt="" style={{ width: '18px' }} />
              </div>
              <span style={{ marginLeft: '5px' }}>{acfData.find((item) => item.id === product.id)?.acf.drive}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <div className="icon">
                <img src="assets/img/inner-page/icon/engine.svg" alt="" style={{ width: '18px' }} />
              </div>
              <span style={{ marginLeft: '5px' }}>{acfData.find((item) => item.id === product.id)?.acf.engine}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="icon">
                <img src="assets/img/inner-page/icon/fuel.svg" alt="" style={{ width: '18px' }} />
              </div>
              <span style={{ marginLeft: '5px' }}>{acfData.find((item) => item.id === product.id)?.acf.gasoline}</span>
            </div>
          </div>
          <div className="btn btn-dark">
            <Link href="/car-details/[id]" as={`/car-details/${product.id}`} className="view-details-link">View Details</Link>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MainLayout>
      <div className="all-products-page">
        <h1 className="text-center">Baic Vehicles</h1>
        <div className="container">
          <div className="row justify-content-start">
            {loading ? (
              Array(12).fill(0).map((_, index) => (
                <div key={index} className="col-md-4 mb-4">
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
                </div>
              ))
            ) : (
              products.map((product) => renderProduct(product))
            )}
          </div>
          
          {/* Display Load More or Message if no more products */}
          {hasMoreProducts && !loading && (
            <div className="col-lg-12 text-center">
              <button style={{ marginBottom: '30px' }} onClick={handleLoadMore} className="btn btn-dark">
                Load More
              </button>
            </div>
          )}

          {/* Message if no more products */}
          {!hasMoreProducts && !loading && (
            <div className="col-lg-12 text-center">
              <p>All products have been loaded.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BaicBrand;
