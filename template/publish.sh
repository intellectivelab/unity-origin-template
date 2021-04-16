#!/bin/bash
echo "Tagging docker image..."
docker image tag unity-origin/gw-app $DOCKER_REGISTRY/unity-origin/gw-app:latest

echo "Publishing docker image..."
docker login -u $DOCKER_USER -p $DOCKER_PASSWORD $DOCKER_REGISTRY
docker image push $DOCKER_REGISTRY/unity-origin/gw-app:latest