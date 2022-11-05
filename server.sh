rm -R sock
docker run \
	--rm \
	--network none \
	--memory 1g \
	-v $(pwd)/sock:/var/run/dev-test \
	dev-test-proxycurl \
  /var/run/dev-test/sock