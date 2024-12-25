import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { useEffect } from 'react';
import Logo from '../common/Logo';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items = [] } = useSelector((state) => state.cart);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Initialize theme on component mount
  useEffect(() => {
    const HSThemeAppearance = {
      init() {
        const defaultTheme = 'default';
        let theme = localStorage.getItem('hs_theme') || defaultTheme;

        if (document.querySelector('html').classList.contains('dark')) return;
        this.setAppearance(theme);
      },
      _resetStylesOnLoad() {
        const $resetStyles = document.createElement('style');
        $resetStyles.innerText = `*{transition: unset !important;}`;
        $resetStyles.setAttribute('data-hs-appearance-onload-styles', '');
        document.head.appendChild($resetStyles);
        return $resetStyles;
      },
      setAppearance(theme, saveInStore = true) {
        const $resetStylesEl = this._resetStylesOnLoad();

        if (saveInStore) {
          localStorage.setItem('hs_theme', theme);
        }

        if (theme === 'auto') {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').classList.add('dark');
          } else {
            document.querySelector('html').classList.remove('dark');
          }
        } else if (theme === 'dark') {
          document.querySelector('html').classList.add('dark');
        } else {
          document.querySelector('html').classList.remove('dark');
        }

        window.setTimeout(() => {
          $resetStylesEl.remove();
        });
      },
    };
    HSThemeAppearance.init();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (localStorage.getItem('hs_theme') === 'auto') {
        HSThemeAppearance.setAppearance('auto', false);
      }
    });
  }, []);

  const toggleTheme = (theme) => {
    const HSThemeAppearance = {
      setAppearance(theme) {
        localStorage.setItem('hs_theme', theme);
        if (theme === 'dark') {
          document.querySelector('html').classList.add('dark');
        } else {
          document.querySelector('html').classList.remove('dark');
        }
      },
    };
    HSThemeAppearance.setAppearance(theme);
  };

  return (
    <header className="flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-2 backdrop-blur-md
    relative bg-white/80 lg:bg-transparent lg:backdrop-blur-none dark:bg-gray-900 dark:lg:bg-transparent">
      <nav className="max-w-[85rem] flex flex-wrap basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-none">
          <Link to="/" className="flex-none inline-block text-xl font-bold text-gray-800 dark:text-white">
            <div className="flex items-center gap-2">
              <Logo className="w-10 h-10" />
              <span>Ahimsa Pure</span>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center lg:gap-x-1 ms-auto">
          {/* Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium ${isActive 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `font-medium ${isActive 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500'
                }`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `font-medium ${isActive 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `font-medium ${isActive 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500'
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Divider */}
          <div className="hidden lg:block lg:mx-3">
            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-x-2">
            {/* Search Button */}
            <button 
              type="button" 
              className="inline-flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </button>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="inline-flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <div className="relative">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center size-4 text-xs font-bold text-white bg-blue-600 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Dark Mode Toggle */}
            <div>
            <button
              type="button"
              className="hs-dark-mode-active:hidden inline-flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={() => toggleTheme('dark')}
              data-hs-theme-click-value="dark"
            >
              <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            </button>
            <button
              type="button"
              className="hs-dark-mode-active:block hidden pl-2 inline-flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={() => toggleTheme('light')}
              data-hs-theme-click-value="light"
            >
              <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/>
                <path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/>
                <path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            </button>
            </div>

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                <button
                  type="button"
                  className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                  data-hs-dropdown-toggle
                >
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{user?.firstName || 'User'}</span>
                  <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>

                <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 shadow-md bg-white rounded-lg mt-2 dark:bg-black dark:border dark:border-gray-700" role="menu">
                  <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-300">{user?.email}</p>
                  </div>
                  <div className="p-1 space-y-0.5">
                    <Link to="/dashboard" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                        <path d="M3 9h18"/>
                        <path d="M9 21V9"/>
                      </svg>
                      Dashboard
                    </Link>
                    <Link to="/profile" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      Settings
                    </Link>
                    <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-700 dark:hover:text-red-400"
                    >
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/login"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden inline-flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-collapse="#navbar-collapse"
            >
              <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/>
              </svg>
              <svg className="hs-collapse-open:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="navbar-collapse" className="hidden basis-full grow lg:hidden">
          <div className="flex flex-col gap-5 mt-5">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium ${isActive 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `font-medium ${isActive 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500'
                }`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `font-medium ${isActive 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `font-medium ${isActive 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500'
                }`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;