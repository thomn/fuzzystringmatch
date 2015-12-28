"use strict"

class ResultEntry {
    constructor(subject, countMatchedChunks) {
        this._subject = subject
        this._countMatchedChunks = countMatchedChunks

        this.__cachedMatchRelation = null
    }

    getCountMatchedChunks() {
        return this._countMatchedChunks
    }

    getSubject() {
        return this._subject
    }

    getMatchRelation() {
        if (this.__cachedMatchRelation === null) {
            this.__cachedMatchRelation = this.getCountMatchedChunks() / this._subject.getChunks().length
        }

        return this.__cachedMatchRelation
    }
}

module.exports = ResultEntry