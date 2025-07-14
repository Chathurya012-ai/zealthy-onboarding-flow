import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Settings, Database, X, Zap, BarChart3, Users, Shield, Sparkles } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        {
            path: '/',
            icon: User,
            label: 'Onboarding',
            description: 'User registration flow',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            path: '/admin',
            icon: Settings,
            label: 'Admin Panel',
            description: 'System configuration',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            path: '/data',
            icon: Database,
            label: 'Data Management',
            description: 'User data overview',
            gradient: 'from-emerald-500 to-teal-500'
        },
    ];

    const quickActions = [
        { icon: BarChart3, label: 'Analytics', color: 'text-blue-500' },
        { icon: Users, label: 'Team', color: 'text-purple-500' },
        { icon: Shield, label: 'Security', color: 'text-emerald-500' },
    ];

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-80 glass-effect border-r border-white/10 transform transition-all duration-300 ease-out lg:translate-x-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:static lg:inset-0`}>

                {/* Header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
                    <Link to="/" className="flex items-center space-x-3 group" onClick={onClose}>
                        <div className="relative">
                            <div className="gradient-primary rounded-2xl p-2.5 shadow-glow group-hover:shadow-purple-500/40 transition-all duration-300">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gradient">Zealthy</span>
                            <span className="text-xs text-gray-500 -mt-1">Dashboard</span>
                        </div>
                    </Link>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-all duration-200 lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-6 space-y-8">
                    {/* Main Navigation */}
                    <div>
                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Main Navigation
                        </h3>
                        <div className="space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={`group flex items-center px-3 py-3 rounded-2xl text-sm font-medium transition-all duration-200 hover-lift ${
                                        isActive(item.path)
                                            ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-700 border border-purple-200/50'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                                >
                                    <div className={`p-2 rounded-xl mr-3 bg-gradient-to-r ${item.gradient} ${
                                        isActive(item.path) ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'
                                    } transition-all duration-200`}>
                                        <item.icon className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{item.label}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                                    </div>
                                    {isActive(item.path) && (
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Quick Actions
                        </h3>
                        <div className="space-y-2">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    className="w-full group flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-all duration-200"
                                >
                                    <action.icon className={`h-4 w-4 mr-3 ${action.color}`} />
                                    <span>{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status Card */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-4 border border-purple-200/20">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">System Status</h4>
                                <p className="text-xs text-gray-500">All systems operational</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-emerald-600 font-medium">Online</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/30">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">Z</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Zealthy Admin</p>
                            <p className="text-xs text-gray-500 truncate">admin@zealthy.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;