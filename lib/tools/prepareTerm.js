function prepareTerm(term) {
    return term
        .toLowerCase()
        .trim()
        //.replace(/[^ a-z0-9äöü]/g, '')
        .replace(/,/g, '.')
        .replace(/^"(.*)"$/, '$1') //things like "gibson guitar"
        .replace(/\-/g, ' ') //usually used as a seperator
        .replace(/\\'\\'/g, '"') //specialty from our splunk logging lib
        .replace(/\\'/g, '"') //specialty from our splunk logging lib
        .replace(/\s+/g, ' ')
        .split(' ')
        .slice(0, 6)
        .join(' ')
}

module.exports = prepareTerm