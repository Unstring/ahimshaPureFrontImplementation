const DeleteConfirmationModal = ({ onClose, onConfirm, isMultiple }) => {
  return (
    <div className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24">
      <div className="relative w-full max-w-2xl mx-auto mt-0 opacity-100 ease-out transition-all">
        <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-black dark:border-neutral-800">
          <div className="absolute top-2 end-2">
            <button 
              type="button" 
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-neutral-400 dark:focus:bg-gray-600" 
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="p-4 sm:p-10 overflow-y-auto">
            <div className="flex gap-x-4 md:gap-x-7">
              <span className="shrink-0 inline-flex justify-center items-center size-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
              </span>

              <div className="grow">
                <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200">
                  Delete {isMultiple ? 'Selected Banners' : 'Banner'}
                </h3>
                <p className="text-gray-500 dark:text-neutral-500">
                  Are you sure you want to delete {isMultiple ? 'these banners' : 'this banner'}? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-950 dark:border-neutral-800">
            <button 
              type="button" 
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
              onClick={onConfirm}
            >
              Delete {isMultiple ? 'banners' : 'banner'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal; 