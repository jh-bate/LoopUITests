#!/usr/bin/env bash

NODE_VERSION=stable

export CODE_SIGNING_REQUIRED=NO
brew tap wix/brew
brew install applesimutils --HEAD

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install $NODE_VERSION
nvm use $NODE_VERSION
nvm alias default $NODE_VERSION
npm install -g detox-cli >/dev/null 2>&1
npm install >/dev/null 2>&1


