import { getFullTitle } from "./utils.js";
import state from "./state.js"

export const renderResult = ({code, amount, fullName}) => {
    return `<div class="form-info__result-item from" id="resultFrom">
                <div class="from__icon icon">
                    <img src="../images/arrow.svg" alt="">
                </div>
                <div class="from__titles">
                    <div class="from__titles-title">${code}</div>
                    <div class="from__titles-full">${fullName}</div>
                </div>
                <div class="from__amount">${amount}</div>
            </div>`
}

const getCurrencyItemAction = (isBase) => {
    const { actions: { remove, change}} = state;
    const actionName = isBase ? change : remove;

    return `<button class="currency-${actionName} currency-button" data-action='${actionName}'>${actionName}</button>`;
}

export const renderCurrentItem = ({code, base_code: baseCode, rate = 1}) => {
    const isBase = code === baseCode;
    const action = getCurrencyItemAction(isBase);
    const full = getFullTitle(state.codes, code);
    
    return `<div class="currency-item ${isBase ? 'currency-current' : ''}" data-item="${code}">
                <div class="currency-titles">
                    <div class="currency-title">${code}</div>
                    <div class="currency-full">${full}</div>
                </div>

                <div class="currency-amount">${rate.toFixed(2)}</div>
                <div class="currency-action">
                    ${action}
                </div>
            </div>`
}
