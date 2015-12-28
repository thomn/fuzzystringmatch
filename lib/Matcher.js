"use strict"

var util = require('util')

var dedupe = require('dedupe')
var hr = require('hirestime')
var debug = require('debug')

var ResultEntry = require('./ResultEntry')
var prepareTerm = require('./tools/prepareTerm')
var splitter = require('./tools/splitter')

class Matcher {
    constructor (digester, configuration) {
        this._chunks = digester.getChunks()
        this._index = digester.getIndex()
        this._configuration = configuration

        this._debug = debug('matcher')
        this._debugSelect = debug('matcher:select')
        this._debugGroup = debug('matcher:group')
        this._debugCummulate = debug('matcher:cumulate')
    }

    match (term, overallCount) {
        overallCount = overallCount || 150

        var getTimeOverall = hr()
        var resultMap = new Map()
        var preparedTerm = prepareTerm(term)

        var getTimeSelect = hr()

        var splitted = splitter(preparedTerm, this._configuration.splitter)
        var splittedDedupe = dedupe(splitted)

        if (splitted.length != splittedDedupe.length) {
            this._debugSelect('%d instead of %d chunks', splittedDedupe.length, splitted.length)
        }

        splittedDedupe.forEach((chunkText) => {
            var chunk = this._chunks.get(chunkText)
            if (!chunk) return

            var chunkResult = this._index.get(chunk)
            if (!chunkResult) return

            var tmp = hr()
            chunkResult.forEach((subResultEntry) => {
                var countEntries = resultMap.get(subResultEntry) || 0

                resultMap.set(subResultEntry, countEntries + 1)
            })
            this._debugSelect('chunkresult for "%s": %d entries, %dms', chunkText, chunkResult.size, tmp())
        })
        this._debugSelect('select took %dms', getTimeSelect())

        var getTimeGroup = hr()
        var result = []
        var debugCollection = {}
        resultMap.forEach((numberOfMatchingChunks, subject) => {
            debugCollection[numberOfMatchingChunks] = debugCollection[numberOfMatchingChunks] || 0
            debugCollection[numberOfMatchingChunks]++

            result[numberOfMatchingChunks] = result[numberOfMatchingChunks] || []
            result[numberOfMatchingChunks].push(subject)
        })
        this._debugGroup('%s', util.inspect(debugCollection))
        this._debugGroup('filter took %dms', getTimeGroup())

        var numberRelevantClusters = 0
        var getTimeCummulate = hr()
        var cummulatedResult = []
        for (var i = result.length - 1; i >= 0; i--) {
            if (result[i]) {
                numberRelevantClusters++
                var groupedSubResult = result[i].map((subject) => new ResultEntry(subject, i))

                cummulatedResult = cummulatedResult.concat(groupedSubResult)
                if (cummulatedResult.length >= overallCount || numberRelevantClusters >= 3) break //we decide to only take results from the first three clusters, TODO: pick the threshold from configuration
            }
        }

        this._debugCummulate('cumulate took %dms', getTimeCummulate())
        this._debug('overall took %dms', getTimeOverall())

        return cummulatedResult
    }
}

module.exports = Matcher