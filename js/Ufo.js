var UFO_RADIUS = 100;

var Ufo = function Ufo(world, scene, objSrc, x, y, z, callback) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.world = world;
    this.scene = scene;

    var loader = new THREE.ObjectLoader();
    var _self = this;
    loader.load(objSrc, function ( object ) {
        _self.obj = object;
        scene.add( object );

        if(callback) {
            callback();
        }
    });
}

Ufo.prototype.init = function init() {
    this.obj.position.x = this.x;
    this.obj.position.y = this.y;
    this.obj.position.z = this.z;

    this.spotLight = new THREE.SpotLight( 0xffffff );

    this.spotLight.castShadow = true;

    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;

    this.spotLight.shadow.camera.near = 30;
    this.spotLight.shadow.camera.far = 50;
    this.spotLight.shadow.camera.fov = 5;
    this.spotLight.shadowMapVisible = true;

    this.light = new THREE.PointLight( 0xff0000, 1, 100 );

    scene.add( this.light );

    this.scene.add( this.spotLight );
    this.scene.add( this.spotLight.target )

}

Ufo.prototype.updateLight = function updateLight() {
    this.light.position.set( this.obj.position.x, this.obj.position.y+20, this.obj.position.z);
    this.spotLight.position.set( this.obj.position.x, this.obj.position.y, this.obj.position.z);
    this.spotLight.target.position.set( this.obj.position.x, 0, this.obj.position.z);
}

Ufo.prototype.update = function update(dt) {
    this.tick = (this.tick)? this.tick + dt/3 : 0.01;

    var x = UFO_RADIUS*Math.cos(this.tick);
    var z = UFO_RADIUS*Math.sin(this.tick);

    this.obj.position.x = x;
    this.obj.position.z = z;
    this.updateLight();
}