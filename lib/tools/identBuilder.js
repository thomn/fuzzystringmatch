module.exports = function identBuilder(term) {
    return term
        .trim()
        .replace(/ü/g, 'ue')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/\s+/g, ' ')
        .replace(/[^ a-z0-9äöü]/g, '')
        .split(' ')
        .sort()
        .join(' ')
}