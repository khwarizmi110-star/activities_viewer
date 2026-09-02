import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useActivities } from '../../controllers/useActivities';
import { translations } from '../../utils/translations';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ActivityTable from '../components/ActivityTable';
import Pagination from '../components/Pagination';
import PrintView from '../components/PrintView';
import { QiwaActivityDialog } from '../components/QiwaActivityDialog';
import { useDialog } from '../../controllers/useDialog.js'
import DialogCompnent from '../components/DialogCompnent.jsx';

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
        setItemsPerPage,
        expectedQiwaActivity,
        exportExcel

    } = useActivities();

    const { isOpen, handleOpen, handleClose } = useDialog();

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

            <div className="no-print max-w-7xl mx-auto pb-6">

                <div className="flex flex-col">
                    <Header
                        toggleLang={toggleLang}
                        langToggleText={t.langToggle}
                        title={t.title}
                        isRtl={isRtl}
                    />



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
                        handleOpen={handleOpen}
                    />
                    {/* 
                    {expectedQiwaActivity && <div className="glass-panel overflow-hidden mb-6 z-10 relative p-2 lg:p-0">
                        <div className="flex flex-col m-6">
                            <h1> Expected Qiwa Activty : {JSON.stringify(expectedQiwaActivity?.activityId)}</h1>

                        </div>
                    </div>
                    } */}
                    {/* <div>
                        <button className="glass-panel w-full max-w-md" onClick={() => handleOpen()}>Open Dialog</button>
                    </div> */}

                    <DialogCompnent
                        isOpen={isOpen}
                        handleClose={handleClose}
                        title={t.reportTitle}
                        exportExcel={() => exportExcel(t)}
                    >
                        <QiwaActivityDialog activities={selectedActivities} />

                    </DialogCompnent>

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

                {/*  تكون اكثر احترافي و و و تكون رسالة تحذير و اخلاء مسؤولية عن محتوي الصفحة */}

                <div className="overflow-hidden mb-10 z-10 relative p-2 lg:p-0 mt-8 bg-red-50 border border-red-300 rounded-2xl border-l-8  border-l-red-400 ">
                    <div className="flex flex-col m-6 gap-8 mt-4">
                        <div className='text-red-500 font-bold text-center text-lg sm:text-xl'>
                            <p> تنبيه ⚠️:</p> <br />
                            هذه الصفحة للاطلاع فقط   وتوجيه المستثمر لمعرفة الانشطة التي يريد العمل بها

                            <br /> وغير مسؤولين عن اي خطأ في هذه البيانات

                        </div>

                        <div className='text-red-500 font-bold text-center text-lg sm:text-xl '>
                            <p> Alert ⚠️:</p> <br />
                            This page is for viewing only to direct the investor to know the activities they want to work with

                            <br /> and we are not responsible for any error in this data

                        </div>


                    </div>
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
