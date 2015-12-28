"use strict"

class ResultEntry {
    constructor(subject, countMatchedChunks) {
        this._subject = subject
        this._countMatchedChunks = countMatchedChunks
    }

    getCountMatchedChunks() {
        return this._countMatchedChunks
    }

    getSubject() {
        return this._subject
    }

    getMatchRelation() {
        return this.getCountMatchedChunks() / this._subject.getChunks().length
    }
}

module.exports = ResultEntry