#!/usr/bin/env node

console.log("16.18 Pattern match")

function patmat(pattern, value) {
  try {
    var pattern_lengths = analyze_pattern(pattern)
  }
  catch(e){console.log(e); return false}

  if (pattern.length == 0 || value.length == 0 || pattern.length > value.length)
    return false
  var new_pattern = pattern.substr(1)
  var main_char = pattern[0]
  for (var i = 0; i < value.length; i++) {
    var main_replacement = value.substr(0, i + 1)
    var new_value = value.substr(i + 1)
    var other = get_other(main_char, i + 1, value, pattern_lengths)
    var replacement = {}
    replacement[main_char] = main_replacement
    if (other && check(new_pattern, new_value, replacement, other))
      return true
  }
  return false
}

function check(pattern, value, replacement, other) {
  if (pattern.length == 0 && value.length == 0)
    return true
  var char = pattern[0]
  var repl = replacement[char]
  if (repl) {
    if (value.indexOf(repl) === 0)
      return check(pattern.substr(1), value.substr(repl.length), replacement, other)
    else
      return false
  }
  else if (other.len > 0) {
    replacement[other.char] = value.substr(0, other.len)
    return check(pattern.substr(1), value.substr(other.len), replacement, other)
  }
  else
    return true
}

function get_other(main_char, main_replacement_length, value, pattern_lengths) {
  var other_char = main_char == 'a' ? 'b' : 'a'
  var remain = value.length - pattern_lengths[main_char] * main_replacement_length
  var other_len = pattern_lengths[other_char]
  if (other_len == 0)
    return {char: other_char, len: 0}
  else if (remain % other_len != 0)
    return null
  else
    return {char: other_char, len: remain / other_len}
}

function analyze_pattern(pattern) {
  var lengths = {a: 0, b: 0}
  for (var i = 0; i < pattern.length; i++)
    if (pattern[i] == 'a')
      lengths.a++
    else if (pattern[i] == 'b')
      lengths.b++
    else
      throw new Error('Invalid pattern "' + pattern + '" due to unexpected character "' + pattern[i] + '" at position: ' + i)
  return lengths
}

function test(value, pattern, expected) {
	var ret = patmat(pattern, value)
	console.log('Testing', pattern, 'on', value, 'for', expected, ret === expected ? 'OK' : 'ERROR')
}

var s = 'catcatgocatgo'
test(s, 'aab', true)
test(s, 'bba', true)
test(s, 'aabab', true)
test(s, 'bbaba', true)
test(s, 'a', true)
test(s, 'b', true)
test(s, 'ab', true)
test(s, 'ba', true)
test(s, 'xab', false)
test(s, 'aababa', false)
test(s, 'abab', false)
test(s, 'aaa', false)
test(s, '', false)
test('', 'a', false)
test('', '', false)

