const pelinLeveys = 600
const pelinKorkeus = 400

// tehdään javascript-oliona lautta, johon pomppijat törmäävät
const lautta = {
    x: pelinLeveys / 2,
    y: pelinKorkeus - 50,
    leveys: 100,
    korkeus: 40,
    piirra: function() {
        rectMode(CENTER)
        fill(83, 83, 113)
        rect(this.x, this.y, this.leveys, this.korkeus)
    },
}

// setup kutsutaan kerran sivun ladattua
function setup() {
    createCanvas(pelinLeveys, pelinKorkeus)
    background(100, 200, 100)
}

// draw kutsutaan toistuvasti, eli on piirtoluuppi
function draw() {
    lautta.piirra()
}