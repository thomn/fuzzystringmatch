var expect = require('chai').expect

var Subject = require('../lib/Subject')
var ResultEntry = require('../lib/ResultEntry')
var identBuilder = require('../lib/tools/identBuilder')
var splitter = require('../lib/tools/splitter')
var prepareTerm = require('../lib/tools/prepareTerm')
var dedupeStream = require('../lib/streams/dedupeStream')
var cutStream = require('../lib/tools/cutstream')

describe('models', () => {
    describe('subject', () => {
        var s;
        before(() => {
            s = new Subject('term  #foo')

            s.addChunk('fooChunk')
            s.addChunk('barChunk')
        })

        it('should return the term', () => expect(s.getTerm()).to.equal('term  #foo'))
        it('should return the prepared term', () => expect(s.getTermPrepared()).to.equal('term foo'))
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

describe('tools', () => {
    describe('splitter', () => {
        it('should split with a default chunk size of 2 and default whitespace treatment', () => {
            var splitted = splitter('foo bar', {})
            expect(splitted).to.deep.equal(['fo', 'oo', 'ob', 'ba', 'ar'])
        })

        it('should split with a custom chunk size of 3', () => {
            var splitted = splitter('foo bar', {size: 3})
            expect(splitted).to.deep.equal(['foo', 'oob', 'oba', 'bar'])
        })

        it('should split with a custom chunk size of 3 and should respect whitespaces', () => {
            var splitted = splitter('meinl byzance crash', {size: 3, whitespaces: splitter.WHITESPACES_RESPECT})
            expect(splitted).to.deep.equal(['mei', 'ein', 'inl', 'byz', 'yza', 'zan', 'anc', 'nce', 'cra', 'ras', 'ash'])
        })

        it('should return a chunk even if its smaller than size', () => {
            var splitted = splitter('paiste 18 crash', {size: 3, whitespaces: splitter.WHITESPACES_RESPECT})
            expect(splitted).to.deep.equal(['pai', 'ais', 'ist', 'ste', '18', 'cra', 'ras', 'ash'])
        })
    })

    describe('prepareTerm', () => {
        it('should prepare', () => expect(prepareTerm('foo bar-bax;   # 123')).to.equal('foo bar-bax 123'))
    })

    describe('identBuilder', () => {
        it('should create an ident', () => expect(identBuilder('foo-bar-bär-büx " , - + bax/baz')).to.equal('baxbaz foobarbaerbuex'))
    })
})

describe('streams', () => {
    describe('dedupe', () => {
        var stream
        var collection = []

        before((done) => {
            stream = dedupeStream('foo', 'bar')

            stream.on('data', (data) => collection.push(data))
            stream.on('end', done)

            stream.write({foo: 'a bb', bar: 1})
            stream.write({foo: 'bb a', bar: 3})
            stream.write({foo: 'b+b a', bar: 44})
            stream.write({foo: 'b-b a', bar: 33})
            stream.write({foo: 'one', bar: 1})

            stream.end()
        })

        it('should split with a default chunk size of 2', () => expect(collection).to.deep.equal([
            { foo: 'b+b a', bar: 81 },
            { foo: 'one', bar: 1 }
        ]))
    })

    describe('cutstream', () => {
        var stream
        var collection = []

        before((done) => {
            stream = cutStream(4)

            stream.on('data', (data) => collection.push(data))
            stream.on('end', done)

            for(var i = 0; i < 10; i++) stream.write(i)

            stream.end()
        })

        it('should cut', () => expect(collection).to.deep.equal([0, 1, 2]))
    })
})