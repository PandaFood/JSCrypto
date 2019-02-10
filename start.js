var worker = new Worker('primes.js');

const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

generateLargePrime(2048);

function generateLargePrime(keyLength){

var bitArray = generateRandomBitArray(keyLength);

var key = formatBitArrayToKey(bitArray);

console.log(key);
worker.postMessage(key);



}


worker.onmessage = function(event) {
    var num = event.data;
    console.log(num.toString());
};

worker.onerror = function(error) {
  dump('Worker error: ' + error.message + '\n');
  throw error;
};



function formatBitArrayToKey(bitArray){

  var potentialPrime = bigInt.fromArray(bitArray, 2);

  var thirtyDiff = potentialPrime.mod(30);
  potentialPrime = potentialPrime.add(31 - thirtyDiff);
  console.log(potentialPrime.toString());


  return potentialPrime.toString(64, BASE64);
}

function generateRandomBitArray(size){

var randomIntArray = new Uint32Array(4);
var bitArray = new Array();

do {
  randomIntArray = window.crypto.getRandomValues(randomIntArray);
  for(var i = 0; i < randomIntArray.length; i++){
    var q = randomIntArray[i];

    while (q > 0 && bitArray.length < size){
      bitArray.push(q % 2);
      q = Math.floor(q / 2);
    } 
  } 
} while (bitArray.length < size);


return bitArray;
}




