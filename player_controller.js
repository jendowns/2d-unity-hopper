#pragma strict

class Boundary
{
    var xMin : float; // Default: -3f
    var xMax : float; // Default:  3f
    var yMin : float; // Default: -4.7f
    var yMax : float; // Default:  3.6f
}

var boundary : Boundary;
var speed : float = 1f;
var player : Animator;
var bunny : GameObject;
var carrot_life_1 : GameObject;
var carrot_life_2 : GameObject;
var carrot_life_3 : GameObject;
var lives : int;  // 3 lives at start of level
var can_move : boolean = true;
var on_river : boolean = false;

//var fade_image : GameObject;
//var fade_image_spawn : Transform;
var game_over : GameObject;
var game_over_spawn : Transform;
var victory : GameObject;
var victory_spawn : Transform;
var button : GameObject;
var button_spawn : Transform;

private var log_count : int = 0;


function Start (){
	lives = 3;
}


function OnTriggerEnter2D(other : Collider2D){
 
   	if (other.gameObject.tag == "car"){
   		Death_Sequence();
 	}
 	
 	if (other.gameObject.tag == "river_bounds"){
 		on_river = true;
 		
 		// if the bunny is in the river but not on a log
 		if(log_count == 0){
			Death_Sequence();	
 		}
 	}
 	
 	if (other.gameObject.tag == "log"){
 		bunny.transform.parent = other.gameObject.transform;
 		log_count++;
 		
 	}
 	
 	// if the bunny leaves the river, she doesn't move with a log anymore
 	if (other.gameObject.tag == "river_edge"){
 		on_river = false;
 		bunny.transform.parent = null;
 	}
 	
 	
 	if (other.gameObject.name == "victory_line"){
 		Victory();
 	}
 	
 	
 }
 

function OnTriggerExit2D(other : Collider2D){
	
	if (other.gameObject.tag == "log") {
		log_count--;
		
		// if the bunny is on the river & not on a log, bunny dies
		if (log_count == 0 && on_river == true){
			bunny.transform.parent = null;
	   		Death_Sequence();
		}	
	}
}



function Update (){
  
	// Clear current animation, if any
	player.SetBool("left",false);
	player.SetBool("right",false);
	player.SetBool("up",false);
	player.SetBool("down",false);
	
	if(!can_move)
		return;						
    												
	if((Input.GetAxisRaw("Horizontal") != 0) || (Input.GetAxisRaw("Vertical") != 0)){
		
        var h : float = Input.GetAxisRaw("Horizontal");
        var v : float = Input.GetAxisRaw("Vertical");
        var velocity : Vector2;
        
        if(h>0){
            player.SetBool("right",true);
            velocity = Vector2.right * speed * Time.deltaTime;
        }
        
        else if(h<0){
            player.SetBool("left",true);
            velocity = Vector2.left * speed * Time.deltaTime;
        }
        
        if(v<0){
            player.SetBool("down",true);
            velocity = Vector2.down * speed * Time.deltaTime;
        }
        
        else if(v>0){
            player.SetBool("up",true);
            velocity = Vector2.up * speed * Time.deltaTime;
        }
        
        var input_velocity : Vector2 = new Vector2(velocity.x,velocity.y);
        
        // keeps the bunny from leaving the level boundaries
        transform.position += input_velocity;
        transform.position = new Vector2(
            Mathf.Clamp (transform.position.x, boundary.xMin, boundary.xMax),     
            Mathf.Clamp (transform.position.y, boundary.yMin, boundary.yMax)
        );
    }
}

function Death_Sequence(){
	can_move = false;
	
	GetComponent(SpriteRenderer).color = Color.red;
   	yield WaitForSeconds(.1);
   	GetComponent(SpriteRenderer).color = Color.white;
   	yield WaitForSeconds(.1);
	GetComponent(SpriteRenderer).color = Color.red;
   	yield WaitForSeconds(.1);
   	GetComponent(SpriteRenderer).color = Color.white;
   	yield WaitForSeconds(.1);
   	transform.position = new Vector2 (-0.5,-4.3);
   	
   	can_move = true;
	//Destroy(bunny);
	//Application.LoadLevel(Application.loadedLevel);
	
	Debug.Log("Your lives: "+lives);
	
	if(lives==3){
		//yield WaitForSeconds(.1);
		lives--;
		Destroy(carrot_life_3);
		Debug.Log("Your lives now: "+lives);
		return;
	}	
	
	if(lives==2){
		//yield WaitForSeconds(.1);
		lives--;
		Destroy(carrot_life_2);
		Debug.Log("Your lives now: "+lives);
		return;
	}
	
	if(lives==1){
		//yield WaitForSeconds(.1);
		lives--;
		Destroy(carrot_life_1);
		Debug.Log("Your lives now: "+lives);
		return;
	}
	
	if(lives>=0){
		//yield WaitForSeconds(.1);
		Debug.Log("Your lives now: "+lives);
		Game_Over();
	}
}

function Game_Over(){
	
	yield WaitForSeconds(.1);
	//Instantiate(fade_image, fade_image_spawn.position, fade_image_spawn.rotation);
	Instantiate(game_over, game_over_spawn.position, game_over_spawn.rotation);
	Instantiate(button, button_spawn.position, button_spawn.rotation);
	Destroy(bunny);
}

function Victory(){
	
	yield WaitForSeconds(.1);
	//Instantiate(fade_image, fade_image_spawn.position, fade_image_spawn.rotation);
	Instantiate(victory, victory_spawn.position, victory_spawn.rotation);
	Instantiate(button, button_spawn.position, button_spawn.rotation);
	Destroy(bunny);
}

