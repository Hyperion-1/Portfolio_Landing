const canvas = document.getElementById("landingCanvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particalsArray; 

//get moustr position
let mouse = {
    x: null,
    y: null, 
    radius: (canvas.height/80 ) * (canvas.width/80)

}

//mouse event
window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

//create particle
class particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }//end constructor

    //method to draw individual particle
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#8C5523';
        ctx.fill();
    }

    //check particle/mouse position, move/draw particle
    update(){
        //check if particle is still in the canvas
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0 ){
            this.directionY = -this.directionY;
        }

        //check collision - mouse/particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.width - this.size * 10){
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }

        //move particle
        this.x += this.directionX;
        this.y += this.directionY;
        //draw particle
        this.draw();
    }//end update
}//end class particle

//create particle array
function init(){
    particalsArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directiony = (Math.random() * 5) - 2.5;
        let color = '#8C5523';

        particalsArray.push(new particle(x, y, directionX, directiony, size, color));
    }
}//end init


//check if particles are close enough to draw a line between them 
function connect() {
    for(let a = 0; a < particalsArray.length; a++){
        for(let b = a; b < particalsArray.length; b++){
            let distance =
             ((particalsArray[a].x - particalsArray[b].x ) * (particalsArray[a].x - particalsArray[b].x ))
                + 
             ((particalsArray[a].y - particalsArray[b].y ) * (particalsArray[a].y - particalsArray[b].y ));

            if (distance < (canvas.width/7) * (canvas.height/7)){
                ctx.strokeStyle = 'rgba(140, 85, 31, 1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particalsArray[a].x, particalsArray[b].y);
                ctx.lineTo(particalsArray[a].x, particalsArray[b].y);
                ctx.stroke();
            }
        }
    }
}//end connect


//animation loop
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particalsArray.length; i++){
        particalsArray[i].update();
    }
    connect();
}//end animate



init();
animate();























