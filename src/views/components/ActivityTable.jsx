import React from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp, Search } from 'lucide-react';

const ActivityTable = ({
    currentItems,
    filteredActivities,
    selectedIdsSet,
    selectedIdsArray,
    handleSelect,
    handleSelectAll,
    sortConfig,
    requestSort,
    t,
    isRtl,
    visibleColumns
}) => {

    const renderSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc'
                ? <ChevronUp size={14} className="text-indigo-600" />
                : <ChevronDown size={14} className="text-indigo-600" />;
        }
        return <ArrowUpDown size={14} className="text-slate-400 opacity-50" />;
    };

    return (
        <div className="glass-panel overflow-hidden mb-6 z-10 relative">
            <div className="overflow-x-auto max-h-[75vh] custom-scrollbar p-2 lg:p-0" >
                <table className={`w-full border-collapse ${isRtl ? 'text-right' : 'text-left'}`}>
                    <thead className="hidden lg:table-header-group bg-slate-50/90 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200">
                        <tr>
                            <th className="p-4 w-14">
                                <div className="flex justify-center">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll(filteredActivities)}
                                            checked={selectedIdsArray.length === filteredActivities.length && filteredActivities.length > 0}
                                            className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded focus:ring-indigo-500 checked:bg-indigo-600 checked:border-indigo-600 transition-all cursor-pointer bg-white shadow-sm"
                                        />
                                        <svg className="absolute w-3.5 h-3.5 text-white left-[3px] top-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </th>
                            {visibleColumns.activityId && (
                                <th onClick={() => requestSort('activityId')} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        {t.activityId} {renderSortIcon('activityId')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.descriptionAr && (
                                <th onClick={() => requestSort('product_description_ar')} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        {t.descriptionAr} {renderSortIcon('product_description_ar')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.descriptionEn && (
                                <th onClick={() => requestSort('product_description_en')} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        {t.descriptionEn} {renderSortIcon('product_description_en')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.classification && (
                                <th onClick={() => requestSort('classification_text')} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        {t.classification} {renderSortIcon('classification_text')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.sectorClassification && (
                                <th onClick={() => requestSort('sector_classification')} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        {t.sectorClassification} {renderSortIcon('sector_classification')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.saudisPercentage && (
                                <th onClick={() => requestSort('saudis_percentage')} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        {t.saudisPercentage} {renderSortIcon('saudis_percentage')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.document_to_be_added && (
                                <th onClick={() => requestSort('document_to_be_added')} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        {t.document_to_be_added} {renderSortIcon('document_to_be_added')}
                                    </div>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="block lg:table-row-group divide-y-0 lg:divide-y lg:divide-slate-100">
                        {/* Mobile Select All Header (Only visible on small screens) */}
                        <tr className="block lg:hidden mb-4 p-2 bg-white/50 rounded-xl">
                            <td className="block">
                                <label className="flex items-center justify-between cursor-pointer px-2">
                                    <span className="text-sm font-bold text-slate-600">تحديد الكل</span>
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll(filteredActivities)}
                                            checked={selectedIdsArray.length === filteredActivities.length && filteredActivities.length > 0}
                                            className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded focus:ring-indigo-500 checked:bg-indigo-600 checked:border-indigo-600 transition-all shadow-sm"
                                        />
                                        <svg className="absolute w-3.5 h-3.5 text-white left-[3px] top-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </label>
                            </td>
                        </tr>

                        {currentItems.map((activity, index) => (
                            <tr key={activity.activityId} className="group block lg:table-row bg-white lg:bg-transparent rounded-2xl lg:rounded-none shadow-sm border border-slate-100 lg:border-none hover:border-blue-500 lg:shadow-none mb-4 lg:mb-0 p-4 lg:p-0 hover:bg-slate-50 lg:hover:bg-white/90 lg:hover:scale-[1.002] transition-all duration-200"

                            >
                                <td className="flex lg:table-cell items-center justify-between lg:justify-center border-b border-slate-100 lg:border-none pb-4 lg:pb-0 mb-4 lg:mb-0 lg:p-4">
                                    <span className="lg:hidden text-xs font-bold text-slate-400">تحديد</span>
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIdsSet.has(activity.activityId)}
                                            onChange={() => handleSelect(activity.activityId)}
                                            className="peer appearance-none w-6 h-6 lg:w-5 lg:h-5 border-2 border-slate-300 rounded-md lg:rounded focus:ring-indigo-500 checked:bg-indigo-600 checked:border-indigo-600 transition-all cursor-pointer bg-slate-50 lg:bg-white shadow-sm"
                                        />
                                        <svg className="absolute w-4 h-4 lg:w-3.5 lg:h-3.5 text-white left-[4px] lg:left-[3px] top-[4px] lg:top-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </td>
                                {visibleColumns.activityId && (
                                    <td className="flex lg:table-cell flex-col lg:flex-row items-start lg:items-center justify-between lg:justify-start lg:p-4 mb-3 lg:mb-0 gap-1 lg:gap-0">
                                        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.activityId}</span>
                                        <span className="font-mono text-sm lg:text-sm font-bold lg:font-semibold bg-indigo-50/50 lg:bg-slate-100 text-indigo-700 lg:text-slate-600 px-3 py-1.5 lg:px-2 lg:py-1 rounded-lg lg:rounded-md border border-indigo-100/50 lg:border-none shadow-sm lg:shadow-none w-full lg:w-auto text-center lg:text-left">
                                            {activity.activityId}
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.descriptionAr && (
                                    <td className="flex lg:table-cell flex-col items-start justify-between lg:justify-start lg:p-4 mb-3 lg:mb-0 gap-1 lg:max-w-[300px]">
                                        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.descriptionAr}</span>
                                        <div className="text-[15px] lg:text-sm text-slate-800 lg:text-slate-700 font-semibold lg:font-medium leading-relaxed">
                                            {activity.product_description_ar}
                                        </div>
                                    </td>
                                )}
                                {visibleColumns.descriptionEn && (
                                    <td className={`flex lg:table-cell flex-col items-start justify-between lg:justify-start lg:p-4 mb-3 lg:mb-0 gap-1 lg:max-w-[300px] ${isRtl ? 'lg:text-right' : 'lg:text-left'} dir-ltr`}>
                                        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider block w-full text-right">{t.descriptionEn}</span>
                                        <div className="text-[15px] lg:text-sm text-slate-600 leading-relaxed text-left w-full">
                                            {activity.product_description_en || '-'}
                                        </div>
                                    </td>
                                )}
                                {visibleColumns.classification && (
                                    <td className="flex lg:table-cell items-center justify-between lg:justify-start lg:p-4 mb-3 lg:mb-0">
                                        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.classification}</span>
                                        <span className={`inline-flex items-center px-3 py-1 lg:px-2.5 lg:py-0.5 rounded-full text-xs font-bold lg:font-semibold shadow-sm lg:shadow-none ${activity.classification_text === 'Allowed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 lg:border-none' : 'bg-rose-100 text-rose-800 border border-rose-200 lg:border-none'
                                            }`}>
                                            {activity.classification_text || '-'}
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.sectorClassification && (
                                    <td className="flex lg:table-cell items-center justify-between lg:justify-start lg:p-4 mb-3 lg:mb-0">
                                        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.sectorClassification}  </span>
                                        <span className="inline-flex items-center px-3 py-1 lg:px-2.5 lg:py-0.5 rounded-lg lg:rounded-md text-xs font-bold lg:font-medium bg-indigo-50 text-red-700 border border-indigo-100 shadow-sm lg:shadow-none">
                                            {activity.sector_classification || '-'}
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.saudisPercentage && (
                                    <td className="flex lg:table-cell flex-col lg:flex-row items-stretch lg:items-center justify-between lg:justify-start lg:p-4 pt-2 lg:pt-4 border-t border-slate-100 lg:border-none mt-2 lg:mt-0 gap-2 lg:gap-0 lg:min-w-[120px]">
                                        <div className="flex items-center justify-between lg:hidden mb-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.saudisPercentage}</span>
                                            <span className="text-sm font-black text-slate-800">{activity.saudis_percentage || "-"} % </span>
                                        </div>
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="h-2.5 lg:h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${Math.min(activity.saudis_percentage || 0, 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="hidden lg:inline text-xs font-bold text-slate-700 w-10 text-right">
                                                {activity.saudis_percentage || "N/A"}
                                            </span>
                                        </div>
                                    </td>
                                )}
                                {visibleColumns.document_to_be_added && (
                                    <td className="flex lg:table-cell items-center justify-between lg:justify-start lg:p-4 mb-3 mt-6 lg:mb-0">

                                        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.document_to_be_added}</span>
                                        <span className="inline-flex items-center px-3 py-1 lg:px-2.5 lg:py-0.5 rounded-lg lg:rounded-md text-xs font-bold lg:font-medium bg-indigo-50 text-red-700 border border-indigo-100 shadow-sm lg:shadow-none">
                                            {activity?.document_to_be_added[0].document_type_description_new_ar
                                                || '-'}

                                        </span>
                                    </td>
                                )}

                            </tr>
                        ))}
                        {currentItems.length === 0 && (
                            <tr>
                                <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="p-8 lg:p-16 text-center text-slate-500 block lg:table-cell">
                                    <div className="flex flex-col items-center justify-center bg-white lg:bg-transparent rounded-2xl p-8 lg:p-0 shadow-sm lg:shadow-none">
                                        <div className="w-16 h-16 mb-4 rounded-full bg-indigo-50 flex items-center justify-center">
                                            <Search size={24} className="text-indigo-400" />
                                        </div>
                                        <p className="text-lg font-medium text-slate-600">{t.noActivitiesFound}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityTable;
