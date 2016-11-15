var fuzzyStringmatch = require('../')

var splitter = fuzzyStringmatch.tools.splitter

var config = {
    splitter: {
        custom: ident => ident.trim().split(' ')
    }
}

var digester = new fuzzyStringmatch.Digester(config)
var matcher = new fuzzyStringmatch.Matcher(digester, config)

digester.feed('United States of America')
digester.feed(new fuzzyStringmatch.Subject('United Kingdom of Great Britain'))
digester.feed('Germany')
digester.feed('France')
digester.feed('Japan')

console.log(digester)

matcher
    .match('united kingdom of the america and great germany')
    .forEach((resultEntry) => {
        var subject = resultEntry.getSubject()
        console.log(`${subject.getTerm()}, Matchscore: ${resultEntry.getMatchRelation()}`)
    })