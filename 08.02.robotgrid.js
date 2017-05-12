#!/usr/bin/env node

console.log("8.2 Robot in a grid")

var r = 5, c = 5
var grid_str =
" x   " + 
"    x" + 
"     " + 
"   xx" + 
" x   "

function read_grid(grid_str) {
  var str_i = 0
  var g = new Array(r)
  for (var i = 0; i < r; i++) {
    g[i] = new Array(c)
    for (var j = 0; j < c; j++)
      if (grid_str[str_i++] == 'x') g[i][j] = 'x'
  }
  return g
}

function robot_move(i, j) {
  // console.log("visiting", i, j)
  if (i >= r || j >= c) return true // off limit, return back
  if (g[i][j] == 'x') return true // blocked, return back
  if (i == r-1 && j == c-1) return [[i, j]] // reached goal, return simple path as this cell
  if (g[i][j]) return g[i][j] // visited before, return cached path

  // assert, recurse now

  var right = robot_move(i, j+1)
  if (typeof right == 'object') { // path found on right
    g[i][j] = [[i,j]].concat(right)
    // console.log("found path on right of", i, j, g[i][j])
    return g[i][j]
  }

  var down = robot_move(i+1, j)
  if (typeof down == 'object') { // path found on down
    g[i][j] = [[i,j]].concat(down)
    // console.log("found path on down", i, j, g[i][j])
    return g[i][j]
  }

  // no path found from here, return back
  // console.log("no path found from here, going back from", i, j)
  g[i][j] = true
  return g[i][j]
}

function print(grid_str, solution) {
  var str_i = 0
  var g = new Array(r)
  for (var i = 0; i < r; i++) {
    g[i] = new Array(c)
    for (var j = 0; j < c; j++)
      if (grid_str[str_i++] == 'x')
        g[i][j] = 'x'
      else
        g[i][j] = ' '
  }
  for (var k = 0; k < solution.length; k++)
    g[solution[k][0]][solution[k][1]] = '.'

  for (var i = 0; i < r; i++) {
    for (var j = 0; j < c; j++)
      process.stdout.write(g[i][j] + " ")
    process.stdout.write("\n")
  }
}

var g = read_grid(grid_str)
robot_move(0, 0)
// console.log(g[0][0])
print(grid_str, g[0][0])

