

import * as path from 'path';
import * as fs from 'fs';
import { nls } from './nls';
import * as i18next from 'i18next';
import { Options } from './interface';


export class Translator {
    private locale: string = 'en';
    private instance;
    private options: Options;
    private isPseudo: boolean = false;
    private resolvedLanguage: string = null;

    constructor(localPath?: string) {
        let resources;
        if (!localPath) {
            resources = {
                en: {
                    translation: {
                        "key": "Hello World",
                    }
                }
            };
        } else {
            let resolvedFile = this.resolveLanguage(localPath);
            console.log(resolvedFile);
            resources = JSON.parse(fs.readFileSync(resolvedFile).toString())
            console.log(resources);

        }
        this.instance = i18next
            .use(nls.processor)
            .createInstance({
                overloadTranslationOptionHandler: nls.overloadTranslationOptionHandler,
                lng: 'en',
                debug: true,
                resources
            });
    }

    public getLocale(): string {
        return this.locale;
    }

    public setLocale(locale: string) {
        this.locale = locale;
        this.instance.changeLanguage(this.locale);
    }

    public translate(key: string, message: string | any, ...args: any[]): string {
        return this.instance.t(key, message, ...args);
    }

    private resolveLanguage(file: string): string {
        let ext = path.extname(file);
        if (ext) {
            file = file.substr(0, file.length - ext.length);
        }
        let resolvedLanguage: string;
        if (this.options.cacheLanguageResolution && this.resolvedLanguage) {
            resolvedLanguage = this.resolvedLanguage;
        } else {
            if (this.isPseudo || !this.options.locale) {
                resolvedLanguage = '.nls.json';
            } else {
                let locale = this.options.locale;
                while (locale) {
                    var candidate = '.nls.' + locale + '.json';
                    if (fs.existsSync(file + candidate)) {
                        resolvedLanguage = candidate;
                        break;
                    } else {
                        var index = locale.lastIndexOf('-');
                        if (index > 0) {
                            locale = locale.substring(0, index);
                        } else {
                            resolvedLanguage = '.nls.json';
                            locale = null;
                        }
                    }
                }
            }
            if (this.options.cacheLanguageResolution) {
                this.resolvedLanguage = resolvedLanguage;
            }
        }
        return file + resolvedLanguage;
    }

}