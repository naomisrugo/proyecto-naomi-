class Cannon{ //clase
    constructor(x,y,width, height, angle){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.angle=angle;
    this.ImagenDeCanon=loadImage("cannonBase.png"); //precargamos las imagenes
    this.canonensi=loadImage("canon.png"); //precargamos las imagenes
    }

    ver(){  //se llama metodo
     
       //para que con la flecha de bajo, el cañon baje
       if(keyIsDown(DOWN_ARROW)&&this.angle<70){
       this.angle+=1;
       }
        //para que con la flecha de arriba,el cañon suba
       if(keyIsDown(UP_ARROW)&&this.angle>-30){
       this.angle-=1;
       }

        push();   //el cañon que se mueve
        translate(this.x, this.y);    // para que se translade de derecha a izquierda
        rotate(this.angle);   // para que se pueda rotar alrededor del cañon- en su eje
        imageMode(CENTER);   // ubicacion de la imagen
        image(this.canonensi, 0, 0, this.width, this.height);
        pop();
        image(this.ImagenDeCanon, 70,20,200,200);
        noFill();
    }
}

