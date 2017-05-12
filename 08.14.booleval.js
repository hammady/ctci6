#!/usr/bin/env node

console.log("8.14 Boolean Evaluation")

const OP_AND = 0, OP_OR = 1, OP_XOR = 2;

function bool_eval(bool_str, desired) {
  var parsed = parse(bool_str);
  var n = parsed.literals.length;
  var g = construct_grid(n);
  // init diagonal
  for (var i = 0; i < n; i++)
    g[i][i] = parsed.literals[i];
  // find counts bottom up starting from len=2 till len=n
  for (var len = 2; len <= n; len++) {
    for (var start = 0; start <= n-len; start++) {
      var end = start + len - 1;
      for (var k = start; k < end; k++) {
        var op = parsed.operators[k];
        g[start][end] += count( true, op, start, k, end, g);
        g[end][start] += count(false, op, start, k, end, g);
      }
    }
  }
  print_grid(g);
  return v(g, 0, n-1, desired); 
}

function parse(bool_str) {
  // parses 1^0|1&0 to literals: [true, false, true, false], operators: [OP_XOR, OP_OR, OP_AND]
  var l = [], o = []
  for (var i = 0; i < bool_str.length; i++)
    switch (bool_str[i]) {
      case '1': l.push(1); break;
      case '0': l.push(0); break;
      case '&': o.push(OP_AND); break;
      case '|': o.push(OP_OR); break;
      case '^': o.push(OP_XOR); break;
    }
  return {literals: l, operators: o};
}

function construct_grid(n) {
  var g = new Array(n);
  for (var r = 0; r < n; r++) {
    g[r] = new Array(n);
    for (var c = 0; c < n; c++)
      g[r][c] = 0;
  }
  return g;
}

function count(desired, op, s, k, e, g) {
  if (desired) {
    switch (op) {
      case OP_AND: return v(g, s, k, true) * v(g, k+1, e, true);
      case OP_OR: return v(g, s, k, true) * v(g, k+1, e, false) + v(g, s, k, false) * v(g, k+1, e, true) + v(g, s, k, true) * v(g, k+1, e, true);
      case OP_XOR: return v(g, s, k, true) * v(g, k+1, e, false) + v(g, s, k, false) * v(g, k+1, e, true);
    }
  }
  else if (!desired) {
    switch (op) {
      case OP_AND: return v(g, s, k, false) * v(g, k+1, e, false) + v(g, s, k, false) * v(g, k+1, e, true) + v(g, s, k, true) * v(g, k+1, e, false);
      case OP_OR: return v(g, s, k, false) * v(g, k+1, e, false);
      case OP_XOR: return v(g, s, k, true) * v(g, k+1, e, true) + v(g, s, k, false) * v(g, k+1, e, false);
    }
  }
}

function v(g, i, j, desired) {
  if (i == j)
    return desired ? g[i][j] : (1-g[i][j]);
  else
    return desired ? g[i][j] : g[j][i];
}

function print_grid(g) {
  for (var r = 0; r < g.length; r++)
    console.log(g[r]);
  console.log();
}

function test() {
  var input = [
    '1^0|0|1',
    '0&0&0&1^1|0'
  ],
    desired = [
      false,
      true
    ],
    answer = [
      2,
      10
    ];

  for (var i = 0; i < input.length; i++) {
    var ret = bool_eval(input[i], desired[i]);
    console.log("Tested", input[i], "for", desired[i], "returned", ret, (ret==answer[i] ? "> CORRECT" : "> WRONG"));
  }
}

if (process.argv.length > 2)
  console.log(bool_eval(process.argv[2], process.argv[3] == '1'));
else
  test();
