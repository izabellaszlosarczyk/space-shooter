var ENEMY_SPEED = 10;

var EnemyEntity = function Entity(world, scene, objSrc, x, y, z, callback) {
    this.world = world;
    this.scene = scene;

    var loader = new THREE.ObjectLoader();
    var _self = this;
    loader.load(objSrc, function ( object ) {
        _self.obj = object;
        console.log(object);
        scene.add( object );

        _self.getObject().position.x = x;
        _self.getObject().position.y = y;
        _self.getObject().position.z = z;

        if(callback) {
            callback();
        }
    });
    this.counter = 0;
    this.directon = new CANNON.Vec3(Math.random(),1,Math.random());

    var halfExtents = new CANNON.Vec3(1,1,1);
    var boxShape = new CANNON.Box(halfExtents);
    this.boxBody = new CANNON.Body({ mass: 5 });
    this.boxBody.addShape(boxShape);
    this.boxBody.position.x = x;
    this.boxBody.position.y = y;
    this.boxBody.position.z = z;

    //debug on
    //var boxGeometry = new THREE.BoxGeometry(halfExtents.x*2,halfExtents.y*2,halfExtents.z*2);
    //this.boxMesh = new THREE.Mesh( boxGeometry );
    //this.boxMesh.position.set(x,y,z);
    //this.boxMesh.castShadow = true;
    //this.boxMesh.receiveShadow = true;
    //scene.add(this.boxMesh);
    //debug off

    //disable rotation
    this.boxBody.angularDamping=1;
    world.addBody(this.boxBody);
}

EnemyEntity.prototype.getObject = function getObject() {
    return this.obj;
}

EnemyEntity.prototype.update = function update() {
    //update physics

    if(this.getObject()) {
        this.getObject().position.copy(this.boxBody.position);
        this.getObject().position.y -= 1; //mesh is a bit too high
        this.getObject().quaternion.copy(this.boxBody.quaternion);

        //debug on
        //this.boxMesh.position.copy(this.boxBody.position);
        //this.boxMesh.quaternion.copy(this.boxBody.quaternion);
        //debug off
    }

    this.counter ++;

    if(this.counter % 50) {
        //update velocity
        this.boxBody.velocity.x = this.directon.x;
        this.boxBody.velocity.z = this.directon.z;

        //rotate towards velocity
        var aimAhead = new THREE.Vector3();
        aimAhead.copy(this.getObject().position).add(this.directon);
        this.getObject().lookAt(aimAhead);
    }

    if(this.counter > 300) {
        this.counter = 0;

        this.boxBody.velocity.x = 0;
        this.boxBody.velocity.y = 0;
        this.boxBody.velocity.z = 0;

        //change direction
        var xSign = (Math.random() > 0.5)? 1 : -1;
        var zSign = (Math.random() > 0.5)? 1 : -1;
        this.directon = new CANNON.Vec3(xSign*Math.random()*ENEMY_SPEED, 0, zSign*Math.random()*ENEMY_SPEED);
    }
}
