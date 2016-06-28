var MAP_LANDSCAPE_TEXTURE_RATIO = 4;
var MAP_SEGMENTS_RATIO = 1;
var EPSILON = 30;

var MapLandscape = function (world, scene, x, y, z, width, height, imageUrl, normalUrl) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.width = width;
    this.height = height;

    this.scene = scene;
    this.world = world;

    this.imageUrl = imageUrl;
    this.normalUrl = normalUrl;
};

MapLandscape.prototype.init = function () {
    this.initGraphics();
    this.initPhysics();
}

MapLandscape.prototype.initGraphics = function init() {
    var perlin = window.Perlin();

    var texture, material, plane;

    var segmentsX = Math.floor(this.width/MAP_SEGMENTS_RATIO);
    var segmentsY = Math.floor(this.height/MAP_SEGMENTS_RATIO);
    var textureX = Math.floor(this.width/MAP_LANDSCAPE_TEXTURE_RATIO);
    var textureY = Math.floor(this.height/MAP_LANDSCAPE_TEXTURE_RATIO);

    texture = THREE.ImageUtils.loadTexture(this.imageUrl);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.repeat.set(textureX, textureY);

    var bump = THREE.ImageUtils.loadTexture(this.normalUrl);

    bump.wrapS = THREE.RepeatWrapping;
    bump.wrapT = THREE.RepeatWrapping;

    bump.repeat.set(textureX, textureY);

    material = new THREE.MeshLambertMaterial({
        map: texture,
        normalMap: bump,
        shininess: 35,
    });

    var geometry = new THREE.PlaneGeometry(this.width, this.height, segmentsX, segmentsY);

    plane = new THREE.Mesh(geometry, material);
    plane.material.side = THREE.DoubleSide;


    for (var i = 0, len = plane.geometry.vertices.length; i < len; i++) {
        plane.geometry.vertices[i].z += Math.random()/2;

        //wall
        if((plane.geometry.vertices[i].x > this.width/2+this.x-EPSILON) ||
            (plane.geometry.vertices[i].x < this.x-this.width/2+EPSILON) ||
            (plane.geometry.vertices[i].y > this.height/2+this.y-EPSILON) ||
            (plane.geometry.vertices[i].y < this.y-this.height/2+EPSILON)) {

            var dY = Math.abs(plane.geometry.vertices[i].y-this.y);
            var dX = Math.abs(plane.geometry.vertices[i].x-this.x);
            var r = Math.sqrt(dX*dX + dY*dY);

            plane.geometry.vertices[i].z -= Math.random()*5 + r/100 + perlin.get2d(plane.geometry.vertices[i].x/this.width, plane.geometry.vertices[i].y/this.height)*2;
            plane.geometry.vertices[i].z = (plane.geometry.vertices[i].z < 0)? plane.geometry.vertices[i].z : 0;
        }
    }

    plane.position.x = this.x;
    plane.position.y = this.y;
    plane.position.z = this.z;

    plane.rotation.x = Math.PI / 2;

    this.scene.add(plane);
}

MapLandscape.prototype.initPhysics = function () {
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    world.addBody(groundBody);
}