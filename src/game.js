function kaligato(){
	defecto.src='../assets/gatos/KaliGato.png';
    personaje='../assets/gatos/KaliSprites.png';
	var kalimiau = new Audio();
    kalimiau.src = "../audio/kali1.mp3";
    kalimiau.play();
}
function timgato(){
	defecto.src='../assets/gatos/TimGato.png';
    personaje='../assets/gatos/TimSprites.png';
	var timmiau = new Audio();
    timmiau.src = "../audio/tim1.mp3";
    timmiau.play();
}
function teogato(){
	defecto.src='../assets/gatos/TeoGato.png';
    personaje='../assets/gatos/TeoSprites.png';
	var teomiau = new Audio();
    teomiau.src = "../audio/teo1.mp3";
    teomiau.play();
}
function cocosgato(){
	defecto.src='../assets/gatos/CocosGato.png';
    personaje='../assets/gatos/CocosSprites.png';
	var cocosmiau = new Audio();
    cocosmiau.src = "../audio/cocos1.mp3";
    cocosmiau.play();
}
personaje='../assets/gatos/KaliSprites.png';

function aceptar(){
	document.getElementById('seleccionid').style.display='none';

//    var musica = new Audio();
//    musica.src = "../audio/principal.mp3";
//    musica.play();

    var config = {
        type: Phaser.AUTO,
        width: 400,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {gravity: {y:300},
                    debug: false}
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        }
    }
    var game = new Phaser.Game(config);

    function aleatorio(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function recoleccion(gato, manzana){
        manzana.disableBody(true, true);
    }
    function preload(){
        this.load.image('fondo', '../assets/fondos/fondogameplay.png');
        this.load.image('manzana', '../assets/objetos/manzana.png');
        this.load.image('pasto', '../assets/objetos/pasto.png');
        this.load.image('piso', '../assets/fondos/piso.png');
        this.load.spritesheet('gatoskin', personaje, {frameWidth: 120, frameHeight: 100});
    }
    function create(){
        this.add.image(200, 300, 'fondo');

        gato = this.physics.add.sprite(200, 480, 'gatoskin');
        gato.body.setGravityY(500);

        setInterval(creamanzana, 750);
        manzanas = this.physics.add.group();
        this.physics.add.overlap (gato, manzanas, recoleccion, null, true);
        function creamanzana(){
        manzanas.create(aleatorio(30, 370), 15, 'manzana').refreshBody}

        this.add.image(200, 515, 'pasto');
        plataforma = this.physics.add.staticGroup();
        plataforma.create(200, 564, 'piso').refreshBody();

        this.anims.create({
            key: 'saltar',
            frames: [{key: 'gatoskin', frame: 1}],
            frameRate: 20
        });
        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers('gatoskin', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'sentar',
            frames: [{key: 'gatoskin', frame: 4}],
            frameRate: 20
        });

        gato.setCollideWorldBounds(true);
        this.physics.add.collider(gato, plataforma);
        cursors = this.input.keyboard.createCursorKeys();
    }
    function update(){
        if(cursors.left.isDown){
            gato.flipX = false;
            gato.setVelocityX(-300);
            if(gato.body.touching.down){
                gato.anims.play('caminar', true);
                if(cursors.up.isDown){
                    gato.setVelocityY(-300);
                    gato.anims.play('saltar');
        }}}
        else if(cursors.right.isDown){
            gato.flipX = true;
            gato.setVelocityX(300);
            if(gato.body.touching.down){
                gato.anims.play('caminar', true);
                if(cursors.up.isDown){
                    gato.setVelocityY(-300);
                    gato.anims.play('saltar');
        }}}
        else if(cursors.up.isDown){
            if(gato.body.touching.down){
                gato.setVelocityY(-300);
                gato.setVelocityX(0);
                gato.anims.play('saltar');
        }}
        else{
            if(gato.body.touching.down){
                gato.anims.play('sentar');
                gato.setVelocityX(0);
        }}
    }
}







