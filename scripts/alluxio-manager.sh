#!/bin/bash

function usage() {
  echo "Usage: [AM_PORT=8080] alluxio-manager.sh start|stop"
}

function start() {
  AM_PORT="${AM_PORT:-8080}"
  echo "starting alluxio-manager"
  java11; $JAVA_HOME/bin/java -jar target/alluxio-manager-0.0.1.jar --server.port=8080

}

function stop() {
  echo "stopping alluxio-manager"
}

function main() {
  case $1 in
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  *)
    usage
    ;;
  esac
}

main $@
