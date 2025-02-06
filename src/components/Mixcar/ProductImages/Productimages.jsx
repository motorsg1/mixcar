import React, { useState, useEffect } from 'react';
import wooCommerceApi from '../../../utils/WooComerce';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const ProductImages = ({ productId }) => {
  const [product, setProduct] = useState({});
  const [exteriorImages, setExteriorImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      wooCommerceApi
        .get(`wc/v3/products/${productId}`)
        .then((response) => {
          const productData = response.data;
          console.log('Product Data:', productData);
  
          // Validate the existence of ACF and exterior
          if (productData.acf?.exterior) {
            const acfExteriorImage = productData.acf.exterior;
            console.log('ACF Exterior Image:', acfExteriorImage);
  
            // Extract image URL
            const imageUrl = acfExteriorImage.url || acfExteriorImage.link || acfExteriorImage.sizes?.medium || '';
  
            console.log('Extracted Exterior Image URL:', imageUrl);
  
            // Set exterior image
            setExteriorImages([imageUrl]);
          } else {
            console.warn('ACF or exterior not found in product data.');
          }
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          if (error.response?.status === 404) {
            setError('Product not found');
          } else {
            setError('An error occurred');
          }
        });
    }
  }, [productId]);

  return (
    <div className="car-details-area pt-100 mb-100">
      <div className="container">
        <div className="product-img">
          {exteriorImages.length > 0 ? (
            <>
              <div className="slider-btn-group">
                <div className="product-stand-next swiper-arrow">
                  <svg width={8} height={13} viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                  </svg>
                </div>
                <div className="product-stand-prev swiper-arrow">
                  <svg width={8} height={13} viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                  </svg>
                </div>
              </div>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: '.product-stand-next',
                  prevEl: '.product-stand-prev',
                }}
              >
                {exteriorImages.map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <img src={imageUrl} alt={`Exterior Image ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <div>No exterior images available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
