var identBuilder = require('./lib/tools/identBuilder')

suite('tools', function () {
    bench('identBuilder', () => identBuilder('fo#ö bär 123 #/   foo asdf'))
})