cd ~/fabric-tools
./stopFabric.sh
./teardownFabric.sh
./downloadFabric.sh
./startFabric.sh

composer card delete -n admin@marketplace

cd ~/marketplace

composer archive create -t dir -n .

composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName marketplace

composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile marketplace@0.0.1.bna --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@marketplace

composer-rest-server -c admin@marketplace -n never -w true
