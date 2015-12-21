module.exports = {
    Subject: require('./lib/Subject'),
    Digester: require('./lib/Digester'),
    Matcher: require('./lib/Matcher'),
    tools: {
        cutstream: require('./lib/tools/cutstream'),
        dedupeStream: require('./lib/streams/dedupeStream'),
        identBuilder: require('./lib/tools/identBuilder'),
        prepareTerm: require('./lib/tools/prepareTerm'),
        splitter: require('./lib/tools/splitter')
    }
}