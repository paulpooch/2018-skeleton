# IMAGE_NAME_WEB := web-server
# IMAGE_NAME_DB := database
# LATEST_GIT_HASH := $(shell git rev-parse --short HEAD)
# USERNAME := paulpooch
# FULL_TAG := ${USERNAME}/${IMAGE_NAME}:${LATEST_GIT_HASH}

.PHONY: build
build:
	docker-compose up --build -d
#	docker build --pull -t ${USERNAME}/${IMAGE_NAME_DB} -f backend/ops/database/Dockerfile .
#	docker build --pull -t ${USERNAME}/${IMAGE_NAME_WEB} -f backend/ops/web-server/Dockerfile .

default: build
