if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    let formInput = document.getElementsByClassName('form-input');
    for(let i = 0; i < formInput.length; i++) {
        let input = formInput[i];
        input.addEventListener('change', formInputEvent)
        input.addEventListener('focus', formInputEvent)
        input.addEventListener('focusout', formInputFocusOut)
    }

    let tipPctButtons = document.getElementsByClassName('btn-tip-pct btn-green');
    for(let i = 0; i < tipPctButtons.length; i++) {
        let button = tipPctButtons[i];
        button.addEventListener('click', tipPctButtonClicked)
    }

    let customTipButton = document.getElementsByClassName('custom-tip')[0]
    customTipButton.addEventListener('change', customTipButtonChange)

    let resetButton = document.getElementsByClassName('btn-reset')[0]
    resetButton.addEventListener('click', reset)
}

function formInputEvent(event) {
    let element = event.target
    let elementValue = element.value
    let formGroupParent = element.closest('.form-group')
    let labelContainer = formGroupParent.getElementsByClassName('label-container')[0]
    let errorMessageLabel = labelContainer.getElementsByClassName('input-error-message')[0]
    if(isNaN(elementValue) || elementValue <= 0) {
        errorMessageLabel.style.display = 'inline'
        element.style.border = '2px solid var(--orange-brown)'
    } else {
        errorMessageLabel.style.display = 'none'
        element.style.border = '2px solid var(--strong-cyan)'    
    }
    
    computeTotalBill()
}

function formInputFocusOut(event) {
    let element = event.target
    let elementValue = element.value
    element.style.border = (isNaN(elementValue) || elementValue <= 0) ?
    '2px solid var(--orange-brown)' : 'none'
    computeTotalBill()
}

function tipPctButtonClicked(event) {
    let element = event.target
    let customTipButton = document.getElementsByClassName('custom-tip')[0]
    removeBtnActive()
    element.classList.add('btn-active')
    customTipButton.value = null;
    computeTotalBill()
}

function customTipButtonChange(event) {
    removeBtnActive()
    computeTotalBill()
}

function removeBtnActive() {
    let tipPctButtons = document.querySelectorAll('.btn-tip-pct.btn-green')
    for(let i = 0; i < tipPctButtons.length; i++) {
        let button = tipPctButtons[i];
        button.classList.remove('btn-active')
    }
}

function computeTotalBill() {
    //bill total elements
    let tipAmountPerPerson = document.getElementsByClassName('tip-amount-per-person')[0]
    let totalAmountPerPerson = document.getElementsByClassName('total-amount-per-person')[0]
    //bill computation elements
    let billAmount = document.getElementsByClassName('bill-input')[0].value
    let numberOfPeople = document.getElementsByClassName('number-of-people')[0].value
    
    let tipPctValue = document.getElementsByClassName('custom-tip')[0].value
    console.log(tipPctValue)
    let tipPctButton = document.getElementsByClassName('btn-tip-pct btn-active')[0]
    if(tipPctButton && tipPctButton.hasAttribute('data-value') && (isNaN(tipPctValue) || tipPctValue <= 0)) tipPctValue = tipPctButton.dataset.value
    tipPctValue = parseFloat(billAmount) * parseFloat(tipPctValue/100)

    let totalBill = parseFloat(billAmount) + parseFloat(tipPctValue)
    let tipAmountPerPersonValue = Math.round(((parseFloat(tipPctValue)/parseFloat(numberOfPeople)) + Number.EPSILON) * 100) / 100
    let totalAmountPerPersonValue = Math.round(((parseFloat(totalBill)/parseFloat(numberOfPeople)) + Number.EPSILON) * 100) / 100

    tipAmountPerPerson.innerText = (isNaN(tipAmountPerPersonValue) || tipAmountPerPersonValue <= 0) ? '$0.00' : `$${tipAmountPerPersonValue}`
    totalAmountPerPerson.innerText = (isNaN(totalAmountPerPersonValue) || totalAmountPerPersonValue <= 0) ? '$0.00' : `$${totalAmountPerPersonValue}`

}

function reset() {
    let billAmount = document.getElementsByClassName('bill-input')[0]
    let numberOfPeople = document.getElementsByClassName('number-of-people')[0]
    let customTipButton = document.getElementsByClassName('custom-tip')[0]
    removeBtnActive()
    billAmount.value = null
    numberOfPeople.value = null
    customTipButton.value = null
    computeTotalBill()

}