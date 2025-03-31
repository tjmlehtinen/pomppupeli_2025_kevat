const pelinLeveys = 600
const pelinKorkeus = 500

let elamat = 3
let pisteet = 0

const aloitusnappi = document.getElementById("aloitusnappi")
aloitusnappi.addEventListener("click", aloitaPeli)

// Satunnainen kokonaisluku
function satunnainenInt(min, max) {
    const satunnainenLiukuluku = (max - min) * Math.random() + min
    return Math.floor(satunnainenLiukuluku)
}


// tehdään javascript-oliona lautta, johon pomppijat törmäävät
const lautta = {
    x: pelinLeveys / 2,
    y: pelinKorkeus - 50,
    leveys: 300,
    korkeus: 40,
    piirra: function() {
        rectMode(CENTER)
        fill(83, 83, 113)
        rect(this.x, this.y, this.leveys, this.korkeus)
    },
    paivita: function() {
        this.x = mouseX
    },
    osuuko: function(x, y) {
        const osuukoX = this.x - (this.leveys / 2) < x && x < this.x + (this.leveys / 2)
        const osuukoY = this.y - (this.korkeus / 2) < y && y < this.y + (this.korkeus / 2)
        return osuukoX && osuukoY
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
        if (lautta.osuuko(this.x, this.y)) {
            this.yMuutos *= -1
        }
        this.yMuutos += 1
    }
}

let pomppijat = []

let pomppuIntervalli

function teePomppijoita() {
    pomppuIntervalli = setInterval(function() {
        const nopeus = satunnainenInt(3, 15)
        const uusiPomppija = new Pomppija(0, 50, nopeus, 0)
        pomppijat.push(uusiPomppija)
    }, 1000)
}

// setup kutsutaan kerran sivun ladattua
function setup() {
    const peliruutu = createCanvas(pelinLeveys, pelinKorkeus)
    peliruutu.parent("peliruudun-div")
    frameRate(10)
    noLoop()
}

// draw kutsutaan toistuvasti, eli on piirtoluuppi
function draw() {
    background(100, 200, 100)
    lautta.piirra()
    lautta.paivita()
    for (const pomppija of pomppijat) {
        pomppija.paivita()
        pomppija.piirra()
        if (pomppija.x > pelinLeveys) {
            pisteet += 1
        }
        else if (pomppija.y > pelinKorkeus) {
            elamat -= 1
            if (elamat === 0) {
                gameOver()
            }
        }
        textSize(20)
        fill(13, 13, 187)
        text("Pisteet: " + pisteet + " Elämät: " + elamat, 10, 20)
    }
    pomppijat = pomppijat.filter((p) => p.x <= pelinLeveys && p.y <= pelinKorkeus)
}

function aloitaPeli() {
    clearInterval(pomppuIntervalli)
    elamat = 3
    pisteet = 0
    pomppijat = []
    teePomppijoita()
    loop()
}

function gameOver() {
    clearInterval(pomppuIntervalli)
    textSize(50)
    fill(183, 13, 187)
    text("GAME OVER", 100, 200)
    noLoop()
}