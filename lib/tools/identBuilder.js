var prepareTerm = require('./prepareTerm')

module.exports = function identBuilder(term) {
    return prepareTerm(term)
        .replace(/ü/g, 'ue')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ß/g, 'ss')
        .replace(/é/g, 'e')
        .replace(/â/g, 'a')
        .replace(/[^ a-z0-9]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .sort()
        .join(' ')
}