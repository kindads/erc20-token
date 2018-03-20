#!/usr/bin/env bash

#On exit kill the ganache process
trap cleanup EXIT

cleanup() {
  # Kill the ganache instance that we started (if we started one and if it's still running).
  if [ -n "$ganache_pid" ] && ps -p $ganache_pid > /dev/null; then
    kill -9 $ganache_pid
  fi
}

# Is the local ganache-cli instance runing?
is_ganache_cli_running() {
  nc -z localhost 8545
}

if is_ganache_cli_running; then
  echo "Using existing ganache instance"
else
  echo "Starting a new ganache instance"
  ./node_modules/.bin/ganache-cli > /dev/null &
  ganache_pid=$!
fi

node_modules/.bin/truffle test "$@"
