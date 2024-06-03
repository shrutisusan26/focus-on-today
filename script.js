const checkBoxes = document.querySelectorAll(".checkbox");
const inputFields = document.querySelectorAll(".inp");
const error = document.querySelector(".error");
const progressValue = document.querySelector(".progress-value");
const progressBar = document.querySelector(".progress-bar");
const quote = document.querySelector(".motivation-quote");

const allgoals = JSON.parse(localStorage.getItem('allGoals'))  || {};
let completedGoals = Object.values(allgoals).filter((goal) => goal.completed).length;
if(completedGoals === 1){
    quote.innerText = "Well begun is half done!";
}
else if (completedGoals === 2){
    quote.innerText = "Just a goal away, keep going! "
}
else if (completedGoals === 3){
    quote.innerText = "Whoa! You just completed all the goals, time for chill :D !";
}
progressValue.style.width = `${completedGoals/ inputFields.length * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoals}/${inputFields.length} completed`;

checkBoxes.forEach((checkBox) =>{
    let count = 0;

    checkBox.addEventListener('click',(e)=>{
        const allFieldsFilled =  [...inputFields].every((input) =>{
                return input.value;
        });
        if(allFieldsFilled){
            
            checkBox.parentElement.classList.toggle('completed');
            const inputID = checkBox.nextElementSibling.id;
            allgoals[inputID].completed = !allgoals[inputID].completed ;
            localStorage.setItem('allGoals',JSON.stringify(allgoals))
            completedGoals = Object.values(allgoals).filter((goal) => goal.completed).length;
            if(completedGoals === 1){
                quote.innerText = "Well begun is half done!";
            }
            else if (completedGoals === 2){
                quote.innerText = "Just a goal away, keep going! "
            }
            else if (completedGoals === 3){
                quote.innerText = "Whoa! You just completed all the goals, time for chill :D !";
            }
            progressValue.style.display= 'flex';
            progressValue.style.width= `${completedGoals/ 3 * 100}%`;
            progressValue.firstElementChild.innerText = `${completedGoals}/${ inputFields.length} completed`;
        } 
        else{
            error.style.display='block';
        }
    });
}) 

inputFields.forEach((input) =>{
    if(allgoals[input.id]){
        input.value = allgoals[input.id].value;
        if(allgoals[input.id].completed){
            input.parentElement.classList.add('completed');
        };

    }
    
    input.addEventListener('focus',(e)=>{
        error.style.display="none";
    });

    input.addEventListener('input', (e) =>{
        if(allgoals[input.id] && allgoals[e.target.id].completed){
            input.value = allgoals[e.target.id].value;
            return;
        }
        localStorage.setItem('allGoals',JSON.stringify(allgoals))
        allgoals[e.target.id] = {
            value: e.target.value,
            completed: false
        };
        
    });
})