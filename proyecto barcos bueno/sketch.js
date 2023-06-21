const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var basecañon;
var verbarcos;
var bolas=[];
var barcos=[];
var enmovimiento=[];
var serompe=[];
var caealagua=[];
var jsonenmovimiento;
var jsonserompe;
var jsoncaealagua;
var barcosmoviendose;
var barcosserompen;
var barcoscaenalagua;

function preload() {
 fondo = loadImage("background.gif");
 imgtorre = loadImage("tower.png");
 jsonenmovimiento=loadJSON("boat.json");
 jsonserompe=loadJSON("brokenBoat.json");
 jsoncaealagua=loadJSON("waterSplash.json");
 barcosmoviendose=loadImage("boats.png");
 barcosserompen=loadImage("brokenBoat.png");
 barcoscaenalagua=loadImage("waterSplash.png");
}


function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var optionscuerpo={
    isStatic: true
  }

  //Cambie ground por body
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, optionscuerpo);
  World.add(world, ground);

  angleMode(DEGREES);  //que esté en grados
  var angle=25; //variable de 25 grados

  var optionstorre={
    isStatic: true
  }

  torre = Bodies.rectangle(160,350, 160, 310, optionstorre);
  World.add(world, torre);

  basecannon = new Cannon(180, 110, 130, 100, angle);

  var cuadrosdelosbotes=jsonenmovimiento.frames; //cree la variable para que pueda hacer la animacion hasta la linesa 78
  for(var i=0; i< cuadrosdelosbotes.length; i++){
    var pos=cuadrosdelosbotes[i].position;
    var img=barcosmoviendose.get(pos.x, pos.y, pos.w, pos.h);
    enmovimiento.push(img);
  }
 console.log(enmovimiento);
 
  var losbotes=jsonserompe.frames;
  for(var i=0; i< losbotes.length; i++){
    var pos=losbotes[i].position;
    var img=barcosserompen.get(pos.x, pos.y, pos.w, pos.h);
    serompe.push(img);
  }

  var cuadrodebote=jsoncaealagua.frames;
  for(var i=0; i< cuadrodebote.length; i++){
    var pos=cuadrodebote[i].position;
    var img=barcoscaenalagua.get(pos.x, pos.y, pos.w, pos.h);
    caealagua.push(img);
  }
}



function draw(){
  image(fondo, 0,0,1200,600);

  Engine.update(engine);
 
  push();
  translate(ground.position.x, ground.position.y);
  rect(0, 0, 1200, 25);
  pop();

  push();
  imageMode(CENTER);
  image(imgtorre, torre.position.x, torre.position.y, 160, 310);
  pop();

  basecannon.ver(); //primero el nombre de la variable que puse arriba y luego de la funcion
  verbarcos(); 

  for(var i=0; i<bolas.length; i++){ //para que recorra toda la matris
    showcanon(bolas[i], i);
    colisionDeBarcos(i);
  }
}



function keyReleased(){ //para que mande a llamar mi funcion de diparar cuando presionon la barra espaciadora
  if(keyCode==LEFT_ARROW){
    bolas[bolas.length-1].lanzar();
  }
}



function keyPressed(){ //esta funcion sirve para que cada vz que presionemos el boton mande a llamar la plantilla de la bola de cañon y se crean muchas bolas
  if(keyCode==LEFT_ARROW){
  boladecanon= new Boladecannon(basecannon.x, basecannon.y); //creo el cuerpo, le pongo que la posicion es igual a la de la base del cañon
  bolas.push(boladecanon); // meti la bola de cañon detro de la matris de las bolas
  }
}



function showcanon(bola, i){ //para que se vean las pelotas que meti a la matris (que se vean muchas pelotas)
 if(bola){
 bola.pelota(); //un elemento de la matris punto la funcion que quiero que realice
 if(bola.body.position.x>= width && bola.body.position.y>= height){
  bola.desaparecer(i);
 }
 }
}


function verbarcos(){
if(barcos.length>0){ //pregunte si mi matriz esta vacia
if(barcos[barcos.length-1]== undefined || barcos[barcos.length-1].body.position.x<900){ //primero checo si el ultimo lugar de la matris esta vacion y despues checamos la posicion de mi varco que tengan diferencia para que no lo veamos uno encima del otro
var posiciones=[-40, -60, -70, -80, -20]; //la matris para hacer que se muevan random
var posicion= random(posiciones); //hice que mi posicion sea random 
var barco= new Barco(1200, 560, 130, 130, posicion, enmovimiento); //le puse al barco que el movimiento sea posicion que cree arriba (el random)
barcos.push(barco);
}

console.log(enmovimiento);

for(var i=0; i< barcos.length; i++){
  if(barcos[i]){ //preguntamos si hay algo en ese lugar de la matris
    Matter.Body.setVelocity(barcos[i].body, {x:-0.9, y:0}); //primero ponemos lo que queremos mover y luego entre llaver la velocidad que queremos que se mueva
    barcos[i].display();
    barcos[i].animate();
  }
}
}
else{
var barco=new Barco(1200, 560, 130, 130, -80, enmovimiento); //cree el barco
barcos.push(barco); //meti el barco a la matriz
}
}

function colisionDeBarcos(index){
for(var i=0; i< barcos.length; i++){  //pase por la matris para checar si estan vacias las matrices
  if(barcos[i] !== undefined && bolas[index]!== undefined){  //cheque si estan vacias las matrices
   var colide= Matter.SAT.collides(barcos[i].body, bolas[index].body);  //para verificar si hay una colicion entre el barco y la bola del cañn (si se estan tocando). luego escribo en los parentesis, cuales son los cuerpos que quiero checar si se estan tocando o no, le pongo .body porque son cuerpos
   if(colide.collided){
   barcos[i].desaparecer(i); //mandamos a llamar a la metodo de desaparecer el barco
   bolas[index].desaparecer(index); // mandamos a llamar la metodo de desaparecer de la bola del cañon
  }
  }
}
}