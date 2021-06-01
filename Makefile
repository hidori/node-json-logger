.PHONY: test
test:
	npm test

.PHONY: intall
install:
	npm install

.PHONY: version-patch
version-patch:
	npm version patch

.PHONY: publish
publish:
	npm publish
