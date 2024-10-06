class Vinil {
    constructor(x) {
        this.x = x
        this.color = color(random(255), random(255), random(255))
    }
    draw(volhistory) {
        beginShape();
        strokeWeight(10)
        stroke(this.color)
        for (let i = 0; i < 360; i++) {
            let r = map(volhistory[i], 0, 1, this.x, this.x * 2);
            let x = r * cos(i);
            let y = r * sin(i);
            vertex(x, y, 0);
        }
        endShape();

    }
    update() {
        this.x += 10
    }
}