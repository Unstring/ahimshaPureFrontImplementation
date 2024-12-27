import { createContext, useContext, useReducer, useCallback } from 'react';

const BannerContext = createContext();

const initialState = {
  topBanners: [],
  bottomBanners: [],
};

function bannerReducer(state, action) {
  switch (action.type) {
    case 'REGISTER_BANNER':
      const { position, id } = action.payload;
      const arrayKey = `${position}Banners`;
      if (!state[arrayKey].includes(id)) {
        return {
          ...state,
          [arrayKey]: [...state[arrayKey], id]
        };
      }
      return state;

    case 'UNREGISTER_BANNER':
      const { position: pos, id: bannerId } = action.payload;
      const key = `${pos}Banners`;
      return {
        ...state,
        [key]: state[key].filter(id => id !== bannerId)
      };

    default:
      return state;
  }
}

export function BannerProvider({ children }) {
  const [state, dispatch] = useReducer(bannerReducer, initialState);

  const registerBanner = useCallback((id, position) => {
    dispatch({ type: 'REGISTER_BANNER', payload: { id, position } });
  }, []);

  const unregisterBanner = useCallback((id, position) => {
    dispatch({ type: 'UNREGISTER_BANNER', payload: { id, position } });
  }, []);

  const getBannerIndex = useCallback((id, position) => {
    return state[`${position}Banners`].indexOf(id);
  }, [state]);

  return (
    <BannerContext.Provider value={{ registerBanner, unregisterBanner, getBannerIndex }}>
      {children}
    </BannerContext.Provider>
  );
}

export const useBannerContext = () => useContext(BannerContext); 