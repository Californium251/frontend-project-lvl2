publish:
	npm publish --dry-run

lint:
	npx eslint --format json .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest