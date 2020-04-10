#!/bin/bash

buildType="Debug"
branch="dev"

if [ "$1" != "" ]; then
    branch="$1"
fi

if [ "$2" != "" ]; then
    buildType="$2"
fi


echo "Building as $buildType build"
echo "Build branch $branch"

rm -rf build
mkdir build
cd  build
git clone --branch="$branch" --recurse-submodules git@github.com:tidepool-org/LoopWorkspace.git

xcodebuild -workspace ./LoopWorkspace/Tidepool/Tidepool.xcworkspace -scheme 'Tidepool Loop' -configuration "$buildType" -destination 'name=iPhone 11 Pro' build SYMROOT="$(pwd)"
