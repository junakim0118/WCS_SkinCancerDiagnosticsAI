import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4">
            <div className="flex flex-col">
                <Link href="/" className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">Skin Cancer Diagnostics AI</Link>
                <p className="text-sm text-gray-500">Early detection powered by AI</p>
            </div>

            <nav>
                <ul className="flex gap-4 items-center mt-3 sm:mt-0">
                    <li><Link href="#why-use" className="text-gray-500 hover:text-gray-200">Why Use</Link></li>
                    <li><Link href="#how-it-works" className="text-gray-500 hover:text-gray-200">How It Works</Link></li>
                    <li><Link href="#ai-chatbot" className="text-gray-500 hover:text-gray-200">AI Chatbot</Link></li>
                    <li><Link href="#connect" className="text-gray-500 hover:text-gray-200">Connect</Link></li>
                    <li>
                      <Link href="../diagnostics">
                        <button className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md">Try Diagnostics</button>
                      </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;