import React from 'react';

const PrintView = ({ selectedActivities, selectedIdsArray, t, isRtl, visibleColumns }) => {
    return (
        <div className="print-only hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="border-b-2 border-slate-900 pb-4 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">{t.reportTitle}</h1>
                    <p className="text-sm text-slate-500 uppercase tracking-widest">{t.activitySelectionReport}</p>
                </div>
                <div className={`text-sm ${isRtl ? 'text-left' : 'text-right'}`}>
                    <div className="mb-1">
                        <span className="font-bold mx-2">{t.date}:</span>
                        <span>{new Date().toLocaleDateString(isRtl ? 'ar-SA' : 'en-US')}</span>
                    </div>
                    <div>
                        <span className="font-bold mx-2">{t.activityCount}:</span>
                        <span>{selectedActivities.length}</span>
                    </div>
                </div>
            </div>

            <table className="w-full border-collapse mb-8 text-sm">
                <thead>
                    <tr>
                        {visibleColumns.activityId && (
                            <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-slate-900 print-color-adjust-exact">
                                {t.activityId}
                            </th>
                        )}
                        {visibleColumns.descriptionAr && (
                            <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-slate-900 print-color-adjust-exact">
                                {t.descriptionAr}
                            </th>
                        )}
                        {visibleColumns.descriptionEn && (
                            <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-slate-900 print-color-adjust-exact">
                                {t.descriptionEn}
                            </th>
                        )}
                        {/* {visibleColumns.classification && (
                            <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-slate-900 print-color-adjust-exact">
                                {t.classification}
                            </th>
                        )}
                        {visibleColumns.sectorClassification && (
                            <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-slate-900 print-color-adjust-exact">
                                {t.sectorClassification}
                            </th>
                        )} */}
                        {visibleColumns.saudisPercentage && (
                            <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-slate-900 print-color-adjust-exact">
                                {t.saudisPercentage}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {selectedActivities.map(activity => (
                        <tr key={activity.activityId}>
                            {visibleColumns.activityId && (
                                <td className="border border-slate-300 p-2 font-mono">{activity.activityId}</td>
                            )}
                            {visibleColumns.descriptionAr && (
                                <td className="border border-slate-300 p-2 text-right dir-rtl">{activity.product_description_ar}</td>
                            )}
                            {visibleColumns.descriptionEn && (
                                <td className="border border-slate-300 p-2 text-left dir-ltr">{activity.product_description_en || '-'}</td>
                            )}
                            {/* {visibleColumns.classification && (
                                <td className="border border-slate-300 p-2 text-center">{activity.classification_text}</td>
                            )}
                            {visibleColumns.sectorClassification && (
                                <td className="border border-slate-300 p-2 text-center">{activity.sector_classification}</td>
                            )} */}
                            {visibleColumns.saudisPercentage && (
                                <td className="border border-slate-300 p-2 text-center font-bold">{activity.saudis_percentage}%</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <div className="mt-8 page-break-inside-avoid">
                <h3 className="text-lg font-bold border-b border-slate-200 pb-2 mb-4">{t.jsonArrayTitle}</h3>
                <div className="bg-slate-50 border border-slate-200 p-4 font-mono text-xs break-all rounded-lg">
                    {JSON.stringify(selectedIdsArray)}
                </div>
            </div> */}
            {/* 
            <div className="mt-12 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
                <p>{t.autoGenerated} {t.footerTimestamp} {new Date().toLocaleTimeString(isRtl ? 'ar-SA' : 'en-US')}</p>
                <p>{t.autoGenerated} {t.footerTimestamp} {new Date().toLocaleTimeString(isRtl ? 'ar-SA' : 'en-US')}</p>
            </div> */}
        </div>
    );
};

export default PrintView;
