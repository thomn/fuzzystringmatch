var expect = require('chai').expect

var defaultSplitterConfig = require('../lib/tools/defaultSplitterConfig')
var Digester = require('../lib/Digester')
var Subject = require('../lib/Subject')

describe('Digester', () => {
    var digester;
    before(() => {
        digester = new Digester({splitter: defaultSplitterConfig})

        digester.feed('foo')
        digester.feed(new Subject('food'))
    })

    it('should build an index', () => expect(indexToObject(digester.getIndex())).to.deep.equal({
        fo: ['foo', 'food'],
        oo: ['foo', 'food'],
        od: ['food']
    }))
})

function indexToObject(index) {
    return Array
        .from(index.entries())
        .reduce((carry, entry) => Object.assign(carry, {[entry[0].getTerm()]: Array.from(entry[1].entries()).map(entry => entry[0].getTerm())}), {})
}