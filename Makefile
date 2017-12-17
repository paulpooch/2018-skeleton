IMAGE_NAME := web-server
LATEST_GIT_HASH := $(shell git rev-parse --short HEAD)
USERNAME := paulpooch
# FULL_TAG := ${USERNAME}/${IMAGE_NAME}:${LATEST_GIT_HASH}
FULL_TAG := ${USERNAME}/${IMAGE_NAME}

.PHONY: build
build:
	docker build --pull -t ${FULL_TAG} -f backend/ops/web-server/Dockerfile .

default: build
