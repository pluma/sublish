LICENSE_COMMENT="/*! sublish 0.4.6 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */"

cover: lint
	@./node_modules/.bin/istanbul cover -x "**/spec/**" \
		./node_modules/mocha/bin/_mocha --report lcov spec/ -- -R spec

coveralls:
	@./node_modules/.bin/istanbul cover -x "**/spec/**" \
		./node_modules/mocha/bin/_mocha --report lcovonly spec/ -- -R spec && \
		cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
	@rm -rf ./coverage

test: lint
	@./node_modules/.bin/mocha \
		--growl \
		--reporter spec \
		spec/*.spec.js

clean:
	@rm -rf dist

dist/vendor: clean
	@mkdir -p dist

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
	@echo "return exports;\
	});" >> dist/sublish.amd.js

dist/sublish.min.js: dist/sublish.js
	@./node_modules/.bin/uglifyjs dist/sublish.js --comments -m > dist/sublish.min.js

dist/sublish.globals.min.js: dist/sublish.globals.js
	@./node_modules/.bin/uglifyjs dist/sublish.globals.js --comments -m > dist/sublish.globals.min.js

dist/sublish.amd.min.js: dist/sublish.amd.js
	@./node_modules/.bin/uglifyjs dist/sublish.amd.js --comments > dist/sublish.amd.min.js

dist: dist/sublish.min.js dist/sublish.globals.min.js dist/sublish.amd.min.js

lint:
	@./node_modules/.bin/jshint src/sublish.js spec

.PHONY: lint test clean
