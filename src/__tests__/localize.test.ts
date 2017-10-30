import * as i18next from 'i18next';
import 'jest';
import { Translator } from '../i18next-wrapper';

describe('Localize', () => {
    it('Simple call', () => {
        let localiz
        let localize = new Translator();
        let message = 'Hello World';
        expect(localize.translate('key', message)).toEqual(message);
    })
})