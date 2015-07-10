var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

console.log(uniq(tokenizer.tokenize('abc def abc')));
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
