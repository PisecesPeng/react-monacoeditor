(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[523],{1186:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default="import React from 'react';\nimport styles from './index.less';\n\nconst Select = ({ value, options, onChange }) => {\n  return (\n    <select className={styles.select} value={value} onChange={onChange}>\n      {options.map((item, key) => {\n        const optionProps = { key };\n        if (value === item) {\n          optionProps.value = item;\n        }\n        return (\n          <option {...optionProps}> {item} </option>\n        );\n      })}\n    </select>\n  );\n};\n\nexport default Select;\n"}}]);
//# sourceMappingURL=523.ef090a98.chunk.js.map