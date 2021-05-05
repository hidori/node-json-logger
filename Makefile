.PHONY: intall
install:
	npm install

.PHONE: version-patch
version-patch:
	npm version patch

.PHONE: publish
push:
	npm publish
