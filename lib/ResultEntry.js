"use strict"

class ResultEntry {
    constructor(subject, countMatchedChunks, countSearchedChunks) {
        this._subject = subject
        this._countMatchedChunks = countMatchedChunks
        this._countSearchedChunks = countSearchedChunks

        this.__cachedMatchRelation = null
    }

    getCountMatchedChunks() {
        return this._countMatchedChunks
    }

    getCountSearchedChunks() {
        return this._countSearchedChunks
    }

    getSubject() {
        return this._subject
    }

    getMatchRelation() {
        if (this.__cachedMatchRelation === null) {
            this.__cachedMatchRelation = this._countMatchedChunks / this._countSearchedChunks
        }

        return this.__cachedMatchRelation
    }
}

module.exports = ResultEntry