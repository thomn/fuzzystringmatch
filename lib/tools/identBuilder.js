module.exports = function identBuilder(term) {
    return term
        .trim()
        .replace(/["',\-\+\/\\]/g, '')
        .replace(/\s+/g, ' ')
        .split(' ')
        .sort()
        .join(' ')
}