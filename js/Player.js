var Player = function Player(world, scene, renderer, camera, gui) {
    this.world = world;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.gui = gui;

    this.raycaster = new THREE.Raycaster();

    this.health = 100;
    this.immortal = false;
}

Player.prototype.updateGui = function updateGui() {
    this.gui.innerHTML = "Health: "  + this.health;
}

Player.prototype.init = function init() {
    var _self = this;
    this.interval = setInterval(function() {
        _self.removeHealth();
    }, 15000);
}

Player.prototype.removeHealth = function removeHealth() {
    if(!this.immortal) {
        this.health -= 10;
    }
    this.updateGui();
}

Player.prototype.addHealth = function addHealth() {
    this.health += 10;
    this.updateGui();
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