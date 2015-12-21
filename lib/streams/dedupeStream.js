var through2 = require('through2')
var debug = require('debug')

var identBuilder = require('../tools/identBuilder')

module.exports = function (termField, weightField) {
    var mutexMap = new Map()
    var dedupeDebug = debug('dedupeStream')

    return through2.obj(function (line, enc, callback) {
        var identifier = identBuilder(line[termField])

        if (!mutexMap.has(identifier)) {
            mutexMap.set(identifier, [])
        }

        mutexMap.get(identifier).push(line)

        callback()
    }, function (callback) {
        var countDropped = 0

        dedupeDebug('deduping')
        mutexMap.forEach((value) => {
            var reduced = value
                .sort((a, b) => b[weightField] - a[weightField])
                .reduce((carry, value) => {
                    //take the first element (it has the best weight since the array is sorted
                    //than add the weights of every subsequent entry
                    if (carry == null) {
                        carry = {}
                        carry[termField] = value[termField]
                        carry[weightField] = value[weightField]
                    } else {
                        countDropped++
                        carry[weightField] = carry[weightField] + value[weightField]
                    }

                    return carry
                }, null)

            this.push(reduced)
        })

        dedupeDebug('dedupe finished, %d entries dropped', countDropped)
        callback()
    })
}

