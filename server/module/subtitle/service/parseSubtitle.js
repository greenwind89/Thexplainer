function  parseSubtitleToSentences (data) {
  var splitter  = /\n\n|\r\n\r\n/,
      groupOfTimeAndSentences = [],
      sentences = [];


  // grouping by heuristic of subtitle files
  groupOfTimeAndSentences = data.split(splitter);

  for(var i = 0, len = groupOfTimeAndSentences.length; i < len; i++) {

    var group     = groupOfTimeAndSentences[i] ,
        times     = group.match(/\d\d:\d\d:\d\d,\d\d\d/g) ,
        sentence  = group.replace(/.+(\r\n|\n).+-->.+(\r\n|\n)/, '') ,
        startTime = getTime(times ? times[0] : null) ,
        endTime   = getTime(times ? times[1] : null) ,
        tokens    = [];
      
    if(sentence) {
      sentences.push({
        'content'           : sentence,
        'time_tring'        : times,
        'start_hour'        : startTime.hour,
        'start_minute'      : startTime.minute,
        'start_second'      : startTime.second,
        'start_millisecond' : startTime.millisecond,
        'start_timestamp'   : getTimeStamp(startTime.hour, startTime.minute, startTime.second, startTime.millisecond),
        'end_hour'          : endTime.hour,
        'end_minute'        : endTime.minute,
        'end_second'        : endTime.second,
        'end_millisecond'   : endTime.millisecond,
        'end_timestamp'     : getTimeStamp(endTime.hour, endTime.minute, endTime.second, endTime.millisecond),
      });
    }

  }

  return sentences;
}

function getTimeStamp (hour, minute, second, millisecond) {
  return (hour * 3600 + minute * 60 + second) * 1000 + millisecond;
}


function getTime(str, unit){
    if(!str) return false;
    var parts       = str.split(':'),
        result      = {},
        secondParts = parts[2].split(',');

    result.hour        = parseInt(parts[0], 10);
    result.minute      = parseInt(parts[1], 10);
    result.second      = parseInt(secondParts[0], 10);
    result.millisecond = parseInt(secondParts[1], 10);

    return unit ? result[unit] : result;
}

exports = module.exports = {
  parse: parseSubtitleToSentences
};


