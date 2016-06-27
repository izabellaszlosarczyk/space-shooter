var Player = function Player(world, scene, renderer, camera) {
    this.world = world;
    this.scene = scene;
    this.camera = camera;


    this.health = 100;
    this.immortal = false;
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