var prepareTerm = require('./prepareTerm')

module.exports = function identBuilder(term) {
    return prepareTerm(term)
        .replace(/ü/g, 'ue')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/[^ a-z0-9äöü]/g, '')
        .replace(/\s+/g, ' ')
        .split(' ')
        .sort()
        .join(' ')
}