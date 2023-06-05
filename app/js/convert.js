import state from './state.js';
import variables from './variables.js';
import {formatToCurrency, getFullTitle, convertTime} from './utils.js'
import {renderResult} from './markups.js'

const {success, formInfo, rateConv, timeLoad, toSelect, fromSelect} = variables;

export const handleChange = ({target: {value, name}}) => {
    state.pair  = {
        ...state.pair,
        [name]: value,
    };
};

export const handleInput = ({target: {value, name}}) => {
    state[name] = Number(value);
};

const insertResults = ({
    base_code: baseCode, 
    target_code: target, 
    conversion_rate: conversionRate, 
    conversion_result: results, 
    time_last_update_utc: time
}) => {
    const from = {
        code: baseCode,
        amount: state.amount,
        fullName: getFullTitle(state.codes, baseCode),
    }

    const to = {
        code: target,
        amount: results,
        fullName: getFullTitle(state.codes, target),
    }

    
    
    resultFrom.innerHTML = renderResult(from);
    resultTo.innerHTML = renderResult(to);
    
    const baseValue = formatToCurrency(baseCode, 1);
    const targetValue = formatToCurrency(target, conversionRate);

        
    rateConv.innerHTML =  `${baseValue} = ${targetValue}`;

    timeLoad.innerHTML = `Last updated ${convertTime(time)}`;
    // timeLoad.innerHTML = renderResult(to);

    formInfo.classList.add('show');
    
};

export const handleSubmit = async (event) => {
    event?.preventDefault();

    const {url, amount, pair: {from, to}} = state;

    state.loading = true;

    if(!amount || !from || !to) return;

    try {
        const responce = await fetch(`${url}/pair/${from}/${to}/${amount}`);
        const data = await responce.json();

        if(data.result === success) {
            insertResults(data);
        }

        state.loading = false;
    } catch(err) {
        console.log(err);
    }
}

export const switchCurrencies = () => {
    const {pair: {from, to}} = state;

    if (!to || !from) return;

    state.pair = {
        to: from,
        from: to,
    }

    toSelect.value = from;
    fromSelect.value = to;
}