var Sprite = function Sprite(world, scene, objSrc, x, y, z, repeatX, repeatY, width, height) {
    this.world = world;
    this.scene = scene;

    var _self = this;

    this.textures = []
    objSrc.forEach(function(src) {
        _self.textures.push(new THREE.ImageUtils.loadTexture(src));
    })

    this.spriteMaterial = [];
    this.textures.forEach(function (texture) {
        _self.spriteMaterial.push(new THREE.SpriteMaterial( { map: texture, color: 0xffffff, fog: true } ));
    });

    var loader = new THREE.ObjectLoader();
    var _self = this;

    this.group = new THREE.Group();

    for(var xI = 0; xI < width; xI += width/repeatX) {
        for(var yI = 0; yI < height; yI += height/repeatY) {
            var sprite = new THREE.Sprite( this.spriteMaterial[Math.floor(this.spriteMaterial.length*Math.random())].clone() );
            sprite.position.set( x+xI*Math.random(), y, z+yI*Math.random() );
            sprite.scale.x = Math.random()+1;
            sprite.scale.y = Math.random()+1;
            sprite.scale.z = Math.random()+1;
            this.group.add( sprite );
        }
    }
    scene.add( this.group );
}

