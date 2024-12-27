import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners, createBanner, updateBanner, deleteBanner } from '../store/slices/bannerSlice';
import BannerFormModal from '../components/BannerFormModal';
import { store } from '../store';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
// import { Tost } from '../components/Toast';

import Toast from '../components/common/Toast';

const BannerManagement = () => {
  const dispatch = useDispatch();
  const { items: banners, loading } = useSelector(state => state.banners);
  const auth = useSelector(state => state.auth);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [selectedBanners, setSelectedBanners] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, ids: null });

  useEffect(() => {
    console.log('Current Auth State:', auth);
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleCreateBanner = async (data) => {
    try {
      await dispatch(createBanner(data)).unwrap();
      setIsAddModalOpen(false);
      Toast.success('Banner created successfully');
    } catch (error) {
      console.error('Failed to create banner:', error.response?.data || error);
      Tost.error('Failed to create banner');
    }
  };

  const handleUpdateBanner = async (data) => {
    try {
      await dispatch(updateBanner({ uuid: data.uuid, data })).unwrap();
      setEditingBanner(null);
      Tost.success('Banner updated successfully');
    } catch (error) {
      console.error('Failed to update banner:', error);
      Tost.error('Failed to update banner');
    }
  };

  const handleDelete = async (uuid) => {
    setDeleteConfirmation({ show: true, ids: Array.isArray(uuid) ? uuid : [uuid] });
  };

  const handleConfirmDelete = async () => {
    try {
      for (const uuid of deleteConfirmation.ids) {
        await dispatch(deleteBanner(uuid)).unwrap();
      }
      setDeleteConfirmation({ show: false, ids: null });
      setSelectedBanners([]);
      Tost.success(
        deleteConfirmation.ids.length > 1 
          ? 'Banners deleted successfully' 
          : 'Banner deleted successfully'
      );
    } catch (error) {
      console.error('Failed to delete banner(s):', error);
      Tost.error('Failed to delete banner(s)');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBanners(banners.map(banner => banner.uuid));
    } else {
      setSelectedBanners([]);
    }
  };

  const handleSelectBanner = (uuid) => {
    setSelectedBanners(prev => {
      if (prev.includes(uuid)) {
        return prev.filter(id => id !== uuid);
      } else {
        return [...prev, uuid];
      }
    });
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className=" border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:border-neutral-700">
              {/* Header */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                    Banners
                  </h2>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    {selectedBanners.length > 0 && (
                      <button
                        onClick={() => handleDelete(selectedBanners)}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-neutral-700 dark:hover:bg-gray-800"
                      >
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                        Delete ({selectedBanners.length})
                      </button>
                    )}

                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/><path d="M12 5v14"/>
                      </svg>
                      Create
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              {banners.length > 0 ? (
                <>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th scope="col" className="ps-6 py-3 text-start">
                          <label className="flex">
                            <input
                              type="checkbox"
                              className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                              onChange={handleSelectAll}
                              checked={selectedBanners.length === banners.length}
                            />
                            <span className="sr-only">Checkbox</span>
                          </label>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Message
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            CTA
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Position
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Behavior
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Removable
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Status
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Actions
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {banners.map((banner) => (
                        <tr key={banner.uuid}>
                          <td className="size-px whitespace-nowrap">
                            <div className="ps-6 py-2">
                              <label className="flex">
                                <input
                                  type="checkbox"
                                  className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  checked={selectedBanners.includes(banner.uuid)}
                                  onChange={() => handleSelectBanner(banner.uuid)}
                                />
                                <span className="sr-only">Checkbox</span>
                              </label>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-600 dark:text-neutral-400">
                                {banner.message}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-600 dark:text-neutral-400">
                                {banner.ctaText}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-600 dark:text-neutral-400">
                                {banner.position}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-gray-600 dark:text-neutral-400">
                                {banner.behavior}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className={`px-2 py-1 text-sm rounded ${
                                banner.removable 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {banner.removable ? 'Yes' : 'No'}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className={`px-2 py-1 text-sm rounded ${
                                banner.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {banner.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-1.5 flex justify-end">
                              <div className="group inline-flex items-center divide-x divide-gray-300 border border-gray-300 bg-white shadow-sm rounded-lg transition-all dark:divide-neutral-700 dark:bg-gray-700 dark:border-neutral-700">
                                <div className="hs-tooltip inline-block">
                                  <button
                                    onClick={() => setEditingBanner(banner)}
                                    className="hs-tooltip-toggle py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-s-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-neutral-700 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                  >
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                    <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-gray-700" role="tooltip">
                                      Edit Banner
                                    </span>
                                  </button>
                                </div>
                                <div className="hs-tooltip inline-block">
                                  <button
                                    onClick={() => handleDelete(banner.uuid)}
                                    className="hs-tooltip-toggle py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md bg-white text-red-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-neutral-700 dark:text-red-500 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                  >
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                    <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-gray-700" role="tooltip">
                                      Delete Banner
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Footer */}
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                    <div className="inline-flex items-center gap-x-2">
                      <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                        <button
                          id="show-records"
                          type="button"
                          className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-neutral-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-neutral-700"
                        >
                          <span>Show:</span> 10 Records
                          <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                          </svg>
                        </button>

                        <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 min-w-[10.7rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-neutral-700" role="menu">
                          <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-gray-700 dark:hover:text-neutral-300" href="#">
                            10 Records
                          </a>
                          <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-gray-700 dark:hover:text-neutral-300" href="#">
                            15 Records
                          </a>
                          <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-gray-700 dark:hover:text-neutral-300" href="#">
                            20 Records
                          </a>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-neutral-400">
                        of {banners.length} records
                      </span>
                    </div>

                    <div>
                      <div className="inline-flex gap-x-2">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-neutral-700 dark:text-white dark:hover:bg-gray-700">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6"/>
                          </svg>
                          Prev
                        </button>

                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-neutral-700 dark:text-white dark:hover:bg-gray-700">
                          Next
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No banners</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Get started by creating a new banner.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg 
                        className="-ml-1 mr-2 h-5 w-5" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      Create banner
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <BannerFormModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleCreateBanner}
        />
      )}

      {editingBanner && (
        <BannerFormModal
          banner={editingBanner}
          onClose={() => setEditingBanner(null)}
          onSubmit={handleUpdateBanner}
        />
      )}

      {deleteConfirmation.show && (
        <DeleteConfirmationModal
          isMultiple={deleteConfirmation.ids.length > 1}
          onClose={() => setDeleteConfirmation({ show: false, ids: null })}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default BannerManagement; 