const checkBoxes = document.querySelectorAll(".checkbox");
const inputFields = document.querySelectorAll(".inp");
const error = document.querySelector(".error");
const progressValue = document.querySelector(".progress-value");
const progressBar = document.querySelector(".progress-bar");

checkBoxes.forEach((checkBox) =>{
    let count = 0;

    checkBox.addEventListener('click',(e)=>{
        const allFieldsFilled =  [...inputFields].every((input) =>{
                return input.value;
        });
        if(allFieldsFilled){
            
            checkBox.parentElement.classList.toggle('completed');
            progressValue.style.display= 'flex';
            progressValue.style.width= (count / 3) * 100;
            console.log(progressValue.style.width)
        } 
        else{
            error.style.display='block';
        }
    });
}) 

inputFields.forEach((input) =>{
    input.addEventListener('focus',(e)=>{
        error.style.display="none";
    });
})