var through2 = require('through2')

function cutStream(number) {
    var i = 0

    return through2.obj(function write(entry, enc, callback) {
        if (i++ < number-1) {
            callback(null, entry)
        } else {
            callback()
        }
    })
}

module.exports = cutStream