//Create variables here
var dog,dogImage,happyDog,database,foodS,foodStock;

function preload()
{
  dogImage = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');
}

function setup() {
  database = firebase.database();
	createCanvas(800, 700);
  
  dog = createSprite(400,300,50,50);
  dog.addImage(dogImage);
  dog.scale=0.2

  foodStock = database.ref('Food');
  foodStock.on("value",readStock,showError);

}


function draw() {  

  
  //add styles here
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,270,200);
  textSize(17);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",200,10,300,20);
}

function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}


function showError(){

  console.log("Error in reading the food values.")
}