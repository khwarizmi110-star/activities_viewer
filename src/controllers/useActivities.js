import { useState, useEffect, useMemo } from 'react';
import { fetchActivities } from '../models/activitiesApi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleActivitySelection, setActivitySelection, clearActivitySelection, setLanguage } from '../store/selectionSlice';

export const useActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'activityId', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);

    // Column Customization State
    const [visibleColumns, setVisibleColumns] = useState({
        activityId: true,
        descriptionAr: true,
        descriptionEn: true,
        classification: true,
        sectorClassification: true,
        saudisPercentage: true,
        document_type_description_new_ar: true,
        obligationAr: false
    });

    const dispatch = useDispatch();
    const { selectedActivityIds = [], language = 'en' } = useSelector((state) => state.selection || {});
    const isRtl = language === 'ar';
    const selectedIdsSet = useMemo(() => new Set(selectedActivityIds), [selectedActivityIds]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchActivities();
                setActivities(data);
            } catch (error) {
                console.error("Failed to load activities", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSelect = (id) => {
        dispatch(toggleActivitySelection(id));
    };

    const handleSelectAll = (filtered) => (e) => {
        if (e.target.checked) {
            dispatch(setActivitySelection(filtered.map(a => a.activityId)));
        } else {
            dispatch(clearActivitySelection());
        }
    };

    const toggleLang = () => {
        dispatch(setLanguage(language === 'en' ? 'ar' : 'en'));
    };

    const toggleColumn = (columnKey) => {
        setVisibleColumns(prev => ({ ...prev, [columnKey]: !prev[columnKey] }));
    };

    const filteredActivities = useMemo(() => {
        let result = activities.filter(activity => {
            const searchLower = searchTerm.toLowerCase();
            return (
                activity.activityId?.toLowerCase().includes(searchLower) ||
                activity.product_description_ar?.toLowerCase().includes(searchLower) ||
                activity.product_description_en?.toLowerCase().includes(searchLower) ||
                activity.saudis_percentage?.toString().includes(searchLower) ||
                activity.classification_text?.toLowerCase().includes(searchLower) ||
                // activity?.document_to_be_added?.document_type_description_new_ar?.toLowerCase().includes(searchLower) ||

                activity?.obligation_ar?.toLowerCase().includes(searchLower)
            );
        });

        if (sortConfig.key) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key] || '';
                const bValue = b[sortConfig.key] || '';
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return result;
    }, [activities, searchTerm, sortConfig]);

    const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(filteredActivities.length / itemsPerPage);
    const currentItems = useMemo(() => {
        if (itemsPerPage === 'all') return filteredActivities;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredActivities.slice(indexOfFirstItem, indexOfLastItem);
    }, [filteredActivities, currentPage, itemsPerPage]);

    const selectedActivities = useMemo(() => {
        return activities.filter(a => selectedIdsSet.has(a.activityId));
    }, [activities, selectedIdsSet]);

    return {
        activities,
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
    };
};
