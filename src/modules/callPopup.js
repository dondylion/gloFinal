'use strict';

const callPopup = () => {

    const contacts = document.querySelectorAll('.contacts'),
        popupCall = document.querySelector('.popup-call'),
        popup = document.querySelector('.popup');
    
    contacts.forEach((elem)=>{
        elem.addEventListener('click', (event)=>{
            const target = event.target;
            if (target.classList.contains('call-btn')) {
                popupCall.style.display = 'block';
            }
        });
    });

    popup.addEventListener('click', (event)=>{
        let target = event.target;
        if(target.classList.contains('popup-close')) {
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');

            if(!target) {
                popup.style.display = 'none';
            }
        }
    });

};

export default callPopup;