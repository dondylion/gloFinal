'use strict';

const popupDiscount = () => {

    const discountBtn = document.querySelectorAll('.discount-btn'),
        discountPopup = document.querySelector('.popup-discount');

    discountBtn.forEach((elem)=>{
        elem.addEventListener('click', ()=>{
            discountPopup.style.display = 'block';
        });
    });

    discountPopup.addEventListener('click', (event)=>{
        
        let target = event.target;
        if(target.classList.contains('popup-close')) {
            discountPopup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if(!target) {
                discountPopup.style.display = 'none';
            }
        }
    });

};

export default popupDiscount;