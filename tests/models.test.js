var expect = require('chai').expect

var Subject = require('../lib/Subject')
var ResultEntry = require('../lib/ResultEntry')

describe('models', () => {
    describe('subject', () => {
        var s;
        before(() => {
            s = new Subject('term  #foo')

            s.addChunk('fooChunk')
            s.addChunk('barChunk')
        })

        it('should return the term', () => expect(s.getTerm()).to.equal('term  #foo'))
        it('should return the prepared term', () => expect(s.getTermPrepared()).to.equal('term #foo'))
        it('should return the prepared term ident', () => expect(s.getTermPreparedIdent()).to.equal('foo term'))
        it('should return the chunks', () => expect(s.getChunks()).to.deep.equal(['fooChunk', 'barChunk']))
    })

    describe('resultentry', () => {
        var s, e;
        before(() => {
            s = new Subject('fooTerm')
            e = new ResultEntry(s, 2, 4)
        })

        it('should return the subject', () => expect(e.getSubject()).to.equal(s))
        it('should return the number of matches chunks', () => expect(e.getCountMatchedChunks()).to.equal(2))
        it('should return the relation of matched to contained chunks', () => expect(e.getMatchRelation()).to.equal(0.5))
    })
})