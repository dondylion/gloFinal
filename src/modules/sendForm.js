'use strict';

const sendForm = () => {

    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const forms = document.querySelectorAll('form');

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

    for (let i=0; i<forms.length; i++) {
        const form = forms[i];

        if(form.classList.contains('director-form') || form.classList.contains('popup-consultation')) {
            continue;
        }

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
                const popupCall = document.querySelector('.popup-call');
                popupCall.style.display = 'none';
            }, 5000);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            let body = {};

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
    }
};

export default sendForm;