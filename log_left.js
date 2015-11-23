var speed : float;

function Update () : void {
    //GetComponent(Rigidbody2D).velocity = (-transform.right) * speed;
    var velocity : Vector2 = Vector2.left * speed * Time.deltaTime;
    transform.position += velocity;
}