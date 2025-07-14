import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Settings, Database, Menu, Zap, Bell, Search } from 'lucide-react';

interface NavbarProps {
    onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="glass-effect fixed w-full top-0 z-50 border-b border-white/10">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={onMenuToggle}
                            className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 lg:hidden"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <Link to="/" className="flex items-center space-x-3 ml-2 lg:ml-0 group">
                            <div className="relative">
                                <div className="gradient-primary rounded-2xl p-2.5 shadow-glow group-hover:shadow-purple-500/40 transition-all duration-300">
                                    <Zap className="h-7 w-7 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gradient">Zealthy</span>
                                <span className="text-xs text-gray-500 -mt-1">Dashboard</span>
                            </div>
                        </Link>
                    </div>

                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/80 transition-all duration-200 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Navigation Links - Desktop */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-1">
                            <Link
                                to="/"
                                className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover-lift ${
                                    isActive('/')
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                }`}
                            >
                                <User className="h-4 w-4" />
                                <span>Onboarding</span>
                            </Link>

                            <Link
                                to="/admin"
                                className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover-lift ${
                                    isActive('/admin')
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                }`}
                            >
                                <Settings className="h-4 w-4" />
                                <span>Admin</span>
                            </Link>

                            <Link
                                to="/data"
                                className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover-lift ${
                                    isActive('/data')
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                }`}
                            >
                                <Database className="h-4 w-4" />
                                <span>Data</span>
                            </Link>
                        </div>

                        {/* Notification Bell */}
                        <button className="relative p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-all duration-200">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></span>
                        </button>

                        {/* Profile Avatar */}
                        <div className="relative">
                            <button className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-white/50 transition-all duration-200">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">Z</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;