#!/bin/bash

# Install Dependencies
######################
apt-get update;
apt-get install -y wget;
apt-get install -y curl;
apt-get install -y git;
apt-get install -y vim;

npm install -g npm@latest;

apt-get update;
apt-get install -y build-essential python3-dev python3-pip python3-setuptools python3-wheel python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info;
pip3 install WeasyPrint;