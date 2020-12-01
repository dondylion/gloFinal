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

    let calcData = {};

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

        for(let i=0;i<4;i++){
            calcData[`selects[${i}]`] = selects[i].options[selects[i].selectedIndex].textContent;
        }
        calcData.septicType = septicType.checked;
        calcData.bottomType = bottomType.checked;
        calcData.total = calcResult.value;
    };

    distance.addEventListener('input', ()=>{
        distance.value = distance.value.replace(/[^0-9]/, '');
        calcData.distance = distance.value;
    });

    calculating();
    accordion.addEventListener('change', (event)=>{
        const target = event.target;
        if(target.tagName === 'INPUT' || target.tagName === 'SELECT') {
            calculating();
        }
    });

    //Всплывающее окно

    const constructBtn = document.querySelectorAll('.construct-btn')[3],
        discountPopup = document.querySelector('.popup-discount'),
        form = discountPopup.querySelector('form');

    constructBtn.addEventListener('click', ()=>{
        if(distance.value) {
            discountPopup.style.display = 'block';
        }
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

    //Отправка формы

    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    form.addEventListener('input', (event)=>{
        let target = event.target;
        if (target.name==="user_phone") {
            target.value = target.value.replace(/[^0-9\+]/, '');
        } else if (target.name === 'user_name') {
            target.value = target.value.replace(/[^А-Яа-яЁё]/, '');
        }
    });

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        form.appendChild(statusMessage);
        setTimeout(()=>{
            form.removeChild(statusMessage);
            discountPopup.style.display = 'none';
        }, 5000);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(form);

        for(let val of formData.entries()) {
            calcData[val[0]] = val[1];
        }

        postData(calcData)
            .then((response)=>{
                if (response.status!==200) {
                    throw new Error('status network not 200');
                }   
                statusMessage.textContent = successMessage;
                const inputs = form.querySelectorAll('input');
                inputs.forEach((item)=>{
                    item.value = '';
                });
            })
            .catch((error)=>{
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
    });
};

export default calcSepticCost;