'use strict';

const callPopup = () => {

    const contacts = document.querySelectorAll('.contacts'),
        popupCall = document.querySelector('.popup-call');
    
    contacts.forEach((elem)=>{
        elem.addEventListener('click', (event)=>{
            event.preventDefault();
            const target = event.target;
            if (target.classList.contains('call-btn')) {
                popupCall.style.display = 'block';
            }
        });
    });

    popupCall.addEventListener('click', (event)=>{
    
        let target = event.target;
        if(target.classList.contains('popup-close')) {
            popupCall.style.display = 'none';
        } else {
            target = target.closest('.popup-content');

            if(!target) {
                popupCall.style.display = 'none';
            }
        }
    });

};

export default callPopup;