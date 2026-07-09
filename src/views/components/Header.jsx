import React from 'react';

const Header = ({ toggleLang, langToggleText, title, isRtl }) => {
    return (
        <header className="relative flex flex-col md:flex-row items-center justify-between mb-8 md:mb-10 gap-4 pt-4 md:pt-0">
            <div className={`w-full md:w-auto flex justify-center md:justify-start ${isRtl ? 'md:order-last' : 'md:order-first'}`}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 tracking-tight text-center md:text-left">
                    {title}
                </h1>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-end">
                <button
                    className="bg-white/80 hover:bg-white text-indigo-700 border border-indigo-100 px-6 py-2.5 md:px-4 md:py-2 rounded-xl shadow-sm transition-all font-medium text-sm w-full md:w-auto"
                    onClick={toggleLang}
                >
                    {langToggleText}
                </button>
            </div>
        </header>
    );
};

export default Header;
