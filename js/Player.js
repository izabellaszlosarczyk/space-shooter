var Player = function Player(world, scene, renderer, camera) {
    this.world = world;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.raycaster = new THREE.Raycaster();

    this.health = 100;
    this.immortal = false;


    // Create a sphere
    var mass = 5, radius = 1.3;
    this.sphereShape = new CANNON.Sphere(radius);
    this.sphereBody = new CANNON.Body({ mass: mass });
    this.sphereBody.addShape(this.sphereShape);
    this.sphereBody.position.set(0,5,0);
    this.sphereBody.linearDamping = 0.9;
    world.addBody(this.sphereBody);
}

Player.prototype.init = function init() {

}

Player.prototype.removeHealth = function removeHealth() {
    if(!this.immortal) {
        this.health -= 10;
    }
}

Player.prototype.addHealth = function removeHealth() {
    this.health -= 10;
}

Player.prototype.setImmortalFor5Seconds = function setImmortalFor5Seconds() {
    this.immortal = true;
    var _self = this;
    //TODO: shader
    setTimeout(function() {
        _self.immortal = false;
    }, 5000);
}

Player.prototype.update = function update() {

}