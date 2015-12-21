var WHITESPACES_RESPECT = 'respect'
var WHITESPACES_SQUASH = 'squash'

function splitter(identifier, options) {
    options = options || {}
    var size = options.size || 2
    var whitespsaces = options.whitespaces || WHITESPACES_SQUASH

    if (whitespsaces == WHITESPACES_RESPECT) {
        identifier = identifier.split(' ')
    } else if (whitespsaces == WHITESPACES_SQUASH) {
        identifier = [identifier.replace(/ +/g, '')]
    }

    return identifier.reduce((carry, identifier) => {
        var splitted = _splitTerm(identifier, size)
        carry = carry.concat(splitted)

        return carry
    }, [])
}

function _splitTerm(identifier, size) {
    var parts = identifier.split('')

    if (identifier.length < size) {
        return identifier
    }

    var resultList = []
    for (var i = 0; i < parts.length; i++) {
        if (i + size <= parts.length) {
            var subPart = ''
            for (var x = i; x < (i + size); x++) {
                subPart += parts[x]
            }
            resultList.push(subPart)
        }
    }

    return resultList
}

splitter.WHITESPACES_RESPECT = WHITESPACES_RESPECT
splitter.WHITESPACES_SQUASH = WHITESPACES_SQUASH

module.exports = splitter