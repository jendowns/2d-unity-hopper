var car_left : GameObject;
var car_spawn_left : Transform;
var car_spawn_left_rate : float;

var car_right : GameObject;
var car_spawn_right : Transform;
var car_spawn_right_rate : float;

var log_right_1 : GameObject;
var log_spawn_right_1 : Transform;
var log_spawn_right_rate_1 : float;

var log_right_2 : GameObject;
var log_spawn_right_2 : Transform;
var log_spawn_right_rate_2 : float;

var log_left : GameObject;
var log_spawn_left : Transform;
var log_spawn_left_rate : float;

private var next_car_spawn_left : float = 0f;
private var next_car_spawn_right : float = 0f;
private var next_log_spawn_right_1 : float = 0f;
private var next_log_spawn_right_2 : float = 0f;
private var next_log_spawn_left : float = 0f;

function Update () {

	var current_time = Time.time;

    if (current_time > next_car_spawn_left)
    {
        next_car_spawn_left = current_time + car_spawn_left_rate;
        Instantiate(car_left, car_spawn_left.position, car_spawn_left.rotation);
    }
    
    if (current_time > next_car_spawn_right)
    {
        next_car_spawn_right = current_time + car_spawn_right_rate;
        Instantiate(car_right, car_spawn_right.position, car_spawn_right.rotation);
    }
    
    if (current_time > next_log_spawn_right_1)
    {
        next_log_spawn_right_1 = current_time + log_spawn_right_rate_1;
        Instantiate(log_right_1, log_spawn_right_1.position, log_spawn_right_1.rotation);
    }
    
    if (current_time > next_log_spawn_right_2)
    {
        next_log_spawn_right_2 = current_time + log_spawn_right_rate_2;
        Instantiate(log_right_2, log_spawn_right_2.position, log_spawn_right_2.rotation);
    }
    
    if (current_time > next_log_spawn_left)
    {
        next_log_spawn_left = current_time + log_spawn_left_rate;
        Instantiate(log_left, log_spawn_left.position, log_spawn_left.rotation);
    }
}