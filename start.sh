#!/bin/sh

# 启动脚本

echo "Git Pull"

git pull &&

echo "start docker"

docker build -t double-official-backend . &&

container=$(docker container ls -aqf "name=double-official-backend")

if [ -n "$container" ]; then
    echo "stop container and rm container"
    docker container stop $container &&
    docker container rm $container &&

    echo "start container"
    docker run --name double-official-backend -d -p 3021:3021 double-official-backend
else
    echo "start container"
    docker run --name double-official-backend -d -p 3021:3021 double-official-backend  
fi
