const FILMS_TAB_NAMES = {
    ALL: "All", 
    OLD: "Old", 
    MODERN: "Modern", 
    NEW: "New" 
}

const FILMS_TAB_IDS = {
    ALL: "all", 
    OLD: "old", 
    MODERN: "modern", 
    NEW: "new" 
}

/**
 * Creates a tab with tabName as a name
 * @param {string | number} tabId 
 * @param {string | number} tabName 
 * @returns {object} config of a tab
 */
const getTabbarOption = (tabId, tabName) => {
    return { id: tabId, value: tabName, width: 150 }
}

const tabbarOptions = [
    getTabbarOption(FILMS_TAB_IDS.ALL, FILMS_TAB_NAMES.ALL),
    getTabbarOption(FILMS_TAB_IDS.OLD, FILMS_TAB_NAMES.OLD),
    getTabbarOption(FILMS_TAB_IDS.MODERN, FILMS_TAB_NAMES.MODERN),
    getTabbarOption(FILMS_TAB_IDS.NEW, FILMS_TAB_NAMES.NEW),
]