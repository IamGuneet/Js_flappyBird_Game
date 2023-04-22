const h1 = document.getElementById("head")
const btn = document.getElementById('btn')

let count = 0;

btn.addEventListener('click', function(){
    // 
    count++;
    h1.innerText = count;
})

