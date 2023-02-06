//HOMEWORK #1 - Long arithmetic on strings - Belen Robledo
 

//Addition - str1.plus(str2) = str1 + str2
String.prototype.plus = function (str2){
    let auxResult = [];
    let result = "";
    let carry = 0;
    let sum;
    let i = 1;

    len1 = this.length;
    len2 = str2.length;

    //Loop through both numbers starting from the end, adding each digit or "0" in case one number is already finished and taking into account the carry, if it exists.
    while(i<=len1 || i<=len2){ 
        sum = parseInt(this.charAt(len1 - i) || "0") + parseInt(str2.charAt(len2 - i) || "0");
        auxResult.push(sum % 10 + carry);
        carry = (sum >= 10) ? 1 : 0;
        i++;
    }

    //Invert result array
    for(let j=auxResult.length-1; j>=0; j--){
        result += auxResult[j];
    }

    result = result.clearZeros();

    return result;
}


//Subtraction - considering str1 is always greater than str2
String.prototype.minus = function (str2) {
    let auxResult = [];
    let result = "";
    let carry = 0;
    let subt;
    let i = 1;

    len1 = this.length;
    len2 = str2.length;

    /* Loop through the biggest number starting from the end, substracting a digit from the 2nd number or "0" in case it's already finished 
    also taking into account the carry, if it exists. */
    while(i<=len1){
        subt = parseInt(this.charAt(len1 - i)) - (carry + parseInt(str2.charAt(len2 - i) || "0"));
        if(subt<0){
            subt+=10;
            carry = 1;
        }
        else{
            carry = 0;
        }
        auxResult.push(subt % 10);
        i++;
    }

    //Invert result array
    for(let j=auxResult.length-1; j>=0; j--){
        result += auxResult[j];
    }

    result = result.clearZeros();

    return result;
}


//Division - str1.divide(str2) = str1 divided by str2 (result = only int part)
String.prototype.divide = function (str2) {
    const dividend = this.toString();
    const divisor = str2;

    let result = "0";
    let subDividend = "0";
    let digit, quotient;

    if(divisor === "0"){
        return undefined;
    }
    else{
        // Checks by digits if the dividend is biggest than the divisor. If it is, iterates substracting the divisor while calculating the quotient.
        for (let i = 0; i < dividend.length; i++) {
            digit = parseInt(dividend[i]);
            subDividend += digit;

            quotient = 0;
            while (parseInt(subDividend) >= parseInt(divisor)) {
                subDividend = subDividend.minus(divisor);
                quotient++;
            }
            
            // Add each quotient to the result
            if (result !== "0" || quotient > 0) {
                result += quotient;
            }
        }

        result = result.clearZeros();

        return result;
    }
}


//Multiplication - str1.multiply(str2) = str1 * str2;
String.prototype.multiply = function (str2) {
    const len1 = this.length;
    const len2 = str2.length;

    let result = Array(len1 + len2).fill(0);        //Initialize with zeros an array of the max possible length.

    for(let i = len1-1; i >= 0; i--){               // Loop through each digit in both strings starting from the end.
        const f1 = parseInt(this.charAt(i));

        for(let j = len2-1; j >= 0; j--){
            const f2 = parseInt(str2.charAt(j));
            const mul = f1 * f2;
            const sum = mul + result[i+j+1];        //multiply and add the previous value in case there was any carry.
            result[i+j] += parseInt(sum / 10);      //save the value in the position and the carry in the previous position.
            result[i+j+1] = sum % 10;
        }
    }

    result = result.join("");
    result = result.clearZeros();

    return result;
}

//Extra function to delete zeros on left.
String.prototype.clearZeros = function () {
    let result = this.toString();

    while (result.length > 1 && result.charAt(0) === "0") {
        result = result.substring(1);
    }

    return result;
}

let A = "14059631485";
let B = "112356891";

console.log( A.plus(B) );
console.log( A.minus(B) );
console.log( A.multiply(B) );
console.log( A.divide(B) );