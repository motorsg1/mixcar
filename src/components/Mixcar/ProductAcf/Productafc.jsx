import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import wooCommerceApi from '@/src/utils/WooComerce';

const ProductAcf = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [acfData, setAcfData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Log the request URL for debugging
        console.log('Fetching from:', `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/${productId}`);

        // Fetch product data
        const response = await wooCommerceApi.get(`wc/v3/products/${productId}`, {
          params: {
            _fields: 'id,name,acf,description',
            lang: 'en' // or your desired language
          }
        });

        if (response.data) {
          setProduct(response.data);
          setAcfData(response.data.acf || {});
        } else {
          throw new Error('No data received from the API');
        }
      } catch (err) {
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: err.config?.url
        });
        
        setError(
          err.response?.data?.message || 
          'Unable to fetch product data. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading product data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <p>Product ID: {productId}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="no-product-container">
        <p>No product data available</p>
      </div>
    );
  }

  return (
    <div className="car-details-area">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="single-item mb-50" id="key-features">
              <div className="key-features">
                <div className="title mb-20">
                  <h5>Key Features</h5>
                </div>
                <div className="features-boxes">
                  {Array.from({ length: 12 }, (_, index) => {
                    const featureKey = `features${index + 1}`;
                    const feature = acfData[featureKey];
                    
                    return feature ? (
                      <div key={index} className="feature-box">
                        <Image 
                          src="/assets/img/mixcar/icon/features-icon.svg" 
                          alt="Feature Icon" 
                          width={16} 
                          height={16} 
                        />
                        <p>{feature}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAcf;