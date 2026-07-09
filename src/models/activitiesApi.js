export const fetchActivities = async () => {
    try {
        const response = await fetch('/uploads/activites.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.map(item => ({
            activityId: item.product_label,
            class_id: item.class_id,
            classification_text: item.classification_text,
            product_description_ar: item.product_description_ar,
            product_description_en: item.product_description_en,
            sector_classification: item.sector_classification,
            saudis_percentage: item.nitaq?.saudis_percentage || 0,
            document_to_be_added: item.document_to_be_added,
            nitaq_ar: item.nitaq?.ar || '',
            nitaq_en: item.nitaq?.en || '',
            disable: item.disable,
            missedSBC: item.missedSBC,
        }));
    } catch (error) {
        console.error('Error in fetchActivities:', error);
        throw error;
    }
};
