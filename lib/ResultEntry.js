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
}

module.exports = ResultEntry