export const BOOK_FILTERS = {
    ACTIVE: 'active',
    DEACTIVATED: 'deactivated',
    ALL: 'all',
} as const;

export const DEFAULT_FILTER = BOOK_FILTERS.ACTIVE;