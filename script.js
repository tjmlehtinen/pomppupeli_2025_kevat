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
    paivita: function() {
        this.x = mouseX
    }
}

// luokka, josta tehdään pomppijoita
class Pomppija {
    constructor(x, y, xMuutos, yMuutos) {
        this.x = x
        this.y = y
        this.xMuutos = xMuutos
        this.yMuutos = yMuutos
        this.koko = 50
    }

    piirra() {
        rectMode(CENTER)
        fill(183, 83, 113)
        rect(this.x, this.y, this.koko, this.koko)
    }

    paivita() {
        this.x += this.xMuutos
        this.y += this.yMuutos
        if (this.y >= pelinKorkeus) {
            this.yMuutos *= -1
        }
        this.yMuutos += 1
    }
}

const testiPomppija = new Pomppija(200, 100, 0, 0)

// setup kutsutaan kerran sivun ladattua
function setup() {
    createCanvas(pelinLeveys, pelinKorkeus)
}

// draw kutsutaan toistuvasti, eli on piirtoluuppi
function draw() {
    background(100, 200, 100)
    lautta.piirra()
    testiPomppija.piirra()

    lautta.paivita()
    testiPomppija.paivita()
}