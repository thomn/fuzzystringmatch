"use strict"

class Subject {
    constructor (term) {
        this._term = term
        this._chunks = []
    }

    getTerm () {
        return this._term
    }

    addChunk(chunk) {
        this._chunks.push(chunk)
    }

    getChunks() {
        return this._chunks
    }
}

module.exports = Subject