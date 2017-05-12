#!/usr/bin/env node

console.log("16.9 English Integers")

const MAX = 999999999999999, MIN = 0
var english_int_library = require('written-number')

function english_int(number) {
  if (number > MAX || number < MIN)
    throw new Error("Number out of bounds")
  var stack = [], i = 0
  const units = [null, 'thousand', 'million', 'billion', 'trillion']
  while (number > 0) {
    var slice = number % 1000
    number = number / 1000 >> 0 // for integer division
    encode0to999(slice, stack, units[i++])
  }
  if (stack.length == 0)
    return "zero"
  else
    return stack.reverse().join(" ")
}

function encode0to999(slice, stack , unit) {
  if (slice == 0) return
  // encode unit
  if (unit) stack.push(slice == 1 ? unit : unit + "s")
  // encode right
  var right2 = slice % 100, right = null
  if (right2 >= 10 && right2 <= 19)
    right = encode10to19(right2)
  else if (right2 >= 1 && right2 <= 9)
    right = encode1to9(right2)
  else if (right2 >= 20)
    right = encode20to99(right2)
  // encode left
  var left1 = slice / 100 >> 0, left = null
  if (left1 > 0) left = encode1to9(left1) + " hundred"
  // join left and right
  if (!right)
    stack.push(left)
  else if (!left)
    stack.push(right)
  else
    stack.push(left + ' and ' + right)
}

function encode10to19(slice) {
  const table = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
  ]
  return table[slice - 10]
}

function encode1to9(slice) {
  const table = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
  ]
  return table[slice - 1]
}

function encode20to99(slice) {
  var right1 = slice % 10, right = null
      left = slice / 10 >> 0
  if (right1 > 0) right = encode1to9(right1)
  left = encode20to90step10(left)
  return left + (right ? '-' + right : '')
}

function encode20to90step10(slice) {
  const table = [
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
  ]
  return table[slice - 2]
}

function test_scenario(number) {
  var ours = english_int(number),
      theirs = english_int_library(number)
  console.log(number + ", expected: " + theirs + ", got: " + ours)
  if (ours != theirs)
    throw new Error("FAILED")
}

function test(from, to) {
  for(var i = from; i <= to; i++)
    test_scenario(i)
}

test(1001, 9999)
