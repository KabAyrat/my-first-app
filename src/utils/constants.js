export const PRIORITIES = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
};
export const FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
};

export const PRIORITY_ICONS = {
    [PRIORITIES.HIGH]: '🔴',
    [PRIORITIES.MEDIUM]: '🟡',
    [PRIORITIES.LOW]: '🟢',
};

export const PRIORITY_COLORS = {
    [PRIORITIES.HIGH]: '#ef4444',
    [PRIORITIES.MEDIUM]: '#f59e0b',
    [PRIORITIES.LOW]: '#10b981',
};

export const PRIORITY_LABELS = {
    [PRIORITIES.HIGH]: 'Высокий',
    [PRIORITIES.MEDIUM]: 'Средний',
    [PRIORITIES.LOW]: 'Низкий',
};

export const FILTER_LABELS = {
    [FILTERS.ALL]: 'Все',
    [FILTERS.ACTIVE]: 'Активные',
    [FILTERS.COMPLETED]: 'Завершенные',
};

export const KEYS = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
};

export const EMPTY_MESSAGES = {
    [FILTERS.ALL]: '📋 Пока нет дел. Добавьте первое!',
    [FILTERS.ACTIVE]: '✅ Все дела завершены!',
    [FILTERS.COMPLETED]: '📝 Нет завершенных дел',
};

export const STORAGE_KEY = 'todos';

export const ANIMATION_DURATION = 300;