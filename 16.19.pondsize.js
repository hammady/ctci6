#!/usr/bin/env node

console.log("16.19 Pond size")

var r = 4, c = 4
var land_str =
"0210" +
"0101" +
"1101" +
"0101"

function read_land(land_str) {
  var str_i = 0
  var g = new Array(r)
  for (var i = 0; i < r; i++) {
    g[i] = new Array(c)
    for (var j = 0; j < c; j++)
      g[i][j] = parseInt(land_str[str_i++])
  }
  return g
}

function pondsize(land) {
	for (var r = 0; r < land.length; r++)
		for (var c = 0; c < land[r].length; c++)
			set_size(land, r, c)
	var sizes = []
	for (var r = 0; r < land.length; r++)
		for (var c = 0; c < land[r].length; c++)
			if (land[r][c] > 0)
				sizes.push(land[r][c])
	return sizes
}

function set_size(land, r, c) {
  var cell = land[r][c]
  if (cell != 0)
    land[r][c] = 0
  else
    land[r][c] = 1 +
      get_size(land, r-1, c-1) +
      get_size(land, r-1, c) +
      get_size(land, r-1, c+1) +
      get_size(land, r, c-1)
}

function get_size(land, r, c) {
  if (r < 0 || r >= land.length || c < 0 || c >= land[r].length)
    return 0
  var size = land[r][c]
  land[r][c] = 0
  return size
}

function print_land(land) {
  for (var i = 0; i < r; i++) {
    for (var j = 0; j < c; j++)
      process.stdout.write(land[i][j] + " ")
    process.stdout.write("\n")
  }
}

function print_sizes(sizes) {
	console.log(sizes)
}

var land = read_land(land_str)
print_land(land)
var sizes = pondsize(land)
print_sizes(sizes)
