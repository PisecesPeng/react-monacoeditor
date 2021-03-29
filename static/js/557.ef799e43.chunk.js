(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[557],{1158:function(n,e,t){"use strict";t.r(e),e.default="import 'dart:async';\nimport 'dart:math' show Random;\nmain() async {\n  print('Compute \u03c0 using the Monte Carlo method.');\n  await for (var estimate in computePi().take(100)) {\n    print('\u03c0 \u2245 $estimate');\n  }\n}\n/// Generates a stream of increasingly accurate estimates of \u03c0.\nStream<double> computePi({int batch: 100000}) async* {\n  var total = 0;\n  var count = 0;\n  while (true) {\n    var points = generateRandom().take(batch);\n    var inside = points.where((p) => p.isInsideUnitCircle);\n    total += batch;\n    count += inside.length;\n    var ratio = count / total;\n    // Area of a circle is A = \u03c0\u22c5r\xb2, therefore \u03c0 = A/r\xb2.\n    // So, when given random points with x \u2208 <0,1>,\n    // y \u2208 <0,1>, the ratio of those inside a unit circle\n    // should approach \u03c0 / 4. Therefore, the value of \u03c0\n    // should be:\n    yield ratio * 4;\n  }\n}\nIterable<Point> generateRandom([int seed]) sync* {\n  final random = Random(seed);\n  while (true) {\n    yield Point(random.nextDouble(), random.nextDouble());\n  }\n}\nclass Point {\n  final double x, y;\n  const Point(this.x, this.y);\n  bool get isInsideUnitCircle => x * x + y * y <= 1;\n}\n"}}]);
//# sourceMappingURL=557.ef799e43.chunk.js.map