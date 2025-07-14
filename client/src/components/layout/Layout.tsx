import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatBot from '../ui/ChatBot';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                <Navbar onMenuToggle={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-auto pt-16">
                    <div className="py-8">
                        {children}
                    </div>
                </main>
            </div>

            <ChatBot />
        </div>
    );
};

export default Layout;