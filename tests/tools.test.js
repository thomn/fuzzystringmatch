var expect = require('chai').expect

var identBuilder = require('../lib/tools/identBuilder')
var splitter = require('../lib/tools/splitter')
var prepareTerm = require('../lib/tools/prepareTerm')

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
        it('should trim', () => expect(prepareTerm(' foo ')).to.equal('foo'))
        it('should replace commas', () => expect(prepareTerm('3,5mm 6,5mm')).to.equal('3.5mm 6.5mm'))
        it('should remove encasing quotes', () => expect(prepareTerm('"gibson sg"')).to.equal('gibson sg'))
        it('should remove encasing quotes', () => expect(prepareTerm('foo-bar-baz')).to.equal('foo bar baz'))
        it('specialty', () => expect(prepareTerm('10\\\'\\\' 12\\\'\\\'')).to.equal('10" 12"'))
        it('specialty', () => expect(prepareTerm('10\\\' 12\\\'')).to.equal('10" 12"'))
        it('specialty', () => expect(prepareTerm('"10\\\' 12\\\'"')).to.equal('10" 12"'))
        it('should replace multiple whitespaces', () => expect(prepareTerm(' asdf   asdf   asdf  ')).to.equal('asdf asdf asdf'))
        it('should limit', () => expect(prepareTerm('foo bar bax ball baz bar spam eggs')).to.equal('foo bar bax ball baz bar'))
        it('should limit', () => expect(prepareTerm('"19\\\' Kerope"')).to.equal('19" kerope'))
    })

    describe('identBuilder', () => {
        it('should create an ident', () => expect(identBuilder('foo-bar-bär-büx " , - + bax/baz')).to.equal('baer bar buex foo'))
        it('should create an ident', () => expect(identBuilder('Paiste 2002 18" crash')).to.equal('18 2002 crash paiste'))
        it('should create an ident', () => expect(identBuilder('Paiste 18" crash 2002')).to.equal('18 2002 crash paiste'))
        it('should create an ident', () => expect(identBuilder('Gallien Krüger NEO12-II-8')).to.equal('8 gallien ii krueger neo12'))
    })
})