test:
	@./node_modules/.bin/mocha \
		--growl \
		--require spec/common.js \
		--reporter spec \
		spec/*.spec.js

min:
	@./node_modules/.bin/uglifyjs lib/sublish.js > lib/sublish.min.js

lint:
	@./node_modules/.bin/jshint lib/sublish.js spec

.PHONY: lint test
