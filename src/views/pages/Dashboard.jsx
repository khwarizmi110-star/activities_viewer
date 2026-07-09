import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useActivities } from '../../controllers/useActivities';
import { translations } from '../../utils/translations';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ActivityTable from '../components/ActivityTable';
import Pagination from '../components/Pagination';
import PrintView from '../components/PrintView';

const Dashboard = () => {
    const {
        loading,
        searchTerm,
        setSearchTerm,
        sortConfig,
        requestSort,
        currentPage,
        setCurrentPage,
        totalPages,
        currentItems,
        filteredActivities,
        selectedActivityIds,
        selectedIdsSet,
        handleSelect,
        handleSelectAll,
        language,
        isRtl,
        toggleLang,
        selectedActivities,
        visibleColumns,
        toggleColumn,
        itemsPerPage,
        setItemsPerPage
    } = useActivities();

    const t = translations[language] || translations.en;

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center gap-4" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">{t.loading}</p>
            </div>
        );
    }

    return (
        <div className="app-container m-4 mb-10" dir={isRtl ? 'rtl' : 'ltr'}>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3000 }} />

            <div className="no-print max-w-7xl mx-auto">

                <div className="flex flex-col">
                    <Header
                        toggleLang={toggleLang}
                        langToggleText={t.langToggle}
                        title={t.title}
                        isRtl={isRtl}
                    />
                    {/*  تكون اكثر احترافي و و و تكون رسالة تحذير و اخلاء مسؤولية عن محتوي الصفحة */}

                    <div className="glass-panel overflow-hidden mb-6 z-10 relative p-2 lg:p-0">
                        <div className="flex flex-col m-6">
                            <div className='text-red-500 font-bold text-center text-lg sm:text-xl'>
                                <p> تنبيه ⚠️:</p> <br />
                                هذه الصفحة للاطلاع فقط   وتوجيه المستثمر لمعرفة الانشطة التي يريد العمل بها

                                <br /> وغير مسؤولين عن اي خطأ في هذه البيانات

                            </div>

                        </div>
                    </div>

                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        searchPlaceholder={t.searchPlaceholder}
                        selectedCount={selectedActivityIds.length}
                        selectedActivities={selectedActivities}
                        isRtl={isRtl}
                        noSelectionError={t.noSelectionError}
                        visibleColumns={visibleColumns}
                        toggleColumn={toggleColumn}
                        t={t}
                    />

                    <ActivityTable
                        currentItems={currentItems}
                        filteredActivities={filteredActivities}
                        selectedIdsSet={selectedIdsSet}
                        selectedIdsArray={selectedActivityIds}
                        handleSelect={handleSelect}
                        handleSelectAll={handleSelectAll}
                        sortConfig={sortConfig}
                        requestSort={requestSort}
                        t={t}
                        isRtl={isRtl}
                        visibleColumns={visibleColumns}
                    />

                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        prevButtonText={t.prevButton}
                        nextButtonText={t.nextButton}
                        isRtl={isRtl}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        t={t}
                    />
                </div>
            </div>

            <PrintView
                selectedActivities={selectedActivities}
                selectedIdsArray={selectedActivityIds}
                t={t}
                isRtl={isRtl}
                visibleColumns={visibleColumns}
            />
        </div>
    );
};

export default Dashboard;
