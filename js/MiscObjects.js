var SkyBox = function SkyBox(scene, skyboxAssets) {
    this.scene = scene;
    this.skyboxAssets = skyboxAssets;
}

SkyBox.prototype.init = function init() {
    var skyGeometry = new THREE.CubeGeometry( 800, 800, 800 );


    console.log(this.skyboxAssets);
    var materialArray = [];
    for (var i = 0; i < this.skyboxAssets.length; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( this.skyboxAssets[i] ),
            side: THREE.BackSide
        }));
    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    skyBox.position.y -= 100;
    scene.add( skyBox );

}