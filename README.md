# KoppeCoin
This is a cryptocurrency made just for study purposes. 

## Install
This is a NodeJs Projecto, so be sure you installed [node and npm](https://nodejs.org/en/) in your computer.

To install the project you'll have to clone and install the dependencies, just run the commands bellow in your terminal:
```
git clone https://github.com/mateusKoppe/KoppeCoin &&
cd KoppeCoin &&
npm install
```

## Commands
* `npm start`: It'll start a http and a p2p server, you can configure it using these arguments:
    * `HTTP_PORT`
    * `P2P_PORT`
    * `PEERS`
* `npm run dev`: It runs exactly the same as `npm start` but with automatic refresh
* `npm run test`: It'll test the code with jest
* `npm run linter`: It'll run eslint in the project`s code
