'use strict';

import 'nodelist-foreach-polyfill';

import callPopup from './modules/callPopup';
import sendForm from './modules/sendForm';
import popupDiscount from './modules/popupDiscount';
import accordion from './modules/accordion';

callPopup();
sendForm();
popupDiscount();
accordion();