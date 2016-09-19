module.exports = {
    Subject: require('./lib/Subject'),
    Digester: require('./lib/Digester'),
    Matcher: require('./lib/Matcher'),
    tools: {
        identBuilder: require('./lib/tools/identBuilder'),
        prepareTerm: require('./lib/tools/prepareTerm'),
        splitter: require('./lib/tools/splitter')
    }
}