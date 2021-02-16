(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[542],{1205:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;i.default='/*\n * Classic example grammar, which recognizes simple arithmetic expressions like\n * "2*(3+4)". The parser generated from this grammar then computes their value.\n */\n\nstart\n  = additive\n\nadditive\n  = left:multiplicative "+" right:additive { return left + right; }\n  / multiplicative\n\nmultiplicative\n  = left:primary "*" right:multiplicative { return left * right; }\n  / primary\n\nprimary\n  = integer\n  / "(" additive:additive ")" { return additive; }\n\ninteger "integer"\n  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }\n\nletter = [a-z]+\n'}}]);
//# sourceMappingURL=542.4d404214.chunk.js.map