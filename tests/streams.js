var expect = require('chai').expect

var dedupeStream = require('../lib/streams/dedupeStream')

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

})