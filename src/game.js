function kaliclick(){
	defect.src='../assets/characters/KaliHead.png';
    character='../assets/characters/KaliSprites.png';
	var kalimeow = new Audio();
    kalimeow.src = "../audio/kali1.mp3";
    kalimeow.play();
}
function timclick(){
	defect.src='../assets/characters/TimHead.png';
    character='../assets/characters/TimSprites.png';
	var timmeow = new Audio();
    timmeow.src = "../audio/tim1.mp3";
    timmeow.play();
}
function teoclick(){
	defect.src='../assets/characters/TeoHead.png';
    character='../assets/characters/TeoSprites.png';
	var teomeow = new Audio();
    teomeow.src = "../audio/teo1.wav";
    teomeow.play();
}
function cocosclick(){
	defect.src='../assets/characters/CocosHead.png';
    character='../assets/characters/CocosSprites.png';
	var cocosmeow = new Audio();
    cocosmeow.src = "../audio/cocos1.mp3";
    cocosmeow.play();
}
character='../assets/characters/KaliSprites.png';

function accept(){
	document.getElementById('selectionId').style.display='none';

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
    
    var interval;
    var scoreText;
    var score = 0;
    var healt = 1;
    var time = 700;

    var music = new Audio();
    music.src = "../audio/main.mp3";
    music.play();

    function preload(){

        this.load.image('apple', '../assets/objects/apple.png');
        this.load.image('grass', '../assets/objects/grass.png');
        this.load.image('flowers', '../assets/objects/backflowers.png')
        
        this.load.image('floor', '../assets/backgrounds/floor.png');
        this.load.image('background', '../assets/backgrounds/background2.png');

        this.load.spritesheet('catskin', character, {frameWidth: 120, frameHeight: 100});
        this.load.spritesheet('healt', '../assets/objects/healt.png', {frameWidth: 112, frameHeight: 35});
    }
    function create(){
        this.add.image(200, 300, 'background');

        cat = this.physics.add.sprite(200, 480, 'catskin');
        cat.body.setGravityY(500);

        apples = this.physics.add.group();
        function doapple(){
            apples.create(random(30, 370), 15, 'apple').refreshBody();
        }
        interval = setInterval(doapple, time);

        this.add.image(200, 515, 'grass');
        floor = this.physics.add.staticGroup();
        floor.create(200, 564, 'floor').refreshBody();

        healtt = this.add.sprite(324, 559, 'healt'); 

        this.anims.create({
            key: 'jump',
            frames: [{key: 'catskin', frame: 1}],
            frameRate: 20
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('catskin', { start: 0, end: 3}),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'idle',
            frames: [{key: 'catskin', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'healt0',
            frames: this.anims.generateFrameNumbers('healt', { start: 0, end: 1}),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'healt1',
            frames: this.anims.generateFrameNumbers('healt', { start: 2, end: 3}),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'healt2',
            frames: this.anims.generateFrameNumbers('healt', { start: 4, end: 5}),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'healt3',
            frames: this.anims.generateFrameNumbers('healt', { start: 6, end: 7}),
            frameRate: 3,
            repeat: -1,
        });

        cat.setCollideWorldBounds(true);
        this.physics.add.collider(cat, floor);
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap (cat, apples, recolection, null, true);
        this.physics.add.overlap (floor, apples, applefall, null, true);

        scoreText = this.add.text(20, 544, 'Puntos: 0', { fontFamily: 'Pixelify Sans', fontSize: '29px'});
    }
    function update(){
        if(cursors.left.isDown){
            cat.flipX = false;
            cat.setVelocityX(-300);
            if(cat.body.touching.down){
                cat.anims.play('walk', true);
                if(cursors.up.isDown){
                    cat.setVelocityY(-300);
                    cat.anims.play('jump');
        }}}
        else if(cursors.right.isDown){
            cat.flipX = true;
            cat.setVelocityX(300);
            if(cat.body.touching.down){
                cat.anims.play('walk', true);
                if(cursors.up.isDown){
                    cat.setVelocityY(-300);
                    cat.anims.play('jump');
        }}}
        else if(cursors.up.isDown){
            if(cat.body.touching.down){
                cat.setVelocityY(-300);
                cat.setVelocityX(0);
                cat.anims.play('jump');
        }}
        else{
            if(cat.body.touching.down){
                cat.anims.play('idle');
                cat.setVelocityX(0);
        }}

        if(healt == 3){
            healtt.anims.play('healt3', true);
        }
        else if(healt == 2){
            healtt.anims.play('healt2', true);  
        }
        else if(healt == 1){
            healtt.anims.play('healt1', true);  
        }
        else if(healt == 0){
            healtt.anims.play('healt0', true);  
            this.physics.pause();
            this.add.text(150, 300, 'Perdiste', { fontFamily: 'Pixelify Sans', fontSize: '32px'});
        }
    }
    function random(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }   
    function recolection(cat, apple){
        apple.destroy();

        score +=1;
        scoreText.setText('Puntos: ' + score);
    }
    function applefall(floor, apple){
        apple.destroy();
        
        healt-=1;
        score-=2;
        scoreText.setText('Puntos: ' + score);
        if(healt == 0){
            clearInterval(interval);
            music.pause();
        }
    }
}
