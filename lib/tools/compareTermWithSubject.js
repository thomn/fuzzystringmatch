var cs = require('commonsubstrings')

function compareTermWithSubject(subject, term) {
    var subjectTerm = subject.getTermPrepared()
    var theLongestLength = subjectTerm.length > term.length ? subjectTerm.length : term.length;

    var commonStrings = cs(subjectTerm, term)
    var commonLength = commonStrings.reduce((sum, entry) => sum + entry.length, 0)

    return commonLength / theLongestLength
}

module.exports = compareTermWithSubject