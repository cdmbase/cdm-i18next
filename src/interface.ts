
export interface Options {
    locale?: string;
    cacheLanguageResolution?: boolean;
    localPath?: string;
}

export interface LocalizeInfo {
    key: string;
    comment: string[];
}

export interface LocalizeFunc {
    (info: LocalizeInfo, message: string, ...args: any[]): string;
    (key: string, message: string, ...args: any[]): string;
}

export interface LoadFunc {
    (file?: string): LocalizeFunc;
}