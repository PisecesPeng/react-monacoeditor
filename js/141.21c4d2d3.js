(window.webpackJsonp=window.webpackJsonp||[]).push([[141],{"./node_modules/code-example/lib/textile.js":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default="h1. Textile Mode\n\nA paragraph without formatting.\n\np. A simple Paragraph.\n\n\nh2. Phrase Modifiers\n\nHere are some simple phrase modifiers: *strong*, _emphasis_, **bold**, and __italic__.\n\nA ??citation??, -deleted text-, +inserted text+, some ^superscript^, and some ~subscript~.\n\nA %span element% and @code element@\n\nA \"link\":http://example.com, a \"link with (alt text)\":urlAlias\n\n[urlAlias]http://example.com/\n\nAn image: !http://example.com/image.png! and an image with a link: !http://example.com/image.png!:http://example.com\n\nA sentence with a footnote.[123]\n\nfn123. The footnote is defined here.\n\nRegistered(r), Trademark(tm), and Copyright(c)\n\n\nh2. Headers\n\nh1. Top level\nh2. Second level\nh3. Third level\nh4. Fourth level\nh5. Fifth level\nh6. Lowest level\n\n\nh2.  Lists\n\n* An unordered list\n** foo bar\n*** foo bar\n**** foo bar\n** foo bar\n\n# An ordered list\n## foo bar\n### foo bar\n#### foo bar\n## foo bar\n\n- definition list := description\n- another item    := foo bar\n- spanning ines   :=\n                     foo bar\n\n                     foo bar =:\n\n\nh2. Attributes\n\nLayouts and phrase modifiers can be modified with various kinds of attributes: alignment, CSS ID, CSS class names, language, padding, and CSS styles.\n\nh3. Alignment\n\ndiv<. left align\ndiv>. right align\n\nh3. CSS ID and class name\n\nYou are a %(my-id#my-classname) rad% person.\n\nh3. Language\n\np[en_CA]. Strange weather, eh?\n\nh3. Horizontal Padding\n\np(())). 2em left padding, 3em right padding\n\nh3. CSS styling\n\np{background: red}. Fire!\n\n\nh2. Table\n\n|_.              Header 1               |_.      Header 2        |\n|{background:#ddd}. Cell with background|         Normal         |\n|\\2.         Cell spanning 2 columns                             |\n|/2.         Cell spanning 2 rows       |(cell-class). one       |\n|                                                two             |\n|>.                  Right aligned cell |<. Left aligned cell    |\n\n\nh3. A table with attributes:\n\ntable(#prices).\n|Adults|$5|\n|Children|$2|\n\n\nh2. Code blocks\n\nbc.\nfunction factorial(n) {\n    if (n === 0) {\n        return 1;\n    }\n    return n * factorial(n - 1);\n}\n\npre..\n                ,,,,,,\n            o#'9MMHb':'-,o,\n         .oH\":HH$' \"' ' -*R&o,\n        dMMM*\"\"'`'      .oM\"HM?.\n       ,MMM'          \"HLbd< ?&H      .:MH .\"\\          ` MM  MM&b\n     . \"*H    -        &MMMMMMMMMH:\n     .    dboo        MMMMMMMMMMMM.\n     .   dMMMMMMb      *MMMMMMMMMP.\n     .    MMMMMMMP        *MMMMMP .\n          `#MMMMM           MM6P ,\n       '    `MMMP\"           HM*`,\n        '    :MM             .- ,\n         '.   `#?..  .       ..'\n            -.   .         .-\n              ''-.oo,oo.-''\n\n\\. _(9>\n \\==_)\n  -'=\n\nh2. Temporarily disabling textile markup\n\nnotextile. Don't __touch this!__\n\nSurround text with double-equals to disable textile inline. Example: Use ==*asterisks*== for *strong* text.\n\n\nh2. HTML\n\nSome block layouts are simply textile versions of HTML tags with the same name, like @div@, @pre@, and @p@. HTML tags can also exist on their own line:\n\n<section>\n  <h1>Title</h1>\n  <p>Hello!</p>\n</section>\n\n\n"}}]);