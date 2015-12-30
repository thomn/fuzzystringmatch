var prepareTerm = require('./prepareTerm')

module.exports = function identBuilder(term) {
    var a = prepareTerm(term)
        .replace(/ü/g, 'ue')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/[^ a-z0-9äöü]/g, '')
        .replace(/\s+/g, ' ')
console.log(a);
        a = a.split(' ')
        .sort()

    console.log(a);

    return a.join(' ')
}