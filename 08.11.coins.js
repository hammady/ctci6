#!/usr/bin/env node

console.log("8.11 Coins");

function coins(n) {
  var k = new Array(n+1), hash = {}, coins = [1, 5, 10, 25];
  k[0] = [[0]];
  for (var i = 1; i <= n; i++) {
    k[i] = [];
    for (var c in coins) {
      var coin = coins[c];
      if (i >= coin) {
        k[i] = k[i].concat(insert(coin, k[i-coin], hash));
      }
    }
  }
  return k[n];
}

function insert(coin, list, hash) {
  // insert coin sorted into list of sequences if not existing already
  var ret = [];
  for (var seq in list) {
    var new_seq = insert_sorted(coin, list[seq]);
    var f = hf(new_seq);
    if (!hash[f]) {
      hash[f] = 1;
      ret.push(new_seq);
    }
  }
  return ret;
}

function hf(arr) {
  return arr.join('.');
}

function insert_sorted(coin, seq) {
  for (var i = 0; i < seq.length; i++)
    if (coin <= seq[i])
      return range(seq, 0, i).concat([coin]).concat(range(seq, i));
  return seq.concat([coin]);
}

function range(arr, start, len) {
  var ret = [];
  if (typeof len == 'undefined')
    len = arr.length - start;
  while(len-- > 0 && start < arr.length)
    ret.push(arr[start++]);
  return ret;
}

var n = 10;
if (process.argv.length > 2)
  n = parseInt(process.argv[2]);
var ans = coins(n);
console.log("To sum", n, "possible coin selections are", ans, "of length", ans.length);
