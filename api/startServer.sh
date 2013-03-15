#!/bin/bash

project=`git rev-parse --show-toplevel`
dbDir=$project/mongodb
logsDir=$project/logs
apiDir=$project/api

#cd into project root -- this should be configurable lol
cd $project

#make sure node is ready to go
# npm install
# npm install -g forever

#maybe create directories if they don't exist
#this should also be configurable...
mkdir -p $dbDir $logsDir

mongod --dbpath $dbDir --logpath $logsDir/mongo.log &
node $apiDir/server.js
# forever stop $project/node/core.js
# forever -l $logsDir/node.log -a start $project/node/core.js

