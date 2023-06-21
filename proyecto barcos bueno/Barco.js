class Barco{
    constructor(x, y, width, height, posbar, boatAnimation) {
    this.animation=boatAnimation;

     var options={
        restitucion: 0.8, //que se muevan los barquitos
        friction: 1, // habilidad de u objeto para desplazarse a travez de aie
        density: 1 //densidad, que simule que esta en el agua
        }
        
      this.speed= 0.05;
      this.body = Bodies.rectangle(x, y, width, height,options);
      this.width = width;
      this.height = height;
      this.boatPosition = posbar;

      this.barcos = loadImage("boat.png");//precargamos la imagen
      
      World.add(world, this.body); //Se añade el cuarpo al mundo 
    }

    animate(){
      this.speed+=0.05;
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;//nueva variable
      var i=floor(this.speed % this.animation.length); //redondear hacia abajo la velocidad

      push();
      translate(pos.x, pos.y);//para que tenga la animacion y se mueva
      imageMode(CENTER);
      image(this.animation[i], 0, this.boatPosition, this.width, this.height);//al ser una imagen lo primero en meter tiene que ser la imagen (this.barcos)
      pop();
    }

    // metodo para que desaparezca el barco cuando lo toque la boda del cañon
     desaparecer(index){    //recibe el barco que va a desaparecer
      this. animation=serompe;
     this.speed= 0.05;
     this.width=215;
     this.height=215;
      setTimeout(()=>{     // bucle de tiempo - para que espere un tiempo antes de seguir las siguientes instrucciones
      Matter.World.remove(world, barcos[index].body);     //para remover el cuerpo del mundo,(primero de donde lo quiero remover, que quiero remover), pero todavia existe el espacio en la matris para eliminarlo
      delete barcos[index];    //para eliminar el espacio de la matris
    },2000);         //se mide por milisegundos, para 2 minutos ponemos 2 mil.
    }
}