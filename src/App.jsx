import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "preline/preline";
import AppRoutes from './routes';
import AnnouncementBanner from './components/AnnouncementBanner';
import { BannerProvider } from './contexts/BannerContext';
import { fetchBanners, selectActiveBanners } from './store/slices/bannerSlice';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const banners = useSelector(selectActiveBanners);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === "function") {
      try {
        window.HSStaticMethods.autoInit();
      } catch (error) {
        console.error("Error initializing Preline components:", error);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchBanners()).unwrap();
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanners();
  }, [dispatch]);

  // Don't show loading state if we have persisted banners
  if (isLoading && banners.length === 0) {
    return null;
  }

  return (
    <BannerProvider>
      <div className="min-h-screen flex flex-col">
        {/* Top Banners */}
        <div className="banner-group-top">
          {banners
            .filter(banner => banner.position === 'top')
            .map((banner) => (
              <AnnouncementBanner
                key={banner.uuid}
                {...banner}
              />
            ))}
        </div>

        {/* Main Content */}
        <main className="flex-grow">
          <AppRoutes />
        </main>

        {/* Bottom Banners */}
        <div className="banner-group-bottom">
          {banners
            .filter(banner => banner.position === 'bottom')
            .map((banner) => (
              <AnnouncementBanner
                key={banner.uuid}
                {...banner}
              />
            ))}
        </div>
      </div>
    </BannerProvider>
  );
}

export default App;
