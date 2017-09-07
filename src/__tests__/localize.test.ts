import i18next from 'i18next';
import 'jest';
import * as nls from '../i18next';


describe('Localize', () => {
    it('Simple call', () => {
        let localize = i18next({ locale: 'de-DE'})();
        let message = 'Hello World';
        expect(localize.t('key', message)).toEqual(message);
    })
})