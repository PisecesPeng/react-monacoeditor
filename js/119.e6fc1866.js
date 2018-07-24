(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{"./node_modules/code-example/lib/q.js":function(e,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.default='/ utilities to quickly load a csv file - for more exhaustive analysis of the csv contents see csvguess.q\n/ 2009.09.20 - updated to match latest csvguess.q \n\n/ .csv.colhdrs[file] - return a list of colhdrs from file\n/ info:.csv.info[file] - return a table of information about the file\n/ columns are: \n/ c - column name; ci - column index; t - load type; mw - max width; \n/ dchar - distinct characters in values; rule - rule that caught the type\n/ maybe - needs checking, _could_ be say a date, but perhaps just a float?\n/ .csv.info0[file;onlycols] - like .csv.info except that it only analyses <onlycols>\n/ example:\n/ info:.csv.info0[file;(.csv.colhdrs file)like"*price"]\n/ info:.csv.infolike[file;"*price"]\n/ show delete from info where t=" "\n/ .csv.data[file;info] - use the info from .csv.info to read the data\n/ .csv.data10[file;info] - like .csv.data but only returns the first 10 rows\n/ bulkload[file;info] - bulk loads file into table DATA (which must be already defined :: DATA:() )\n/ .csv.read[file]/read10[file] - for when you don\'t care about checking/tweaking the <info> before reading \n\n\\d .csv\nDELIM:","\nZAPHDRS:0b / lowercase and remove _ from colhdrs (junk characters are always removed)\nWIDTHHDR:25000 / number of characters read to get the header\nREADLINES:222 / number of lines read and used to guess the types\nSYMMAXWIDTH:11 / character columns narrower than this are stored as symbols\nSYMMAXGR:10 / max symbol granularity% before we give up and keep as a * string\nFORCECHARWIDTH:30 / every field (of any type) with values this wide or more is forced to character "*"\nDISCARDEMPTY:0b / completely ignore empty columns if true else set them to "C"\nCHUNKSIZE:50000000 / used in fs2 (modified .Q.fs)\n\nk)nameltrim:{$[~@x;.z.s\'x;~(*x)in aA:.Q.a,.Q.A;(+/&\\~x in aA)_x;x]}\nk)fs2:{[f;s]((-7!s)>){[f;s;x]i:1+last@&0xa=r:1:(s;x;CHUNKSIZE);f@`\\:i#r;x+i}[f;s]/0j}\ncleanhdrs:{{$[ZAPHDRS;lower x except"_";x]}x where x in DELIM,.Q.an}\ncancast:{nw:x$"";if[not x in"BXCS";nw:(min 0#;max 0#;::)@\\:nw];$[not any nw in x$(11&count y)#y;$[11<count y;not any nw in x$y;1b];0b]}\n\nread:{[file]data[file;info[file]]}  \nread10:{[file]data10[file;info[file]]}  \n\ncolhdrs:{[file]\n  `$nameltrim DELIM vs cleanhdrs first read0(file;0;1+first where 0xa=read1(file;0;WIDTHHDR))}\ndata:{[file;info]\n  (exec c from info where not t=" ")xcol(exec t from info;enlist DELIM)0:file}\ndata10:{[file;info]\n  data[;info](file;0;1+last 11#where 0xa=read1(file;0;15*WIDTHHDR))}\ninfo0:{[file;onlycols]\n  colhdrs:`$nameltrim DELIM vs cleanhdrs first head:read0(file;0;1+last where 0xa=read1(file;0;WIDTHHDR));\n  loadfmts:(count colhdrs)#"S";if[count onlycols;loadfmts[where not colhdrs in onlycols]:"C"];\n  breaks:where 0xa=read1(file;0;floor(10+READLINES)*WIDTHHDR%count head);\n  nas:count as:colhdrs xcol(loadfmts;enlist DELIM)0:(file;0;1+last((1+READLINES)&count breaks)#breaks);\n  info:([]c:key flip as;v:value flip as);as:();\n  reserved:key`.q;reserved,:.Q.res;reserved,:`i;\n  info:update res:c in reserved from info;\n  info:update ci:i,t:"?",ipa:0b,mdot:0,mw:0,rule:0,gr:0,ndv:0,maybe:0b,empty:0b,j10:0b,j12:0b from info;\n  info:update ci:`s#ci from info;\n  if[count onlycols;info:update t:" ",rule:10 from info where not c in onlycols];\n  info:update sdv:{string(distinct x)except`}peach v from info; \n  info:update ndv:count each sdv from info;\n  info:update gr:floor 0.5+100*ndv%nas,mw:{max count each x}peach sdv from info where 0<ndv;\n  info:update t:"*",rule:20 from info where mw>.csv.FORCECHARWIDTH; / long values\n  info:update t:"C "[.csv.DISCARDEMPTY],rule:30,empty:1b from info where t="?",mw=0; / empty columns\n  info:update dchar:{asc distinct raze x}peach sdv from info where t="?";\n  info:update mdot:{max sum each"."=x}peach sdv from info where t="?",{"."in x}each dchar;\n  info:update t:"n",rule:40 from info where t="?",{any x in"0123456789"}each dchar; / vaguely numeric..\n  info:update t:"I",rule:50,ipa:1b from info where t="n",mw within 7 15,mdot=3,{all x in".0123456789"}each dchar,.csv.cancast["I"]peach sdv; / ip-address\n  info:update t:"J",rule:60 from info where t="n",mdot=0,{all x in"+-0123456789"}each dchar,.csv.cancast["J"]peach sdv;\n  info:update t:"I",rule:70 from info where t="J",mw<12,.csv.cancast["I"]peach sdv;\n  info:update t:"H",rule:80 from info where t="I",mw<7,.csv.cancast["H"]peach sdv;\n  info:update t:"F",rule:90 from info where t="n",mdot<2,mw>1,.csv.cancast["F"]peach sdv;\n  info:update t:"E",rule:100,maybe:1b from info where t="F",mw<9;\n  info:update t:"M",rule:110,maybe:1b from info where t in"nIHEF",mdot<2,mw within 4 7,.csv.cancast["M"]peach sdv; \n  info:update t:"D",rule:120,maybe:1b from info where t in"nI",mdot in 0 2,mw within 6 11,.csv.cancast["D"]peach sdv; \n  info:update t:"V",rule:130,maybe:1b from info where t="I",mw in 5 6,7<count each dchar,{all x like"*[0-9][0-5][0-9][0-5][0-9]"}peach sdv,.csv.cancast["V"]peach sdv; / 235959 12345        \n  info:update t:"U",rule:140,maybe:1b from info where t="H",mw in 3 4,7<count each dchar,{all x like"*[0-9][0-5][0-9]"}peach sdv,.csv.cancast["U"]peach sdv; /2359\n  info:update t:"U",rule:150,maybe:0b from info where t="n",mw in 4 5,mdot=0,{all x like"*[0-9]:[0-5][0-9]"}peach sdv,.csv.cancast["U"]peach sdv;\n  info:update t:"T",rule:160,maybe:0b from info where t="n",mw within 7 12,mdot<2,{all x like"*[0-9]:[0-5][0-9]:[0-5][0-9]*"}peach sdv,.csv.cancast["T"]peach sdv;\n  info:update t:"V",rule:170,maybe:0b from info where t="T",mw in 7 8,mdot=0,.csv.cancast["V"]peach sdv;\n  info:update t:"T",rule:180,maybe:1b from info where t in"EF",mw within 7 10,mdot=1,{all x like"*[0-9][0-5][0-9][0-5][0-9].*"}peach sdv,.csv.cancast["T"]peach sdv;\n  info:update t:"Z",rule:190,maybe:0b from info where t="n",mw within 11 24,mdot<4,.csv.cancast["Z"]peach sdv;\n  info:update t:"P",rule:200,maybe:1b from info where t="n",mw within 12 29,mdot<4,{all x like"[12]*"}peach sdv,.csv.cancast["P"]peach sdv;\n  info:update t:"N",rule:210,maybe:1b from info where t="n",mw within 3 28,mdot=1,.csv.cancast["N"]peach sdv;\n  info:update t:"?",rule:220,maybe:0b from info where t="n"; / reset remaining maybe numeric\n  info:update t:"C",rule:230,maybe:0b from info where t="?",mw=1; / char\n  info:update t:"B",rule:240,maybe:0b from info where t in"HC",mw=1,mdot=0,{$[all x in"01tTfFyYnN";(any"0fFnN"in x)and any"1tTyY"in x;0b]}each dchar; / boolean\n  info:update t:"B",rule:250,maybe:1b from info where t in"HC",mw=1,mdot=0,{all x in"01tTfFyYnN"}each dchar; / boolean\n  info:update t:"X",rule:260,maybe:0b from info where t="?",mw=2,{$[all x in"0123456789abcdefABCDEF";(any .Q.n in x)and any"abcdefABCDEF"in x;0b]}each dchar; /hex\n  info:update t:"S",rule:270,maybe:1b from info where t="?",mw<.csv.SYMMAXWIDTH,mw>1,gr<.csv.SYMMAXGR; / symbols (max width permitting)\n  info:update t:"*",rule:280,maybe:0b from info where t="?"; / the rest as strings\n  / flag those S/* columns which could be encoded to integers (.Q.j10/x10/j12/x12) to avoid symbols\n  info:update j12:1b from info where t in"S*",mw<13,{all x in .Q.nA}each dchar;\n  info:update j10:1b from info where t in"S*",mw<11,{all x in .Q.b6}each dchar; \n  select c,ci,t,maybe,empty,res,j10,j12,ipa,mw,mdot,rule,gr,ndv,dchar from info}\ninfo:info0[;()] / by default don\'t restrict columns\ninfolike:{[file;pattern] info0[file;{x where x like y}[lower colhdrs[file];pattern]]} / .csv.infolike[file;"*time"]\n\n\\d .\n/ DATA:()\nbulkload:{[file;info]\n  if[not`DATA in system"v";\'`DATA.not.defined];\n  if[count DATA;\'`DATA.not.empty];\n  loadhdrs:exec c from info where not t=" ";loadfmts:exec t from info;\n  .csv.fs2[{[file;loadhdrs;loadfmts] `DATA insert $[count DATA;flip loadhdrs!(loadfmts;.csv.DELIM)0:file;loadhdrs xcol(loadfmts;enlist .csv.DELIM)0:file]}[file;loadhdrs;loadfmts]];\n  count DATA}\n@[.:;"\\l csvutil.custom.q";::]; / save your custom settings in csvutil.custom.q to override those set at the beginning of the file \n\n'}}]);