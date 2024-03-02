export interface Brands {
    id: string,
    name: string,
    options: {}
}
export interface Sections {
    value: string;
    label: string;
    checked: boolean;
    id: string;
}
export interface SortingData {
    name: string;
    sort: string;
    order?: string;
    current: boolean;
}
export interface Pagination {
    _page: number;
    _per_page: number;
}

export interface HandlePages {
    page: number;
    handlePages: (page: any) => void;
    totalItems: number;
}

