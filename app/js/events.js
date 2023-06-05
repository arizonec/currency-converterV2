import variables from './variables.js';
import { fetchCodes, handleTabClick} from './script.js';
import { handleActionClick, handleSingleSelectChange, addCurrency, handleAddSelectChange } from './single.js';
import { handleChange, handleInput, handleSubmit, switchCurrencies} from './convert.js';

const { amountInput, form, switchButton, tabs, currentCurrency, currentCurrencyList, singleSelect, addButton, addCurrencySelect } = variables;

amountInput.addEventListener('keyup', handleInput);
form.addEventListener('submit', handleSubmit);
switchButton.addEventListener('click', switchCurrencies);
tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
currentCurrency.addEventListener('click', handleActionClick);
currentCurrencyList.addEventListener('click', handleActionClick);
singleSelect.addEventListener('change', handleSingleSelectChange);
addButton.addEventListener('click', addCurrency)
addCurrencySelect.addEventListener('change', handleAddSelectChange)
fetchCodes();

