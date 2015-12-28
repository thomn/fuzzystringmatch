"use strict"

var prepareTerm = require('./tools/prepareTerm')
var identBuilder = require('./tools/identBuilder')

class Subject {
    constructor (term) {
        this._term = term
        this._termPrepared = prepareTerm(term)
        this._termPreparedIdent = identBuilder(this._termPrepared)
        this._chunks = []
    }

    getTerm () {
        return this._term
    }

    getTermPrepared () {
        return this._termPrepared
    }

    getTermPreparedIdent () {
        return this._termPreparedIdent
    }

    addChunk (chunk) {
        this._chunks.push(chunk)
    }

    getChunks () {
        return this._chunks
    }
}

module.exports = Subject