"use strict"

var util = require('util')

var dedupe = require('dedupe')
var hr = require('hirestime')
var debug = require('debug')

var ResultEntry = require('./ResultEntry')
var prepareTerm = require('./tools/prepareTerm')
var splitter = require('./tools/splitter')
var defaultSplitterConfig = require('./tools/defaultSplitterConfig')

class Matcher {
    constructor (digester, configuration) {
        console.log(configuration)
        
        this._chunks = digester.getChunks()
        this._index = digester.getIndex()
        this._configuration = configuration || defaultSplitterConfig

        this._debug = debug('fuzzystringmatch:matcher')
        this._debugSelect = debug('fuzzystringmatch:matcher:select')
        this._debugGroup = debug('fuzzystringmatch:matcher:group')
        this._debugCummulate = debug('fuzzystringmatch:matcher:cumulate')
    }

    match (term, overallCount) {
        overallCount = overallCount || 150

        var getTimeOverall = hr()
        var resultMap = new Map()
        var preparedTerm = prepareTerm(term)

        var getTimeSelect = hr()

        var splitted = splitter(preparedTerm, this._configuration.splitter)
        var splittedDeduped = dedupe(splitted)

        if (splitted.length != splittedDeduped.length) {
            this._debugSelect('%d instead of %d chunks', splittedDeduped.length, splitted.length)
        }

        // creating a map that describes how often a chunk match has been discovered for a certain subject
        //searching for: fork, chunks: fo, or, rk
        //index: spork, chunks: sp, po, or, rk
        //matching chunks: or, rk
        //resultmap: spork => 2 (two chunk matches for index entry 'spork')
        splittedDeduped.forEach((chunkText) => {
            var chunk = this._chunks.get(chunkText)
            if (!chunk) return

            var chunkResult = this._index.get(chunk)
            if (!chunkResult) return

            var getChunkTime = hr()
            chunkResult.forEach(subResultEntry => {
                var countEntries = resultMap.get(subResultEntry) || 0

                resultMap.set(subResultEntry, countEntries + 1)
            })
            this._debugSelect('chunkresult for "%s": %d entries, %dms', chunkText, chunkResult.size, getChunkTime())
        })

        this._debugSelect('select took %dms', getTimeSelect())

        var getTimeGroup = hr()
        var result = []

        // creating a map that holds a list of matched subjects indexed by the number of matched chunks
        // this makes sorting the whole result set unnecessary as we simply can start interating at the highest
        // number of matched chunks
        //[ ,
        //  ,
        //  [spork]
        //]
        var numberSubjectsUsed = 0
        var numberSubjectsDropped = 0
        var discardThreshold = parseInt(splittedDeduped.length * 0.5, 10)
        var debugCollection = {}
        resultMap.forEach((numberOfMatchingChunks, subject) => {
            if (numberOfMatchingChunks < discardThreshold) {
                numberSubjectsDropped++
                return
            }

            debugCollection[numberOfMatchingChunks] = debugCollection[numberOfMatchingChunks] || 0
            debugCollection[numberOfMatchingChunks]++

            result[numberOfMatchingChunks] = result[numberOfMatchingChunks] || []
            result[numberOfMatchingChunks].push(subject)
            numberSubjectsUsed++
        })

        this._debugGroup('filter took %dms', getTimeGroup())
        this._debugGroup('%d subjects dropped, %d subjects used', numberSubjectsDropped, numberSubjectsUsed)
        this._debugGroup('%s', util.inspect(debugCollection))

        //iterate the clustered subjects starting with the result that has the highest chunk match score
        var numberRelevantClusters = 0
        var getTimeCummulate = hr()
        var cummulatedResult = []
        for (var i = result.length - 1; i >= 0; i--) {
            if (result[i]) {
                numberRelevantClusters++
                var groupedSubResult = result[i].map(subject => new ResultEntry(subject, i, splittedDeduped.length))

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