var Entity = function Entity(world, scene, objSrc, x, y, z, callback) {
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

Entity.prototype.getObject = function getObject() {
    return this.obj;
}
