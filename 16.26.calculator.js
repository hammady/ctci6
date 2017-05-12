#!/usr/bin/env node

console.log("16.26 Calculator")

const START = 0,
      D1 = 1,
      D2 = 2,
      MULT = 3,
      ADD = 4
const STATES = ["START", "D1", "D2", "MULT", "ADD"]

function calculator(input) {
  var sum = 0, state = START, term = 0, sign = 1, op, t2
  
  function a(n) {term = 10 * term + parseInt(n)}
  function c(n) {op = n; t2 = 0}
  function e(n) {t2 = 10 * t2 + parseInt(n)}
  function f(n) {if (op == '*') {term *= t2} else {term /= t2}; op = n}
  function h(n) {sum += sign * term; sign = n == '+' ? 1 : -1; term = 0}

  function digit(n) {return n.match(/\d/)}
  function mult(n) {return n.match(/[\*\/]/)}
  function add(n) {return n.match(/[\+-]/)}

  for (var i = 0; i < input.length; i++) {
    var n = input[i]
    //console.log("state is", STATES[state], "next is", n, "sum=", sum, "term=", term, "t2=", t2)
    switch(state) {
      case START:
        if (digit(n)) {a(n); state = D1} else return null
        break;
      case D1:
        if (digit(n)) {a(n)} else if (mult(n)) {c(n); state = MULT} else if (add(n)) {h(n); state = ADD}
        break;
      case D2:
        if (digit(n)) {e(n)} else if (mult(n)) {f(n); state = MULT} else if (add(n)) {f(); h(n); state = ADD}
        break;
      case MULT:
        if (digit(n)) {e(n); state = D2} else return null
        break;
      case ADD:
        if (digit(n)) {a(n); state = D1} else return null
        break;
    }
  }
  switch(state){
    case MULT: case ADD: return null
    case D2: f(); break
  }
  h()
  return sum
}


function test(input, output) {
  var ret = calculator(input)
  console.log("Testing", input, "expecting", output, "got", ret, ret === output ? "OK" : "Error")
}

test("1", 1)
test("2+3", 5)
test("3-2+5", 6)
test("3*3", 9)
test("1+5*2", 11)
test("2-3*4", -10)
test("3*2+2", 8)
test("1+2*3-2*2", 3)
test("", 0)
test("1+", null)
test("2+2*", null)
test("3+2-", null)
test("4+3/", null)
test("10+20*100", 2010)
