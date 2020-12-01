'use strict';

const consultation = () => {

    const popupConsultation = document.querySelector('.popup-consultation'),
        directorForm = document.querySelector('.director-form'),
        userQuest = directorForm.querySelector('input'),
        form = popupConsultation.querySelector('form');

    let body = {};

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

    directorForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        popupConsultation.style.display = 'block';
    });

    popupConsultation.addEventListener('click', (event)=>{
        let target = event.target;
        if(target.classList.contains('popup-close')) {
            popupConsultation.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if(!target) {
                popupConsultation.style.display = 'none';
            }
        }
    });

    userQuest.addEventListener('input', ()=>{
        userQuest.value = userQuest.value.replace(/[^А-Яа-яЁё\.,;:!?]/, '');
        body.quest = userQuest.value;
    });

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
            popupConsultation.style.display = 'none';
        }, 5000);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(form);

        for(let val of formData.entries()) {
            body[val[0]] = val[1];
        }

        postData(body)
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

export default consultation;