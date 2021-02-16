(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[485],{1148:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default='(in-package :cl-postgres)\n\n;; These are used to synthesize reader and writer names for integer\n;; reading/writing functions when the amount of bytes and the\n;; signedness is known. Both the macro that creates the functions and\n;; some macros that use them create names this way.\n(eval-when (:compile-toplevel :load-toplevel :execute)\n  (defun integer-reader-name (bytes signed)\n    (intern (with-standard-io-syntax\n              (format nil "~a~a~a~a" \'#:read- (if signed "" \'#:u) \'#:int bytes))))\n  (defun integer-writer-name (bytes signed)\n    (intern (with-standard-io-syntax\n              (format nil "~a~a~a~a" \'#:write- (if signed "" \'#:u) \'#:int bytes)))))\n\n(defmacro integer-reader (bytes)\n  "Create a function to read integers from a binary stream."\n  (let ((bits (* bytes 8)))\n    (labels ((return-form (signed)\n               (if signed\n                   `(if (logbitp, (1 - bits) result)\n(dpb result(byte, (1 - bits) 0) - 1)\nresult)\n`result))\n             (generate-reader (signed)\n               `(defun, (integer - reader - name bytes signed)(socket)\n  (declare(type stream socket)\n  #.* optimize *)\n  , (if (= bytes 1)\n`(let ((result (the (unsigned-byte 8) (read-byte socket))))\n                          (declare (type (unsigned-byte 8) result))\n                          ,(return-form signed))\n                       `(let((result 0))\n  (declare(type(unsigned - byte, bits) result))\n  ,@(loop : for byte : from(1 - bytes) : downto 0\n                                   : collect`(setf (ldb (byte 8 ,(* 8 byte)) result)\n                                                   (the (unsigned-byte 8) (read-byte socket))))\n                          ,(return-form signed))))))\n      `(progn\n;; This causes weird errors on SBCL in some circumstances.Disabled for now.\n; ; (declaim(inline, (integer - reader - name bytes t)\n;;                          , (integer - reader - name bytes nil)))\n(declaim(ftype(function (t) (signed - byte, bits))\n  , (integer - reader - name bytes t)))\n         , (generate - reader t)\n(declaim(ftype(function (t) (unsigned - byte, bits))\n  , (integer - reader - name bytes nil)))\n         , (generate - reader nil)))))\n\n(defmacro integer - writer(bytes)\n"Create a function to write integers to a binary stream."\n  (let((bits(* 8 bytes)))\n    `(progn\n      (declaim (inline ,(integer-writer-name bytes t)\n                       ,(integer-writer-name bytes nil)))\n      (defun ,(integer-writer-name bytes nil) (socket value)\n        (declare (type stream socket)\n                 (type (unsigned-byte ,bits) value)\n                 #.*optimize*)\n        ,@(if (= bytes 1)\n              `((write - byte value socket))\n  (loop :for byte : from(1 - bytes) : downto 0\n                    : collect`(write-byte (ldb (byte 8 ,(* byte 8)) value)\n                               socket)))\n        (values))\n      (defun ,(integer-writer-name bytes t) (socket value)\n        (declare (type stream socket)\n                 (type (signed-byte ,bits) value)\n                 #.*optimize*)\n        ,@(if (= bytes 1)\n              `((write - byte(ldb(byte 8 0) value) socket))\n(loop: for byte: from (1 - bytes) : downto 0\n                    : collect `(write-byte (ldb (byte 8 ,(* byte 8)) value)\n                               socket)))\n        (values)))))\n\n;; All the instances of the above that we need.\n\n(integer-reader 1)\n(integer-reader 2)\n(integer-reader 4)\n(integer-reader 8)\n\n(integer-writer 1)\n(integer-writer 2)\n(integer-writer 4)\n\n(defun write-bytes (socket bytes)\n  "Write a byte-array to a stream."\n  (declare (type stream socket)\n           (type (simple-array (unsigned-byte 8)) bytes)\n           #.*optimize*)\n  (write-sequence bytes socket))\n\n(defun write-str (socket string)\n  "Write a null-terminated string to a stream \\(encoding it when UTF-8\nsupport is enabled.)."\n  (declare (type stream socket)\n           (type string string)\n           #.*optimize*)\n  (enc-write-string string socket)\n  (write-uint1 socket 0))\n\n(declaim (ftype (function (t unsigned-byte)\n                          (simple-array (unsigned-byte 8) (*)))\n                read-bytes))\n(defun read-bytes (socket length)\n  "Read a byte array of the given length from a stream."\n  (declare (type stream socket)\n           (type fixnum length)\n           #.*optimize*)\n  (let ((result (make-array length :element-type \'(unsigned-byte 8))))\n    (read-sequence result socket)\n    result))\n\n(declaim (ftype (function (t) string) read-str))\n(defun read-str (socket)\n  "Read a null-terminated string from a stream. Takes care of encoding\nwhen UTF-8 support is enabled."\n  (declare (type stream socket)\n           #.*optimize*)\n  (enc-read-string socket :null-terminated t))\n\n(defun skip-bytes (socket length)\n  "Skip a given number of bytes in a binary stream."\n  (declare (type stream socket)\n           (type (unsigned-byte 32) length)\n           #.*optimize*)\n  (dotimes (i length)\n    (read-byte socket)))\n\n(defun skip-str (socket)\n  "Skip a null-terminated string."\n  (declare (type stream socket)\n           #.*optimize*)\n  (loop :for char :of-type fixnum = (read-byte socket)\n        :until (zerop char)))\n\n(defun ensure-socket-is-closed (socket &key abort)\n  (when (open-stream-p socket)\n    (handler-case\n        (close socket :abort abort)\n      (error (error)\n        (warn "Ignoring the error which happened while trying to close PostgreSQL socket: ~A" error)))))\n\n'}}]);
//# sourceMappingURL=485.991f3383.chunk.js.map