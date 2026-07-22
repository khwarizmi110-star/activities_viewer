import React, { useState, useRef, useEffect } from 'react';
import { Search, Printer, Columns, Download, FileSpreadsheet, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
// import { useDialog } from '../../controllers/useDialog';

const SearchBar = ({
    searchTerm,
    setSearchTerm,
    searchPlaceholder,
    selectedCount,
    selectedActivities,
    isRtl,
    noSelectionError,
    visibleColumns,
    toggleColumn,
    handleOpen,
    t
}) => {
    const [showColumnsMenu, setShowColumnsMenu] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);

    const exportMenuRef = useRef(null);
    const columnsMenuRef = useRef(null);
    // const { handleOpen } = useDialog()

    // Close menus on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
                setShowExportMenu(false);
            }
            if (columnsMenuRef.current && !columnsMenuRef.current.contains(event.target)) {
                setShowColumnsMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onPrintClick = () => {
        setShowExportMenu(false);
        if (selectedCount === 0) {
            toast.error(noSelectionError, {
                style: {
                    borderRadius: '12px',
                    background: '#1e293b',
                    color: '#fff',
                    fontFamily: isRtl ? '"IBM Plex Sans Arabic", sans-serif' : 'Inter, sans-serif'
                },
            });
            return;
        }
        window.print();
    };

    const onExcelClick = () => {
        setShowExportMenu(false);
        if (selectedCount === 0) {
            toast.error(t.noSelectionErrorExport || noSelectionError, {
                style: {
                    borderRadius: '12px',
                    background: '#1e293b',
                    color: '#fff',
                    fontFamily: isRtl ? '"IBM Plex Sans Arabic", sans-serif' : 'Inter, sans-serif'
                },
            });
            return;
        }

        // Prepare data based on visible columns
        const exportData = selectedActivities.map(activity => {
            const row = {};
            if (visibleColumns.activityId) row[t.activityId] = activity.activityId;
            if (visibleColumns.descriptionAr) row[t.descriptionAr] = activity.product_description_ar;
            if (visibleColumns.descriptionEn) row[t.descriptionEn] = activity.product_description_en;
            // if (visibleColumns.classification) row[t.classification] = activity.classification_text;
            // if (visibleColumns.sectorClassification) row[t.sectorClassification] = activity.sector_classification;
            if (visibleColumns.saudisPercentage) row[t.saudisPercentage] = `${activity.saudis_percentage}%`;
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        // Add RTL support if needed by Excel (via sheet property)
        if (isRtl) {
            if (!worksheet['!views']) worksheet['!views'] = [];
            worksheet['!views'].push({ rightToLeft: true });
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Activities");
        XLSX.writeFile(workbook, "Selected_Activities.xlsx");
    };

    const columnOptions = [
        { key: 'activityId', label: t.activityId },
        { key: 'descriptionAr', label: t.descriptionAr },
        { key: 'descriptionEn', label: t.descriptionEn },
        // { key: 'classification', label: t.classification },
        // { key: 'sectorClassification', label: t.sectorClassification },
        { key: 'saudisPercentage', label: t.saudisPercentage }
    ];

    return (
        <div className="glass-panel p-4 md:p-6 mb-6 flex flex-col lg:flex-row justify-between items-center gap-4 relative z-20">
            <div className="relative flex-1 w-full lg:max-w-2xl">
                <Search size={20} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 transition-colors ${isRtl ? 'right-4' : 'left-4'}`} />
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full bg-white/80 border-2 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-full py-3 shadow-inner transition-all ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative w-full sm:w-auto" ref={columnsMenuRef}>
                    <button
                        onClick={() => {
                            setShowColumnsMenu(!showColumnsMenu);
                            setShowExportMenu(false);
                        }}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-3 rounded-full shadow-sm transition-all font-semibold"
                    >
                        <Columns size={18} />
                        {t.columns}
                    </button>

                    {showColumnsMenu && (
                        <div className={`absolute top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 ${isRtl ? 'left-0' : 'right-0'}`}>
                            <div className="p-2 flex flex-col gap-1">
                                {columnOptions.map(col => (
                                    <label key={col.key} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={visibleColumns[col.key]}
                                                onChange={() => toggleColumn(col.key)}
                                                className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded focus:ring-indigo-500 checked:bg-indigo-600 checked:border-indigo-600 transition-all cursor-pointer"
                                            />
                                            <svg className="absolute w-3.5 h-3.5 text-white left-[3px] top-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">{col.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative w-full sm:w-auto" ref={exportMenuRef}>
                    <button
                        onClick={() => {
                            // setShowExportMenu(!showExportMenu);
                            // setShowColumnsMenu(false);
                            handleOpen()
                        }}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white px-5 py-3 rounded-full shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] transition-all font-semibold"
                    >
                        <Download size={18} className={isRtl ? 'ml-1' : 'mr-1'} />
                        {t.exportButton || 'Export'}
                        <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-sm mx-2">
                            {selectedCount}
                        </span>

                        <ChevronDown size={16} className={`transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
                    </button>



                    {showExportMenu && (
                        <div className={`absolute top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 ${isRtl ? 'left-0' : 'right-0'}`}>
                            <div className="p-1 flex flex-col">
                                <button onClick={onPrintClick} className="flex items-center gap-3 p-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors w-full text-left">
                                    <Printer size={16} />
                                    {t.printOption || 'Print (PDF)'}
                                </button>
                                <button onClick={onExcelClick} className="flex items-center gap-3 p-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors w-full text-left">
                                    <FileSpreadsheet size={16} />
                                    {t.excelOption || 'Export to Excel'}
                                </button>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
