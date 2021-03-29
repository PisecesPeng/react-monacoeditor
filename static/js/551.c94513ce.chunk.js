(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[551],{1152:function(n,e,i){"use strict";i.r(e),e.default='(ns game-of-life\n  "Conway\'s Game of Life, based on the work of\n  Christophe Grand (http://clj-me.cgrand.net/2011/08/19/conways-game-of-life)\n  and Laurent Petit (https://gist.github.com/1200343).")\n\n;;; Core game of life\'s algorithm functions\n\n(defn neighbors\n  "Given a cell\'s coordinates `[x y]`, returns the coordinates of its\n  neighbors."\n  [[x y]]\n  (for [dx [-1 0 1]\n        dy (if (zero? dx)\n             [-1 1]\n             [-1 0 1])]\n    [(+ dx x) (+ dy y)]))\n\n(defn step\n  "Given a set of living `cells`, computes the new set of living cells."\n  [cells]\n  (set (for [[cell n] (frequencies (mapcat neighbors cells))\n             :when (or (= n 3)\n                       (and (= n 2)\n                            (cells cell)))]\n         cell)))\n\n;;; Utility methods for displaying game on a text terminal\n\n(defn print-grid\n  "Prints a `grid` of `w` columns and `h` rows, on *out*, representing a\n  step in the game."\n  [grid w h]\n  (doseq [x (range (inc w))\n          y (range (inc h))]\n    (when (= y 0) (println))\n    (print (if (grid [x y])\n             "[X]"\n             " . "))))\n\n(defn print-grids\n  "Prints a sequence of `grids` of `w` columns and `h` rows on *out*,\n  representing several steps."\n  [grids w h]\n  (doseq [grid grids]\n    (print-grid grid w h)\n    (println)))\n\n;;; Launches an example grid\n\n(def grid\n  "`grid` represents the initial set of living cells"\n  #{[2 1] [2 2] [2 3]})\n\n(print-grids (take 3 (iterate step grid)) 5 5)'}}]);
//# sourceMappingURL=551.c94513ce.chunk.js.map