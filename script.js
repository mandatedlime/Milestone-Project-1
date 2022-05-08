//making character appear 

// let mainCharacter = document.createElement('img')
// mainCharacter.src = "male/Walk (1).png"
// mainCharacter.style.position = "relative"
// mainCharacter.style.left = "450px"
// mainCharacter.style.bottom = "200px"
// document.body.append(mainCharacter)

var canvas = document.querySelector("canvas")
var c = canvas.getContext('2d');

let moveBy = 10;
window.addEventListener('load', () => {
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 0;
});
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            canvas.style.left = parseInt(canvas.style.left) - moveBy + 'px';
            break;
        case 'ArrowRight':
            canvas.style.left = parseInt(canvas.style.left) + moveBy + 'px';
            break;
        case 'ArrowUp':
            canvas.style.top = parseInt(canvas.style.top) - moveBy + 'px';
            break;
        case 'ArrowDown':
            canvas.style.top = parseInt(canvas.style.top) + moveBy + 'px';
            break;
    }
});

mainCharacter.width = window,innerWidth;
mainCharacter.height = window.innerHeight;

// empty array for images 

var images = [];
images.length = 10;

// push image to the array 

for(var i = 1 ; i < images.length ; i++){
    images[i]= new Image();
    images[i].src = 'Walk (' + i.toString() + ').png';
}
var i = 1;
setInterval(function(){
    i++;
    if(i >= 10){
        i = 1;
    }
    c.drawImage(images[i],50,50,50,50)
},100)