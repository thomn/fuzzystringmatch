function prepareTerm(term) {
    return term
        .toLowerCase()
        .trim()
        .replace(/[^ a-z0-9äöü]/g, '')
        .replace(/\s+/g, ' ')
        .split(' ')
        .slice(0, 6)
        .join(' ')
}

module.exports = prepareTerm