class Enemy {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = 50
    }
    draw() {
        push()
        fill('red')
        translate(this.x, this.y, this.z)
        box(this.size)
        pop()
    }
    update() {
        this.z += 40
    }

}