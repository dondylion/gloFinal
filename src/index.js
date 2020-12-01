'use strict';

import 'nodelist-foreach-polyfill';

import callPopup from './modules/callPopup';
import sendForm from './modules/sendForm';
import popupDiscount from './modules/popupDiscount';
import accordion from './modules/accordion';
import checkPopup from './modules/checkPopup';
import calcSepticCost from './modules/calcSepticCost';

callPopup();
sendForm();
popupDiscount();
accordion();
checkPopup();
calcSepticCost();