function prepareTerm(term) {
    return term
        .toLowerCase()
        .replace(/[^ a-z0-9äöü]/g, '')
        .replace(/ +/g, ' ')
        .split(' ')
        .slice(0, 6)
        .join(' ')
}

module.exports = prepareTerm