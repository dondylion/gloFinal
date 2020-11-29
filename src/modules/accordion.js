'use strict';

const accordion = ()=>{

    const panelBody = document.querySelectorAll('.panel-collapse'),
        panelHeading = document.querySelectorAll('.panel-heading'),
        constructBtn = document.querySelectorAll('.construct-btn');

        panelHeading.forEach((elem, i)=>{
            elem.addEventListener('click', ()=>{
                for(let k=0;k<panelBody.length;k++){
                    if(k===i){
                        panelBody[k].classList.add('in');
                    } else {
                        panelBody[k].classList.remove('in');
                    }
                } 
            });
        });

        constructBtn.forEach((elem, i)=>{
            if(i!==3){
                elem.addEventListener('click', ()=>{
                    panelBody[i].classList.remove('in');
                    panelBody[i+1].classList.add('in');
                });
            }
        });
};

export default accordion;