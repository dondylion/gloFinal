'use strict';

const accordion = ()=>{

    const panelGroup = document.querySelectorAll('.panel-group'),
        panelBody = document.querySelectorAll('.panel-collapse'),
        panelHeading = document.querySelectorAll('.panel-heading');

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
};

export default accordion;