#!/usr/bin/env node

console.log("8.4 Powerset")

function powerset(set) {
  var s = new Array(set.length + 1)
  s[0] = [[-1]]
  for (var i = 1; i <= set.length; i++) {
    s[i] = []
    for(var j = 0; j < s[i-1].length; j++) {
      var previous = s[i-1][j]
      var max_id = previous[previous.length-1]
      for(var k = max_id + 1; k < set.length; k++)
        s[i].push(previous.concat([k]))
    }
  }
  return s
}

function print(set, ps) {
  for (var l = 0; l < ps.length; l++)
    for (var p = 0; p < ps[l].length; p++) {
      var arr = ps[l][p]
      for (var i = 0; i < arr.length; i++)
        if (arr[i] != -1) process.stdout.write(set[arr[i]] + " ")
      process.stdout.write("\n")
    }
}

var set = [1,2,3,4,5]
var ps = powerset(set)
console.log(set)
print(set, ps)
