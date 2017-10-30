import * as i18next from 'i18next';

export const nls = {
    overloadTranslationOptionHandler: function(args) {
        var asArray = Array.prototype.slice.call(args);
        var key = asArray.shift();
        var defaultValue = asArray.shift();

        return {
            defaultValue: defaultValue,
            nls: asArray,
            postProcess: 'nls',
        }
    },
    processor: {
        name: 'nls',
        type: 'postProcessor',

        process(value, key, options) {
            console.warn(value, options);
            if(!options.nls) {
                return value;
            }

            options.nls.forEach(function(newValue, index) {
                var searchPattern = new RegExp('\\{' + index + '\\}');
                value = value.replace(searchPattern, newValue);
            });

            return value;
        }
    }
}