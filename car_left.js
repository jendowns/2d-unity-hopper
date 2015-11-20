var speed : float;
var pushPower = 2.0;

function Start () : void {
    GetComponent(Rigidbody2D).velocity = (-transform.right) * speed;
    
}
