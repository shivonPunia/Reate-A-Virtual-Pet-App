//Create variables here
var dog, happyDog,dog_anime,happydog_anime;
var  database;
var foodS, foodStock;
var  milk,milk_anime;
var feed,addFood;
var lastFed,time;

function preload(){
  //load images here
  dog_anime = loadImage("images/dogImg.png");
  happydog_anime = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(800,700);
   
  dog = createSprite(250,300,30,40);
  dog.addImage(dog_anime);
  dog.scale = 0.2;
  
  /*milk = createSprite(200,200,1,1);
  milk.addImage(milk_anime);
  milk.scale = 0.1;
  milk.visible = false;
  */

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  lastFed = database.ref('lastFed');
  lastFed.on("value",(data)=>{
    time = data.val();
  })


  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  food = new Food();
}


function draw() {  
background(46,139,87)


food.display();

  drawSprites();
  //add styles here
  fill("red");
  textSize(20);
text("Food Left :"+ foodS,200,100);
text("lastFed :" + time + "   hours",80,20);

}

function readStock(data){
  foodS = data.val();
}

function feedDog(){
  dog.addImage(happydog_anime);

database.ref("/").update({
  Food:foodS-1,
  lastFed:hour()
})
}
function addFoods(){
  database.ref("/").update({
    Food:foodS+1,
  })
}


