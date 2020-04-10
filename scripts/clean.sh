#!/bin/sh -eu

#
#  clean.sh
#  LoopUITests
#
#  Created by Darin Krauss on 2/7/20.
#  Copyright © 2020 Tidepool Project. All rights reserved.
#

SCRIPT="$(basename "${0}")"
SCRIPT_DIRECTORY="$(dirname "${0}")"
TEST_DIRECTORY="${SCRIPT_DIRECTORY}/.."

error() {
  echo "ERROR: ${*}" >&2
  echo "Usage: ${SCRIPT}" >&2
  exit 1
}

if [ ${#} -ne 0 ]; then
  error "Unexpected arguments: ${*}"
fi

rm -rf "${TEST_DIRECTORY}/artifacts"
rm -rf "${TEST_DIRECTORY}/build"
rm -rf "${TEST_DIRECTORY}/node_modules"
