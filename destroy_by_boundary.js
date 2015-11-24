#pragma strict

function OnTriggerExit2D(other : Collider2D)
{
	Destroy(other.gameObject);
}