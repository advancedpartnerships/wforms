#!/usr/bin/env python
import os, re, time

base2_version = "v1.0.1";
base2_modules = (
	'lib/base2/'+base2_version+'/src/base2.js',
	'lib/base2/'+base2_version+'/src/base2-dom.js',
)
wforms_modules = (
	'wforms_core.js',
	'wforms_hint.js',
	'wforms_paging.js',
	'wforms_repeat.js',
	'wforms_switch.js',
	'wforms_validation.js',
	'wforms_calculation.js',
	'wforms_autoformat.js',
	'wforms_length_prompt.js',
)

# Order of os.path.dirname / os.path.abspath is not optional
# http://stackoverflow.com/questions/7783308/os-path-dirname-file-returns-empty
branch = os.path.dirname(os.path.abspath(__file__))+'/..'
path = 	os.path.dirname(os.path.realpath(__file__))+'/..'
js_compressor_cmd = 'java -jar yuicompressor-2.2.4.jar --type js -o "%s" "%s"'

head = '''/*** 
	wForms %s 
	a javascript extension to web forms.   

	Build $%s$

	THIS FILE IS AUTOMATICALLY GENERATED.  If creating patches, please 
	diff against the source tree, not this file. 

	Copyright (c) 2005-2012 Veer West LLC and contributors. 
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/> 
	For more information, visit: http://www.formassembly.com/wForms  

	wForms requires base2 - copyright 2007, Dean Edwards.  
***/'''
# Date format configured to match Window's build script
build_date = time.strftime('%a, %d %b %Y %H:%M:%S UTC',time.gmtime())

# Combine wForms and base2 modules into one set
# and join
modules = base2_modules+wforms_modules
compilation = []
for module in modules:
	f = open(branch +'/'+ module)
	compilation.append(f.read().strip())
	f.close()

m = re.search('wFORMS\.VERSION\s+=\s+"([^"]+)";', compilation[2])
compilation = [head % (m.group(1),build_date)] + compilation

outfile = branch +'/build/wforms.js';
wforms = open(outfile, 'w')
print 'Writing '+ wforms.name
wforms.write("\n\n".join(compilation))
wforms.close()

#Pack it without a header
outfile_packed = branch +'/build/wforms_pack.js';
os.system(js_compressor_cmd % (outfile_packed,outfile))
print 'Writing '+ wforms.name + " compressed"
