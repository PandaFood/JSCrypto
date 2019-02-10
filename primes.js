const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

onmessage = function (event) {
    self.importScripts('./BigInteger.min.js');

    console.log(event.data);
    var potentialPrime = bigInt(event.data, BASE64);
    console.log(potentialPrime);

    var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
    var deltaIdx = 0;

    do {

        potentialPrime = potentialPrime.add(GCD_30_DELTA[deltaIdx++ % 8]);

        var isPrime = isBigNumPrime(potentialPrime);

        console.log(new Date().toLocaleTimeString() + ": testing nr: " + deltaIdx + " keylength: " + potentialPrime.bitLength() + " - " + isPrime);
    } while (!isPrime);


    postMessage(potentialPrime);
};

function isBigNumPrime(num){
    return num.isProbablePrime(2);
    }
    