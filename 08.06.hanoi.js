#!/usr/bin/env node

console.log("8.6 Towers of Hanoi")

function hanoi(n) {
  var previous = ['ab'], current;
  for (var i = 2; i <= n; i++) {
    current = [];
    current = current.concat(clone_replace(previous, 'a', 'c', 'b'));
    current.push('ab');
    current = current.concat(clone_replace(previous, 'c', 'b', 'a'));
    previous = current;
    // console.log(previous);
  }
  return previous;
}

function clone_replace(previous, a, b, c) {
  var arr = [];
  for (var i = 0; i < previous.length; i++)
    arr.push(replaced(previous[i][0], a, b, c) + replaced(previous[i][1], a, b, c));
  return arr;
}

function replaced(original, a, b, c) {
  return eval(original);
  // same as: return original == 'a' ? a : (original == 'b' ? b : c);
}

var n = 3
if (process.argv.length > 2)
  n = parseInt(process.argv[2]);
console.log("Moves for n =", n, "are:");
var ans = hanoi(n);
console.log(ans, "length is", ans.length);
