(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[581],{1182:function(n,i,e){"use strict";e.r(i),i.default="#!/usr/bin/perl\nuse strict;\nuse warnings;\n\nuse Path::Tiny;\n\nmy $dir = path('foo','bar'); # foo/bar\n\n# Iterate over the content of foo/bar\nmy $iter = $dir->iterator;\nwhile (my $file = $iter->()) {\n\n    # See if it is a directory and skip\n    next if $file->is_dir();\n\n    # Print out the file name and path\n    print \"$file\\n\";\n}"}}]);
//# sourceMappingURL=581.aadfd3bd.chunk.js.map