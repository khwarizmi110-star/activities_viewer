

export const sortActivityIds = (activityIds) => {
    const numericActivityIds = activityIds.map(id => id.replace(/\D/g, ''));
    numericActivityIds.sort((a, b) => b - a);
    return numericActivityIds;
}

export const activityRangeColor = (saudis_percentage = 0) => {

    let percentage = Math.floor(Number(saudis_percentage));
    if (isNaN(percentage)) {
        return 'red-500';
    }

    // console.log('percentage', percentage);

    if (percentage >= 0 && percentage <= 8) {
        return 'from-green-600 to-green-300';
    } else if (percentage >= 9 && percentage <= 16) {
        return 'from-green-500 to-green-300';
    } else if (percentage >= 17 && percentage <= 25) {
        return 'from-yellow-400 to-yellow-200';
    } else if (percentage >= 26 && percentage <= 34) {
        return 'from-yellow-500 to-yellow-300';
    } else if (percentage >= 35 && percentage <= 43) {
        return 'from-red-400 to-red-200';
    } else if (percentage >= 44 && percentage <= 52) {
        return 'from-red-500 to-red-300';
    } else if (percentage >= 53 && percentage <= 61) {
        return 'from-red-500 to-red-300';
    } else if (percentage >= 62 && percentage <= 70) {
        return 'from-red-600 to-red-300';
    } else if (percentage >= 71 && percentage <= 79) {
        return 'from-red-600 to-red-400';
    } else if (percentage >= 80 && percentage <= 88) {
        return 'from-red-600 to-red-400';
    } else if (percentage >= 89 && percentage <= 97) {
        return 'from-red-600 to-red-400';
    } else if (percentage >= 98 && percentage <= 100) {
        return 'from-red-600 to-red-400';
    }

}


export const saudiHighestPerscent = (activities) => {
    let maxPersent = 0;
    activities.forEach(activity => {
        const percentage = Math.floor(Number(activity.saudis_percentage));
        if (!isNaN(percentage) && percentage > maxPersent) {
            maxPersent = percentage;
        }
    });
    return maxPersent;
}


export const qiwaActivity = (activities = [{ saudis_percentage: "0", activityId: "0" }]) => {

    return activities?.length > 0 ? activities?.reduce((prev, current) => {
        // 1. إذا كانت النسبة أعلى، نأخذ العنصر الحالي مباشرة
        if (Number(current.saudis_percentage) > Number(prev.saudis_percentage)) {
            return current;
        }

        // 2. إذا تساوت النسبة، نتحقق من الـ id الأقل
        if (current.saudis_percentage === prev.saudis_percentage) {
            // استخدمنا Number لتحويل النص إلى رقم للمقارنة الصحيحة
            return Number(current.activityId) < Number(prev.activityId) ? current : prev;
        }

        return prev;
    }) : null


}