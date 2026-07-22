import { FileSpreadsheet, Printer } from "lucide-react";
import { translations } from '../../utils/translations';
import { useActivities } from "../../controllers/useActivities";

export default function DialogCompnent({ children, isOpen, handleClose, title, exportExcel }) {
    const { language } = useActivities();
    const t = translations[language] || translations.en;
    return (
        isOpen &&
        <div id="modalOverlay"
            class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)]">

            <div className="absolute inset-0 bg-black/50"></div>

            <div role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1"
                class="w-full max-w-lg bg-white border border-slate-100 shadow-lg rounded-lg relative max-h-[95vh] overflow-y-auto outline-none p-4 md:p-6 dark:bg-neutral-800 dark:border-neutral-700">

                <div class="flex items-center pb-3 border-b border-slate-300 dark:border-neutral-700">
                    <h3 id="modal-title" class="text-slate-900 text-lg font-semibold flex-1 dark:text-slate-50">{title}</h3>

                    <button type="button" id="closeModal" aria-label="Close modal"
                        onClick={handleClose}
                        class="ml-auto flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="size-3 cursor-pointer fill-slate-500 hover:fill-red-600 dark:fill-slate-400 dark:hover:fill-red-500"
                            aria-hidden="true" viewBox="0 0 329.269 329">
                            <path
                                d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0" />
                        </svg>
                    </button>
                </div>

                <div className="my-6">
                    {children}

                </div>

                <div class="border-t border-slate-300 pt-4 flex justify-end gap-4 md:pt-6 dark:border-neutral-700">
                    <button type="button" id="cancelBtn" onClick={exportExcel}
                        class="px-3.5 flex items-center gap-2 py-2 text-slate-700 text-sm font-semibold rounded-md cursor-pointer bg-green-200 border border-slate-300 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-50 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:border-neutral-600">
                        <FileSpreadsheet size={16} />
                        {t.excelOption || 'Export to Excel'}
                    </button>
                    <button type="button"
                        onClick={window.print}
                        class="px-3.5 flex items-center  gap-2 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 border border-blue-600 transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                        <Printer size={16} />
                        {t.printOption || 'Print (PDF)'}
                    </button>
                </div>

            </div>
        </div>

    )
}