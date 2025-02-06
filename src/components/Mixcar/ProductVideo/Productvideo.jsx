import React, { useState, useEffect } from 'react';
import wooCommerceApi from '@/src/utils/WooComerce'; // Ensure the utility file path is correct

const ProductVideo = ({ productId }) => {
  const [product, setProduct] = useState({});
  const [acfData, setAcfData] = useState({});
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(false); // State for video error

  // Function to fetch data with error handling
  const fetchData = async (endpoint) => {
    try {
      const response = await wooCommerceApi.get(endpoint);
      return response.data; // Return only the data
    } catch (err) {
      console.error(`Error fetching data from ${endpoint}:`, err);
      setError('Error fetching data. Please try again.');
      return null;
    }
  };

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        const data = await fetchData(`wc/v3/products/${productId}`);
        if (data) {
          setProduct(data);
          setAcfData(data.acf || {});
        } else {
          setAcfData({});
        }
      };
      fetchProductData();
    }
  }, [productId]);

  useEffect(() => {
    if (acfData.video) {
      // Check if video URL is valid
      const isValidUrl = getVideoId(acfData.video);
      if (!isValidUrl) {
        setVideoError(true); // Set error if invalid URL
      }
    }
  }, [acfData]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  const getVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return videoId;
    } catch (error) {
      return null; // Invalid URL
    }
  };

  const videoUrl = acfData.video || ''; // Assume the video URL is stored in acfData.video
  const videoId = getVideoId(videoUrl);

  return (
    <div className="car-details-area">
      <div className="container">
        {videoUrl && videoId && !videoError ? (
          <div className="video-container mb-50 full-width-video">
            <div className="title mb-20">
              <h5>Product Video</h5>
            </div>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Product Video"
                style={{
                  width: '100%',
                  height: '100vh',
                  maxWidth: '100%',
                  maxHeight: '60vh',
                  objectFit: 'cover',
                }}
              ></iframe>
            </div>
          </div>
        ) : videoError ? (
          <div className="video-error">
            <p>Sorry, we couldn't load the video. Please try again later.</p>
          </div>
        ) : (
          <div className="video-error">
            <p>No video available for this product.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVideo;