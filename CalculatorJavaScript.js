Array.prototype.forEach.call(document.querySelectorAll('.button'), function(btn) {
    btn.addEventListener('click', function() {
        var btnClicked = this.getAttribute('data-value');
        input(btnClicked);

    })
})

// Add  minus into currentNumber
String.prototype.splice = function(index, rem, str) {
    return this.slice(0, index) + str + this.slice(index + Math.abs(rem));
};

// Vareiables
var isResult, isFunction, isInit, currentNum, preButton, mathOp, preMathOp, mathOpCount, mathOpPressed, result, historyValue, isDivideByZero,
    isInvalidInput, mainScreenValue, firstCuurentNum, strPercentage, strFunction;
var mainScreen = document.querySelector('#main');
var historyScreen = document.querySelector('#history');

// initialize 
function init() {
    currentNum = '0';
    isResult = false;
    isFunction = false;
    preButton = null;
    mathOp = null;
    preMathOp = null;
    mathOpCount = 0;
    mathOpPressed = false;
    result = null;
    isDivideByZero = false;
    isInvalidInput = false;
    isInit = true;
    historyValue = '';
    updateMainScreen(0);
    updateHistoryScreen(historyValue);
}

// When a button was clicked
function input(btn) {
    // If button is number or'.'
    if (!isNaN(btn) || btn === '.') {
        // If button is a '.'
        if (btn === '.') {
            if (preButton === '=' || mathOpPressed) {
                currentNum = '0';
                currentNum += btn;
            } else if (isFunction) {
                currentNum = '0';
                currentNum += btn;
                historyValue = '';
            } else if (btn === '.' && /^\d+$/.test(currentNum)) {
                currentNum += btn;
            }
        }
        // If button is a digit
        else if (!isNaN(btn)) {
            if (preButton === '=' || preButton === 'sqr' || preButton === 'sqrt' || preButton === 'cube' || preButton === 'fraction' || preButton === 'percentage') {
                currentNum = '0';
                updateMainScreen(0);
                historyValue = '';
            }
            if (mainScreen.value === '0' || mathOpPressed || mainScreen.value === 'Cannot divide by zero' || mainScreen.value === 'Invalid input') {
                currentNum = btn;

            } else
                currentNum += btn;
        }
        currentNum = maxValue(currentNum);
        isFunction = false;
        mathOpPressed = false;
        isResult = false;
        isNumber = true;
        updateMainScreen(currentNum);
        updateHistoryScreen(historyValue);
    }

    //If button is sign, Math operation and etc ...
    else {
        // Math Operation '+', etc.
        if (btn === '-' || btn === '+' || btn === '*' || btn === '/') {

            switch (btn) {
                case '+':
                    mathOp = addition;
                    break;
                case '-':
                    mathOp = subtraction;
                    break;
                case '/':
                    mathOp = division;
                    break;
                case '*':
                    mathOp = multiplication;
                    break;
            }
            mathOpPressed = true;

            //History Screen
            if (mainScreen.value.indexOf('.') === mainScreen.value.length - 1) {
                mainScreen.value = mainScreen.value.slice(0, length - 1);
            }
            if (mainScreen.value === '0') {
                historyValue = '0' + btn;
            } else if (!isNaN(preButton)) {
                historyValue += mainScreen.value + btn;
            } else if (preButton === '+' || preButton === '-' || preButton === '*' || preButton === '/') {
                historyValue = historyValue.slice(0, historyValue.length - 1);
                historyValue += btn;
            } else if (isFunction) {
                historyValue += btn;
            } else if (preButton === '=') {
                historyValue = mainScreen.value + btn;
            } else if (preButton === 'negate') {
                historyValue += mainScreen.value + btn;
            } else if (!isNaN(currentNum)) {
                historyValue += mainScreen.value + btn;
            }
            isFunction = false;
        }

        // Clear and Clear Entry
        if (btn === 'C' || btn === 'CE') {
            init();
            updateMainScreen(currentNum);
            return;
        }

        // plus-minus '+-' button
        if (btn === 'negate') {
            if (preButton === '+' || preButton === '-' || preButton === '*' || preButton === '/') {
                currentNum = result;
            }
            if (mainScreen.value === '0')
                return;
            var str;
            var mainScreenValue = mainScreen.value;
            mainScreenValue = mainScreenValue.split(',').join('');
            if (mainScreenValue == currentNum || result === null)
                str = String(currentNum);
            else
                str = String(result);
            if (str.indexOf('-') === 0) {
                str = str.substring(1);
            } else {
                str = str.splice(0, 0, '-');
            }
            if (mainScreenValue == currentNum)
                currentNum = Number(str);
            else
                result = Number(str);
            updateMainScreen(str);
            // History
            if (isFunction) {
                historyValue = historyValue.slice(-historyValue.length, -strFunction.length);
                strFunction = btn + '(' + strFunction + ')';
                historyValue += strFunction;
            }

        }

        // Functions like sqr, sqrt, cube and etc.
        if (btn === 'sqr' || btn === 'sqrt' || btn === 'cube' || btn === 'fraction' || btn === 'percentage') {
            // History except percentage
            if (btn !== 'percentage') {
                if (preButton !== 'sqr' && preButton !== 'sqrt' && preButton !== 'cube' && preButton !== 'fraction' && preButton !== 'negate') {
                    firstCuurentNum = currentNum;
                    strFunction = btn === 'fraction' ? '1/(' + mainScreen.value + ')' : btn + '(' + mainScreen.value + ')';
                    historyValue += strFunction;
                } else {
                    historyValue = historyValue.slice(-historyValue.length, -strFunction.length);
                    strFunction = btn === 'fraction' ? '1/(' + strFunction + ')' : btn + '(' + strFunction + ')';
                    historyValue += strFunction;
                }
            }
            isFunction = true;
            mainScreenValue = mainScreen.value;
            mainScreenValue = mainScreenValue.split(',').join('');
            var str = currentNumOrResult(mainScreenValue);
            switch (btn) {
                case 'sqr':
                    str = square(str);
                    break;
                case 'sqrt':
                    str = squareRoot(str);
                    break;
                case 'cube':
                    str = cube(str);
                    break;
                case 'fraction':
                    str = fraction(str);
                    break;
                case 'percentage':
                    str = percentage(str);
                    break;
            }
            if (isInvalidInput) {
                init();
                mainScreen.value = 'Invalid input';
            } else if (isDivideByZero) {
                init();
                mainScreen.value = 'Cannot divide by zero';
            } else {
                if (mainScreenValue == currentNum)
                    currentNum = Number(str);
                else
                    result = Number(str);
                updateMainScreen(str);
            }
            // History percentage
            if (btn === 'percentage') {
                str = String(str);
                if (preButton != 'percentage' && (preButton != 'sqr' && preButton != 'sqrt' && preButton != 'cube' && preButton != 'fraction')) {
                    strPercentage = str;
                    historyValue += str;
                } else if (preButton == 'percentage') {
                    historyValue = historyValue.slice(-historyValue.length, -strPercentage.length);
                    historyValue += str;
                } else {
                    historyValue = historyValue.slice(-historyValue.length, -strFunction.length);
                    historyValue += str;
                }
            }
        }

        // Assign current number to result if initial 
        if ((mathOp && result === null)) {
            result = Number(currentNum);
        }

        // Equal button
        if (btn === '=') {
            isResult = true;
            if (preButton === '+' || preButton === '-' || preButton === '*' || preButton === '/')
                currentNum = result;
            if (mathOp) {
                mathOpPressed = false;
                isFunction = false;
                isResult = true;
                mathOpCount = 0;
                mathOp(Number(currentNum));
                result = roundResult(result);
                updateMainScreen(result);
                historyValue = '';
            }
        }

        // Count Math operation
        if (mathOpPressed && btn !== 'fraction' && btn !== 'percentage' && btn !== 'sqr' && btn != 'sqrt' && btn != 'negate' && btn != 'cube' &&
            btn != 'backSpace' && btn != 'C' && btn != 'CE' && preButton != '+' && preButton != '-' && preButton != '/' && preButton != '*') {
            mathOpCount++;
        }

        // Result in row
        if (mathOpCount >= 2) {
            isResult = true;
            mathOpCount--;
            preMathOp(Number(currentNum));
            result = roundResult(result);
            updateMainScreen(result);
            currentNum = result;
        }

        // BackSpace button
        if (btn === 'backSpace') {
            var str = mainScreen.value;
            str = str.split(',').join('');
            if (isResult || isFunction || mathOpPressed) {
                return;
            } else {
                str = str.slice(0, -1);
                if (!str.length || str === '-' || str === '-0')
                    str = 0;
                currentNum = str;
                updateMainScreen(currentNum);
            }
        }

        // Update history screen
        if (btn !== 'CE' && btn !== 'CS') {
            updateHistoryScreen(historyValue);
        }
    }
    preButton = btn;
    preMathOp = mathOp;
    isInit = false;
}

function updateHistoryScreen(val) {
    historyScreen.value = val;
}

function updateMainScreen(val) {
    var isPositive = false;
    var isNegative = false;
    val = String(val);
    if (val.indexOf('-') === 0) {
        isNegative = true;
        val = val.substring(1);
        val = val.split(',').join('');
    } else {
        isPositive = true;
    }
    if (isPositive)
        mainScreen.value = addComma(val);
    if (isNegative) {
        val = addComma(val);
        val = val.splice(0, 0, '-');
        mainScreen.value = val;
    }
}

function addComma(val) {
    var len = val.length;
    var currentLen;
    var lenInt = val.length - (len - val.indexOf('.'));
    if (/^\d+$/.test(val))
        currentLen = len;
    else
        currentLen = lenInt;
    for (let i = 3; i < currentLen; i += 3) {
        if (currentLen > i) {
            val = val.splice(currentLen - i, 0, ',');
        }
    }
    return val;
}

function maxValue(val) {
    val = String(val);
    if (val.length === 0)
        return;
    if (val.length > 15) {
        val = val.slice(0, 16);
    }
    return String(val);
}

function roundResult(val) {
    return Math.round(val * 100000000000000) / 100000000000000;
}

function currentNumOrResult(val) {
    if ((val == currentNum || result === null))
        return Number(currentNum);
    else
        return Number(result);
}

function addition(val) {
    result += val;
}

function division(val) {
    let rslt = result / val;
    if (rslt === Infinity) {
        isDivideByZero = true;
        return;
    } else {
        result /= val;
    }
}

function subtraction(val) {
    result -= val;
}

function multiplication(val) {
    result *= val;
}

function square(val) {
    return Math.pow(val, 2);
}

function squareRoot(val) {
    let rslt = Math.sqrt(val);
    if (isNaN(rslt)) {
        isInvalidInput = true;
    }
    return Math.sqrt(val);
}

function cube(val) {
    return Math.pow(val, 3);
}

function fraction(val) {
    let rslt = 1 / val;
    if (rslt === Infinity) {
        isDivideByZero = true;
    }
    return rslt;
}

function percentage(val) {
    return (val / 100);
}
init();