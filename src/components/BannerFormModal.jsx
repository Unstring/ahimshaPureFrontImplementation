import React, { useState, useEffect, useRef } from 'react';

const BannerFormModal = ({ banner, onClose, onSubmit }) => {
  const modalRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    message: 'hello',
    ctaText: 'test',
    ctaLink: '/hello',
    bannerId: 'testing',
    behavior: 'default',
    position: 'top',
    removable: true,
    isActive: true
  });

  useEffect(() => {
    if (banner) {
      setFormData(banner);
    }
  }, [banner]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    // Initialize Preline dropdowns when modal opens
    if (typeof window !== 'undefined') {
      import('preline/preline').then(({ HSDropdown }) => {
        HSDropdown.autoInit();
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setFormData({
        message: '',
        ctaText: '',
        ctaLink: '',
        bannerId: '',
        behavior: 'default',
        position: 'top',
        removable: true,
        isActive: true
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-[80] pb-80">
      <div className="relative top-20 mx-auto p-8 border border-gray-200 dark:border-gray-700 w-[32rem] shadow-lg rounded-xl bg-white dark:bg-black" ref={modalRef}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
        >
          <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>

        <div className="text-center mb-6">
          <h3 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
            {banner ? 'Edit Banner' : 'Create New Banner'}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Fill in the details below to {banner ? 'update' : 'create'} your banner
          </p>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm mb-2 dark:text-white">Message</label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                  rows="3"
                />
              </div>
            </div>

            {/* Banner ID */}
            <div>
              <label htmlFor="bannerId" className="block text-sm mb-2 dark:text-white">Banner ID</label>
              <div className="relative">
                <input
                  type="text"
                  id="bannerId"
                  name="bannerId"
                  value={formData.bannerId}
                  onChange={handleChange}
                  required
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                />
              </div>
            </div>

            {/* CTA Text */}
            <div>
              <label htmlFor="ctaText" className="block text-sm mb-2 dark:text-white">CTA Text</label>
              <div className="relative">
                <input
                  type="text"
                  id="ctaText"
                  name="ctaText"
                  value={formData.ctaText}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                />
              </div>
            </div>

            {/* CTA Link */}
            <div>
              <label htmlFor="ctaLink" className="block text-sm mb-2 dark:text-white">CTA Link</label>
              <div className="relative">
                <input
                  id="ctaLink"
                  name="ctaLink"
                  value={formData.ctaLink}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                />
              </div>
            </div>

            {/* Position Dropdown */}
            <div>
              <label className="block text-sm mb-2 dark:text-white">Position</label>
              <div className="hs-dropdown [--strategy:absolute] [--flip:false] relative inline-flex w-full">
                <button 
                  id="hs-dropdown-position" 
                  type="button" 
                  className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 w-full justify-between" 
                  aria-haspopup="menu" 
                  aria-expanded="false" 
                  aria-label="Position"
                >
                  {formData.position === 'top' ? 'Top' : 'Bottom'}
                  <svg className="hs-dropdown-open:rotate-180 size-4 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>

                <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 w-full bg-white shadow-md rounded-lg p-2 dark:bg-gray-900 dark:border dark:border-gray-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-position">
                  <a 
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 dark:focus:bg-gray-800" 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange({ target: { name: 'position', value: 'top' } });
                    }}
                  >
                    Top
                  </a>
                  <a 
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 dark:focus:bg-gray-800" 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange({ target: { name: 'position', value: 'bottom' } });
                    }}
                  >
                    Bottom
                  </a>
                </div>
              </div>
            </div>

            {/* Behavior Dropdown */}
            <div>
              <label className="block text-sm mb-2 dark:text-white">Behavior</label>
              <div className="hs-dropdown [--strategy:absolute] [--flip:false] relative inline-flex w-full">
                <button 
                  id="hs-dropdown-behavior" 
                  type="button" 
                  className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 w-full justify-between" 
                  aria-haspopup="menu" 
                  aria-expanded="false" 
                  aria-label="Behavior"
                >
                  {formData.behavior === 'default' ? 'Fixed' : formData.behavior === 'sticky' ? 'Sticky' : 'Static'}
                  <svg className="hs-dropdown-open:rotate-180 size-4 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>

                <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 w-full bg-white shadow-md rounded-lg p-2 dark:bg-gray-900 dark:border dark:border-gray-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-behavior">
                  <a 
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 dark:focus:bg-gray-800" 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange({ target: { name: 'behavior', value: 'default' } });
                    }}
                  >
                    Fixed
                  </a>
                  <a 
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 dark:focus:bg-gray-800" 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange({ target: { name: 'behavior', value: 'sticky' } });
                    }}
                  >
                    Sticky
                  </a>
                  <a 
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 dark:focus:bg-gray-800" 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange({ target: { name: 'behavior', value: 'floating' } });
                    }}
                  >
                    Static
                  </a>
                </div>
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-4">
              {/* Removable Toggle */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-900 dark:border-gray-800">
                <label htmlFor="removable" className="flex justify-between p-4">
                  <span className="flex items-center gap-x-3">
                    <svg className="size-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                    </svg>
                    <span>
                      <span className="block font-medium text-gray-800 dark:text-gray-200">Removable</span>
                      <span className="block text-sm text-gray-500">Allow users to dismiss this banner</span>
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    id="removable"
                    name="removable"
                    checked={formData.removable}
                    onChange={handleChange}
                    className="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800 before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
                  />
                </label>
              </div>

              {/* Active Status Toggle */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-900 dark:border-gray-800">
                <label htmlFor="isActive" className="flex justify-between p-4">
                  <span className="flex items-center gap-x-3">
                    <svg className="size-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>
                    <span>
                      <span className="block font-medium text-gray-800 dark:text-gray-200">Active Status</span>
                      <span className="block text-sm text-gray-500">Enable or disable this banner</span>
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800 before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
                  />
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-x-2 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block size-4 border-2 border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>{banner ? 'Update' : 'Create'} Banner</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerFormModal; 