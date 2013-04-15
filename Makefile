LICENSE_COMMENT="/*! sublish 0.4.2 Copyright (c) 2013 Alan Plum. MIT licensed. */"

test:
	@./node_modules/.bin/mocha \
		--growl \
		--reporter spec \
		spec/*.js

clean:
	@rm -rf dist

dist/vendor: clean
	@mkdir -p dist/vendor

dist/sublish.js: dist/vendor
	@echo $(LICENSE_COMMENT) > dist/sublish.js
	@cat src/sublish.js >> dist/sublish.js

dist/sublish.globals.js: dist/vendor
	@echo $(LICENSE_COMMENT) > dist/sublish.globals.js
	@echo "(function(root){\
	var require=function(key){return root[key];},\
	exports=(root.sublish={});" >> dist/sublish.globals.js
	@cat src/sublish.js >> dist/sublish.globals.js
	@echo "}(this));" >> dist/sublish.globals.js

dist/sublish.amd.js: dist/vendor
	@echo $(LICENSE_COMMENT) > dist/sublish.amd.js
	@echo "define(function(require, exports) {" >> dist/sublish.amd.js
	@cat src/sublish.js >> dist/sublish.amd.js
	@echo "});" >> dist/sublish.amd.js

dist/sublish.min.js: dist/sublish.js
	@./node_modules/.bin/uglifyjs dist/sublish.js > dist/sublish.min.js

dist/sublish.globals.min.js: dist/sublish.globals.js
	@./node_modules/.bin/uglifyjs dist/sublish.globals.js > dist/sublish.globals.min.js

dist/sublish.amd.min.js: dist/sublish.amd.js
	@./node_modules/.bin/uglifyjs dist/sublish.amd.js > dist/sublish.amd.min.js

dist: dist/sublish.min.js dist/sublish.globals.min.js dist/sublish.amd.min.js

lint:
	@./node_modules/.bin/jshint src/sublish.js spec

.PHONY: lint test clean
