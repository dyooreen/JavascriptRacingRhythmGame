class Car {
    constructor(x) {
        this.x = x
        this.y = 150
        this.z = 0
    }
    draw() {
        noStroke()
        push()
        fill('blue')
        translate(this.x, this.y, this.z)
        box(100)
        pop()
    }
    getX(){
        return this.x
    }
    update(pos) {
        switch (pos) {
            case 'right':
                if (this.x < 100) {
                    this.x += 110
                }
                break
            case 'left':
                if (this.x > -100) {
                    this.x -= 110
                }
                break
        }
    }
}   