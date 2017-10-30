import * as i18next from 'i18next';
import 'jest';
import { Translator } from '../i18next-wrapper';
import * as path from 'path';

describe('Localize', () => {
    // it('Simple call', () => {
    //     let localize = new Translator();
    //     let message = 'Hello World';
    //     expect(localize.translate('key', message)).toEqual(message);
    // });

    // it('Simple call with sperate load', () => {
    //     let localize = new Translator({ locale: 'de-DE' });
    //     let message = 'Hello World';
    //     expect(localize.translate('key', message)).toEqual(message);
    // });

    // it('With args', () => {
    //     let localize = new Translator({ locale: 'de-DE' });
    //     let message = '{0} {1}';       
    //     expect(localize.translate('key', message, 'Hello', 'World')).toEqual('Hello World');
    // });

    it('External Data German flat', () => {
        let localize: any = new Translator({ locale: 'en', localPath: path.join(__dirname, '..', '..', 'src', '__tests__', 'feature') });
        expect(localize.translate('json.schemas.desc', "Associate schemas to JSON files in the current project")).toEqual('Schemas zu JSON-Dateien im aktuellen Projekt zuordnen');
    });
})