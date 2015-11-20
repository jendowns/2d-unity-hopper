var speed : float;

function Start () : void {
    GetComponent(Rigidbody2D).velocity = (transform.right) * speed;
}