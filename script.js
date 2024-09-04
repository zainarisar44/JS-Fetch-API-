// SELECTOR
const buttonSelector = document.querySelector('#button');
const inputSelector = document.querySelector('#input');
const answerSelector = document.querySelector('#answer');
const errorSelector = document.querySelector('#error');

// API
const API_ENDPOINT='https://yesno.wtf/api';

// Flag
let IsRequestInProgress=false;

const setIsRequestInProgress=(value)=>{
    IsRequestInProgress=value
}
const setDisabledButtonState=(isDisabling)=>{
    if(isDisabling){
        buttonSelector.setAttribute('disabled','disabled');
    }else{
        buttonSelector.removeAttribute('disabled');
    }
}

const cleanupResponse=()=>{
    setTimeout(()=>{
        answerSelector.innerHTML='';
        inputSelector.innerHTML='';
        setIsRequestInProgress(false)
        setDisabledButtonState(false)
    },3000)
}

const showAnswer=(answer)=>{
    setTimeout(()=>{
        answerSelector.innerHTML=`<img src=\"${answer}\" width=\"600px\" height=\"400px\" />`;
        cleanupResponse();
    },3000)
}

const fetchAnswer=()=>{
    setIsRequestInProgress(true);
    setDisabledButtonState(true);
    fetch(API_ENDPOINT)
    .then(data=>data.json())
    .then(data=>showAnswer(data.image))
}

const showError=()=>{
    errorSelector.innerHTML='Write Something First...';
    setTimeout(()=>{
        errorSelector.innerHTML='';
    },3000)
}

const getAnswer=()=>{

    setTimeout(()=>{
        
        if(IsRequestInProgress)return;
        if(!inputSelector.value)return showError();
    },3000)


    fetchAnswer();
}

const handleKeyEnter=(e)=>{
    if(e.keycode===13){
        getAnswer();
    }
}

buttonSelector.addEventListener('click',getAnswer);