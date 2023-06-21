class Boladecannon{ //clase
    constructor(x,y){
        var options={
            isStatic: true,
        }
        
     this.speed+=0.05;
     this.r=30;
     this.x=x;
     this.y=y;
     this.body=Bodies.circle(x,y, this.r, options); //creamos el cuerpo
     this.image=loadImage("bola.png"); //precargamos la imagen
     this.animation=[this.image]; //par hacer de la bola una animacion en ve de cambiar toda la imagen por animacion
     World.add(world, this.body); //el cuerpo lo agregamos al mundo
    }

    pelota(){ //para ver la bola
        var posicion=this.body.position; //meti la posicion de la pelota a la variable "posicion"
        var index=floor(this.speed%this.animation.length); //esto nos va a dar un numero para decir que tan rapido van a pasar nuestras imagenes
        push(); //siempre que es imagen y que se mueve se pone push y pop
        imageMode(CENTER); //centrar la pelota
        image(this.animation[index], posicion.x, posicion.y, this.r, this.r);  //agregue la imagen y las pociciones, alto y ancho que serian el mismo radio
        pop();
    }

    //para pasar de radianes a grados hay que multiplicar el numero que tengo por
    // pi(3.14) entre 180 (que es un radian).

    lanzar(){   //para que la pelota salga
        var angulonuevo= basecannon.angle-28; 
        angulonuevo=angulonuevo*(3.14/180); //para la conversion
        var velocidad=p5.Vector.fromAngle(angulonuevo); //que a partir del angulo, se empiece a mover
        velocidad.mult(0.5); //va a multiplicar el vector por el numero que yo quiera
        Matter.Body.setStatic(this.body, false); //para que la pelota ya no sea estatica
        Matter.Body.setVelocity(this.body, {
            x: velocidad.x*(180/3.14),
            y: velocidad.y*(180/3.14)
        });     //para darle la velocidad en x y en y
    }

    animate(){
        this.speed+=0.05;
      }

    desaparecer(i){
       Matter.Body.setVelocity(this.body,{x:0, y:0}); //quitamos la velocidad para que no rebote
       this. animation=caealagua;
       this.speed= 0.05;
       this.r=250;
       setTimeout(()=>{
       Matter.World.remove(world, this.body); //le decimos que use el cuerpo que estamos usando en esa clase
       delete bolas[i];
       },1000);
    }

}