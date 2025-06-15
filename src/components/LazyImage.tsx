
import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  placeholder?: string;
}

const LazyImage = ({ src, alt, className, style, onClick, placeholder }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onClick={onClick}
    >
      {/* Enhanced skeleton loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] -translate-x-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-lg mx-auto mb-2"></div>
            <p className="text-xs text-gray-500">Failed to load</p>
          </div>
        </div>
      )}
      
      {/* Actual Image with reduced scale effect */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ 
            position: isLoaded ? 'static' : 'absolute', 
            top: 0, 
            left: 0 
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
