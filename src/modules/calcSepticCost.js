'use strict';

const calcSepticCost = () => {

    const calcResult = document.getElementById('calc-result'),
        onOffSwitch = document.querySelectorAll('.onoffswitch-checkbox'),
        blockTwo = document.getElementById('collapseTwo'),
        distance = document.querySelector('.distance'),
        accordion = document.getElementById('accordion');

    const septicType = onOffSwitch[0],
        bottomType = onOffSwitch[1],
        titles = blockTwo.querySelectorAll('.title-text'),
        selectBox = blockTwo.querySelectorAll('.select-box'),
        button = blockTwo.querySelector('.button'),
        parent = titles[0].parentElement;

    let selects = [];
    for (let i=0;i<4;i++) {
        selects[i] = selectBox[i].querySelector('select');
    }

    const calculating = () => {
        let total = 10000;

        if (septicType.checked) {
            total = 10000;

            if(parent.childNodes.length === 15) {
                parent.removeChild(titles[1]);            
                parent.removeChild(selectBox[2]);
                parent.removeChild(selectBox[3]);
            }

            if (selects[0].selectedIndex === 1) {
                total += total*0.2;
            }

            if (selects[1].selectedIndex === 1) {
                total += total*0.3;
            } else if (selects[1].selectedIndex === 2) {
                total += total*0.5;
            }

            if (bottomType.checked) {
                total += total*0.1;
            }
        } else {
            total = 15000;

            if(parent.childNodes.length !== 15) {
                parent.insertBefore(titles[1], button);            
                parent.insertBefore(selectBox[2], button);
                parent.insertBefore(selectBox[3], button);
            }

            if (selects[0].selectedIndex === 1) {
                total += total*0.2;
            }

            if (selects[2].selectedIndex === 1) {
                total += total*0.2;
            }

            if (selects[1].selectedIndex === 1) {
                total += total*0.3;
            } else if (selects[1].selectedIndex === 2) {
                total += total*0.5;
            }

            if (selects[3].selectedIndex === 1) {
                total += 5000*0.2;
            } else if (selects[3].selectedIndex === 2) {
                total += 5000*0.4;
            }

            if (bottomType.checked) {
                total += total*0.2;
            }
        }

        calcResult.value = Math.ceil(total);
    };

    calculating();
    accordion.addEventListener('change', (event)=>{
        const target = event.target;
        if(target.tagName === 'INPUT' || target.tagName === 'SELECT') {
            calculating();
        }
    });

    //Отправка данных
    const constructBtn = document.querySelectorAll('.construct-btn')[3],
        discountPopup = document.querySelector('.popup-discount');

    constructBtn.addEventListener('click', ()=>{
        discountPopup.style.display = 'block';
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

export default calcSepticCost;