const addNumber = function (evt) {
    let value = evt.target.textContent

    if (digitPanel.textContent === '0' || isResolved()) {
        digitPanel.textContent = value
    } else {
        digitPanel.textContent += value
    }
}

const processOperator = function (evt) {
    let value = evt.target.textContent
    let hasPreviousOp = hasPreviousOperation()

    if(isResolved()){
        digitPanel.textContent = '0'
        return;
    }

    switch (value) {
        case 'C':
            digitPanel.textContent = '0'
            return;
        case '.':
            digitPanel.textContent += '.'
            return;
        case '=':
            if(hasPreviousOp){
                let options = digitPanel.textContent.split(' ')
                if(options.length === 3 && options[2] !== ''){
                    showResult(options[0], options[2], options[1])
                }
            }
            return;
    }

    if (!hasPreviousOp &&
        digitPanel.textContent !== '0') {
        digitPanel.textContent += ' ' + value + ' '
    }
}

const showResult = function(op1, op2, operation){
    digitPanel.textContent += ' = '
    switch (operation){
        case '+':
            digitPanel.textContent +=  +op1 + +op2
            return;
        case '-':
            digitPanel.textContent += op1 - op2
            return;
        case '*':
            digitPanel.textContent += op1 * op2
            return;
        case '/':
            digitPanel.textContent += op1 / op2
            return;
    }
}

const digitPanel = document.getElementById('digitPanelValue')
document.querySelectorAll('.number').forEach(el => el.addEventListener('click', addNumber))
document.querySelectorAll('.operator').forEach(el => el.addEventListener('click', processOperator))

const operators = ['*', '-', '+', '/']
const escapedOperators = operators.map(o => o.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))

function hasPreviousOperation(){
    return new RegExp(escapedOperators.join("|")).test(digitPanel.textContent)
}

function isResolved(){
    return digitPanel.textContent.includes('=')
}



