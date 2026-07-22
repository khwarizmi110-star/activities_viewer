import { qiwaActivity } from "../../utils/activityUtils";
import DialogCompnent from "./DialogCompnent";
import { translations } from "../../utils/translations";
import { useActivities } from "../../controllers/useActivities";




export const QiwaActivityDialog = ({ activities }) => {
    const activity = qiwaActivity(activities);
    const { language } = useActivities()

    const t = translations[language] || translations.en;

    return (
        <>
            {/* dialog modren style */}

            {activity ? (
                <div class="overflow-x-auto px-4 md:px-8 mt-6">
                    <div>
                        <p>
                            {t?.expectedActivity}
                        </p>
                    </div>
                    <table class="w-full max-w-7xl mx-auto">
                        <thead
                            class="text-slate-900 dark:text-slate-50 text-left text-sm font-semibold border-b border-slate-300 dark:border-neutral-600 whitespace-nowrap">

                        </thead>

                        <tbody class="text-sm divide-y divide-slate-200 dark:divide-neutral-700 border">
                            <tr>
                                <td class="pl-0 px-3 py-4 font-medium text-slate-900 dark:text-slate-50 whitespace-nowrap">
                                    {activity?.activityId}
                                </td>
                            </tr>
                            <tr>

                                <td class="pl-0 px-3 py-4 font-medium text-slate-900 dark:text-slate-50 whitespace-nowrap">
                                    {activity?.product_description_ar}
                                </td>
                            </tr>

                            <tr>

                                <td class="pl-0 px-3 py-4 font-medium text-slate-900 dark:text-slate-50 whitespace-nowrap">
                                    {activity?.product_description_en}
                                </td>
                            </tr>
                            <tr>


                                <td class="pl-0 px-3 py-4 font-medium text-slate-900 dark:text-slate-50 whitespace-nowrap">
                                    {activity?.saudis_percentage}
                                </td>
                            </tr>



                        </tbody>
                    </table>
                    {/* <h1> الوصف العربي : {activity?.product_description_ar}</h1>
                    <h2> الوصف الانجليزي : {activity?.product_description_en} </h2>
                    <p> رمز النشاط في قوّة :  {activity?.activityId}</p>
                    <p> النسبة المئوية للموطنين : {activity?.saudis_percentage}</p>
                    <p> تصنيف القطاع : {activity?.sector_classification}</p>
                    <p> تصنيف النشاط : {activity?.classification_text}</p> */}
                </div>
            ) : (
                <div className="glass-panel">
                    <p>لا يوجد نشاط معتمد</p>
                </div>
            )}

        </>
    );
}
