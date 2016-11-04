"use strict"

class ResultEntry {
    constructor(subject, countMatchedChunks, countSearchedChunks, resemblance) {
        this._subject = subject
        this._countMatchedChunks = countMatchedChunks
        this._countSearchedChunks = countSearchedChunks
        this._resemblance = resemblance

        this._matchRelation = this._countMatchedChunks / this._countSearchedChunks
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
        return this._matchRelation
    }

    getResemblance() {
        return this._resemblance
    }
}

module.exports = ResultEntry