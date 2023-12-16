.PHONY: test
test:
	npm test

.PHONY: install
install:
	npm ci

.PHONY: version-patch
version-patch:
	npm version patch

.PHONY: version-minor
version-minor:
	npm version minor

.PHONY: publish
publish:
	npm publish
