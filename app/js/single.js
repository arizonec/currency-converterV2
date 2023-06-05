import { renderCurrentItem } from "./markups.js";
import state from "./state.js"
import variables from "./variables.js";

const { success, currentCurrency, currentCurrencyList } = variables;

const insertCurrency = (data) => {
    currentCurrencyList.insertAdjacentHTML('afterbegin', renderCurrentItem(data));
}

const insertCurrencies = () => {
    const { currency, currencies } = state;
    const { conversion_rates: rates, base_code: baseCode} = currency;

    currentCurrency.innerHTML = renderCurrentItem(currency);

    currentCurrencyList.innerHTML = '';
    Object.entries(rates).forEach(([code, rate]) => {
        if(code === baseCode || !currencies.includes(code)) return;
        insertCurrency({...currency, code, rate});
    })
}

export const fetchLatest = async() => {
    const {url, currency: {code}} = state;

    if(!code) return;

    try{
        const responce = await fetch(`${url}/latest/${code}`);
        const data = await responce.json();
        

        if(data.result === success) {
            state.currency = {...state.currency, ...data};
            insertCurrencies();
        }
    } catch(err) {
        console.log(err);
    }
}

const removeCurrency = (target) => {
    const parent = target.parentElement.parentElement;
    const { item } = parent.dataset;

    if(!item) return;

    const element = document.querySelector(`[data-item='${item}']`)
    element.remove();
}

const changeCurrency = (target) => {
    currentCurrency.parentElement.classList.add('active');
    //заменить основную валюту, и сделать, что бы список с валютами работал относительно главной валюты!!!
}

export const handleActionClick = ({ target }) => {
    const {action} = target.dataset;

    

    if(!action) return;

    const { actions: {remove}} = state; 

    action === remove ? removeCurrency(target): changeCurrency();

}

export const handleSingleSelectChange = ({ target }) => {
    target.parentElement.classList.remove('active');
    state.currency = { ...state.currency, code: target.value};
    fetchLatest();
    target.value = '';
}

export const addCurrency = ({ currentTarget }) => {
    currentTarget.parentElement.classList.add('active');
}

export const handleAddSelectChange = ({target}) => {
    const { currency: {conversion_rates: rates, base_code: baseCode}} = state;
    const currency = Object.entries(rates).find(([key]) => key === target.value && key !== baseCode);

    if(currency) {
        const [code, amount] = currency;
        insertCurrency({...state.currency, code, rate: amount});
    }

    target.parentElement.classList.remove('active');
    target.value = '';
}