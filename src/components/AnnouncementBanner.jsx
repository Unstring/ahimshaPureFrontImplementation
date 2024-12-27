import { useState, useEffect, useRef, useId } from 'react';
import { useBannerContext } from '../contexts/BannerContext';

const AnnouncementBanner = ({ 
  message, 
  ctaText, 
  ctaLink, 
  bannerId = 'default',
  position = 'top',
  behavior = 'fixed',
  removable = true,
}) => {
  const uniqueId = useId();
  const bannerRef = useRef(null);
  const { registerBanner, unregisterBanner, getBannerIndex } = useBannerContext();
  
  const [isVisible, setIsVisible] = useState(() => {
    if (removable) {
      let isDismissed = localStorage.getItem(`banner-${bannerId}-dismissed`);
      return isDismissed !== 'true';
    }
    return true;
  });

  useEffect(() => {
    if (isVisible) {
      registerBanner(uniqueId, position);
    }
    return () => {
      unregisterBanner(uniqueId, position);
    };
  }, [uniqueId, position, isVisible, registerBanner, unregisterBanner]);

  useEffect(() => {
    if (!isVisible || !bannerRef.current) return;

    const bannerHeight = bannerRef.current.offsetHeight;
    const index = getBannerIndex(uniqueId, position);

    switch (behavior) {
      case 'fixed':
        const offset = index * bannerHeight;
        if (position === 'top') {
          document.body.style.paddingTop = `${bannerHeight * (index + 1)}px`;
          bannerRef.current.style.top = `${offset}px`;
        } else {
          document.body.style.paddingBottom = `${bannerHeight * (index + 1)}px`;
          bannerRef.current.style.bottom = `${offset}px`;
        }
        break;

      case 'sticky':
        bannerRef.current.style.position = 'sticky';
        if (position === 'top') {
          bannerRef.current.style.top = `${index * bannerHeight}px`;
        } else {
          bannerRef.current.style.bottom = '0';
          bannerRef.current.style.marginTop = 'auto';
          document.body.style.paddingBottom = `${bannerHeight}px`;
        }
        break;

      case 'static':
        bannerRef.current.style.position = 'relative';
        if (position === 'bottom') {
          bannerRef.current.style.marginTop = 'auto';
        }
        break;
    }
    
    return () => {
      if (behavior === 'fixed' || (behavior === 'sticky' && position === 'bottom')) {
        document.body.style.paddingTop = '0px';
        document.body.style.paddingBottom = '0px';
      }
    };
  }, [isVisible, position, behavior, getBannerIndex, uniqueId]);

  const handleDismiss = () => {
    if (!removable) return;
    
    setIsVisible(false);
    try {
      localStorage.setItem(`banner-${bannerId}-dismissed`, 'true');
      if (behavior === 'fixed') {
        document.body.style.paddingTop = '0px';
        document.body.style.paddingBottom = '0px';
      }
      const stored = localStorage.getItem(`banner-${bannerId}-dismissed`);
      console.log('Banner dismissed, stored value:', stored);
    } catch (error) {
      console.error('Error storing banner state:', error);
    }
  };

  if (!isVisible) return null;

  const getPositionClasses = () => {
    const baseClasses = 'w-full transition-transform duration-300';
    
    switch (behavior) {
      case 'fixed':
        return `${baseClasses} fixed left-0 right-0 ${position === 'top' ? 'top-0' : 'bottom-0'}`;
      case 'sticky':
        return `${baseClasses} sticky ${position === 'top' ? 'top-0' : 'bottom-0'} ${position === 'bottom' ? 'mt-auto' : ''}`;
      case 'static':
        return `${baseClasses} relative ${position === 'bottom' ? 'mt-auto' : ''}`;
      default:
        return baseClasses;
    }
  };

  const getBannerWrapperClasses = () => {
    const baseClasses = 'w-full';
    if (position === 'bottom') {
      return `${baseClasses} flex flex-col mt-auto`;
    }
    if (position === 'top' && behavior === 'static') {
      return `${baseClasses} relative`;
    }
    return baseClasses;
  };

  const content = (
    <div 
      ref={bannerRef} 
      className={`${getPositionClasses()} z-[100] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500`}
    >
      <div className="max-w-[85rem] px-4 py-3 sm:px-6 lg:px-8 mx-auto">
        <div className="grid justify-center md:grid-cols-2 md:justify-between md:items-center gap-2">
          <div className="text-center md:text-start">
            <p className="text-white font-medium">
              {message}
            </p>
          </div>

          <div className="text-center md:text-start md:flex md:justify-end md:items-center gap-4">
            {ctaText && ctaLink && (
              <a 
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
                href={ctaLink}
              >
                {ctaText}
              </a>
            )}
            
            {removable && (
              <button
                onClick={handleDismiss}
                className="inline-flex rounded-lg text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Dismiss"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (position === 'bottom') {
    return (
      <div className={getBannerWrapperClasses()}>
        {content}
      </div>
    );
  }

  return content;
};

export default AnnouncementBanner; 