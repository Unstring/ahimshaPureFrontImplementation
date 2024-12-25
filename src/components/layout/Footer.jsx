import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { EXTERNAL_URLS, ROUTES } from '../../config/constants';

const Footer = () => {
    return (
        <footer className="dark:bg-gradient-to-t mt-24 dark:from-blue-900/10 dark:to-transparent">
            <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="pb-10">
                    {/* Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                        {/* Logo Column */}
                        <div className="col-span-full lg:col-span-1">
                            <Link to="/" className="flex-none inline-block text-xl font-bold text-gray-800 dark:text-white">
                                <div className="flex items-center gap-2">
                                    <Logo className="w-8 h-8" />
                                    <span>Ahimsa Pure</span>
                                </div>
                            </Link>
                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                Empowering sustainable living through innovative solutions.
                            </p>
                        </div>

                        {/* Company Column */}
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-neutral-200">Company</h4>
                            <div className="mt-3 grid space-y-3 text-sm">
                                <p>
                                    <Link to="/about" className="text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-300">
                                        About Us
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/contact" className="text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-300">
                                        Contact
                                    </Link>
                                </p>
                                <p>
                                    <button
                                        type="button"
                                        className="text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-300"
                                        onClick={() => window.location.href = 'mailto:contact@ahimsapure.com'}
                                    >
                                        Support
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* Legal Column */}
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-neutral-200">Legal</h4>
                            <div className="mt-3 grid space-y-3 text-sm">
                                <p>
                                    <Link to="/terms" className="text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-300">
                                        Terms & Conditions
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/privacy" className="text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-300">
                                        Privacy Policy
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/refund" className="text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-300">
                                        Refund Policy
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Connect Column */}
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-neutral-200">Connect</h4>
                            <div className="mt-3 grid space-y-3 text-sm">
                                <p>
                                    <a
                                        href={EXTERNAL_URLS.SOCIAL.TWITTER}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-300"
                                    >
                                        Twitter
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href={EXTERNAL_URLS.SOCIAL.INSTAGRAM}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-300"
                                    >
                                        Instagram
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href={EXTERNAL_URLS.SOCIAL.LINKEDIN}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-900 dark:text-neutral-500 dark:hover:text-neutral-300"
                                    >
                                        LinkedIn
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* End Grid */}

                    {/* Copyright */}
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-neutral-500">
                        <span>© {new Date().getFullYear()} </span>
                        <Logo className="w-6 h-6" />
                        <span>AhimsaPure.com. All rights reserved.</span>
                    </div>

                </div>

                {/* Gradient Line */}
                <div className="bg-[radial-gradient(closest-side,theme(colors.violet.600),theme(colors.blue.600),transparent)] h-1"></div>
            </div >
        </footer >
    );
};

export default Footer; 