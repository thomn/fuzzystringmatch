module.exports = function identBuilder(term) {
    return term
        .split(' ')
        .map((field) => field.replace(/["',\-\+\/\\]/g, ''))
        .sort()
        .join('')
}