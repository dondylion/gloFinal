'use strict';

const addSentence = () => {

    const addBtn = document.querySelector('.add-sentence-btn'),
        visibleSmBlock = document.querySelector('.visible-sm-block'),
        hidden = document.querySelectorAll('.hidden');

    addBtn.addEventListener('click', ()=>{
        visibleSmBlock.classList.remove('visible-sm-block');
        hidden.forEach((elem)=>{
            elem.classList.remove('hidden');
        });
        addBtn.style.display = 'none';
    });

};

export default addSentence;