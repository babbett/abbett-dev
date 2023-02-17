import { useEffect } from "react";
import { Matrix } from "ts-matrix";
import RandomFirstName from "../../lib/RandomFirstName";

class NeuralNetwork {
    private inputLayerSize: number;
    private hiddenLayerSize: number;
    private outputLayerSize: number;
    private weights1: Matrix;
    private weights2: Matrix;

    constructor(inputLayerSize: number, hiddenLayerSize: number, outputLayerSize: number) {
        this.inputLayerSize = inputLayerSize;
        this.hiddenLayerSize = hiddenLayerSize;
        this.outputLayerSize = outputLayerSize;

        this.weights2 = new Matrix(inputLayerSize, hiddenLayerSize, this.randomizedWeights(inputLayerSize, hiddenLayerSize));
        this.weights1 = new Matrix(hiddenLayerSize, outputLayerSize, this.randomizedWeights(hiddenLayerSize, outputLayerSize));
    }

    private randomizedWeights(rows: number, cols: number): number[][] {
        let randWeights: number[][] = [];
        for (let i = 0; i < rows; i++) {
            let row: number[] = [];
            for (let j = 0; j < cols; j++) {
                row.push(Math.random());
            }
            randWeights.push(row);
        }
        return randWeights;
    }
}

type Coords = {
    x: number;
    y: number;
}

type Velocity = {
    direction: Coords;
    speed: number;
}

interface Location {
    coords: Coords;
    type: string;
}

class Hive implements Location {
    coords: Coords;
    type: string;
    bees: Bee[];
    pollen: number;

    constructor(coords: Coords) {
        this.coords = coords;
        this.type = "hive";
        this.bees = [];
        this.pollen = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (ctx == null) return;
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.coords.x, this.coords.y, 25, 25);
    }

    update() {
        // feed all the bees in the hive, decrememnting pollen
        while(this.pollen > 0) {

            console.log("feeding bees");
            if (this.bees.length == 0) {
                console.log("no bees to feed")
            }

            this.bees.forEach(bee => {
                bee.feed(1);
                this.removePollen(1);
            }, this)
        }
    }
    
    addBee(bee: Bee) {
        console.log("adding bee: " + bee.name);
        this.bees.push(bee);
    }

    removeBee(bee: Bee) {
        console.log("removing bee: " + bee.name);
        this.bees = this.bees.filter(b => b != bee);
    }

    addPollen(pollen: number) {
        console.log("adding pollen: " + pollen)
        this.pollen += pollen;
    }

    removePollen(pollen: number) {
        console.log("removing pollen: " + pollen)
        this.pollen -= pollen;
    }

    isFull() {
        console.log("hive is full: " + (this.pollen >= 100) ? "true" : "false");
        return this.pollen >= 100;
    }

    reset() {
        this.pollen = 0;
    }

    getBeeCount() {
        console.log("bee count: " + this.bees.length)
        return this.bees.length;
    }
}

class Flower implements Location {

    coords: Coords;
    type: string;
    pollen: number;
    maxPollen: number;
    bees: Bee[];
    age: number;

    constructor(coords: Coords) {
        this.coords = coords;
        this.type = "flower";
        this.maxPollen = random(50, 100);
        this.pollen = this.maxPollen;
        this.bees = [];
        this.age = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (ctx == null) return;
        ctx.fillStyle = "red";
        ctx.fillRect(this.coords.x, this.coords.y, 10, 10);
    }

    update() {
        // pollinate all the bees in the flower, incrementing pollen
        while(this.pollen > 0) {
            this.bees.forEach(bee => {
                if (!bee.isFull()) {
                    bee.addToPollen(1);
                    this.pollen -= 1;
                } else {
                    console.log("bee is full, leaving flower");
                    bee.leaveFlower();

                }
            }, this)
        }

        this.pollen += 1;
        if (this.pollen > this.maxPollen) {
            this.pollen = this.maxPollen;
        }
    }

    pollinate() {
        this.pollen -= 1;
    }

    isPollinated() {
        return this.pollen <= 0;
    }

    reset() {
        this.pollen = 100;
    }

    addBee(bee: Bee) {
        this.bees.push(bee);
    }

    removeBee(bee: Bee) {
        this.bees = this.bees.filter(b => b != bee);
    }
}

class Bee {
    coords: Coords;
    velocity: Velocity;
    pollenCapacity: number;
    pollen: number;
    brain: NeuralNetwork;
    energy: number;
    maxEnergy: number;
    inHive: boolean;
    name: string;
    location: Location | null;

    constructor(coords: Coords) {
        this.coords = coords;
        this.velocity = { direction: { x: 0, y: 0 }, speed: 0 };
        this.pollenCapacity = 10;
        this.pollen = 0;
        this.brain = new NeuralNetwork(2, 2, 2);
        this.energy = 100;
        this.maxEnergy = 100;
        this.inHive = true;
        this.name = RandomFirstName();
        this.location = null;
    }

    

    draw(ctx: CanvasRenderingContext2D) {
        if (ctx == null) return;
        ctx.fillStyle = "black";
        ctx.fillRect(this.coords.x, this.coords.y, 5, 5);
    }

    move() {
        this.coords.x += this.velocity.direction.x * this.velocity.speed;
        this.coords.y += this.velocity.direction.y * this.velocity.speed;
    }

    update() {
        this.move();
        this.energy -= 1;

        if (this.energy <= 0) {
            console.log("bee died of starvation: " + this.name)
            this.energy = 0;
        }

        if (this.pollen >= this.pollenCapacity) {
            console.log("bee is full: " + this.name)
            this.pollen = this.pollenCapacity;
        }
    }

    feed(pollen: number) {
        console.log("bee is being fed: " + this.name)
        this.energy += pollen;
        if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        }
    }

    getHungerDifference() {
        return this.maxEnergy - this.energy;
    }

    pollinate(flower: Flower) {
        console.log("bee is pollinating: " + this.name)
        this.pollen += 1;
        flower.pollinate();
    }

    isDead() {
        return this.energy <= 0;
    }

    isFull() {
        return this.pollen >= this.pollenCapacity;
    }

    isHungry() {
        return this.energy <= this.maxEnergy * 0.25;
    }

    enterHive(hive: Hive) {
        console.log("bee is entering hive: " + this.name)
        this.inHive = true;
        this.location = hive;
        hive.addBee(this);
    }

    leaveHive() {
        console.log("bee is leaving hive: " + this.name)
        if (this.location != null && this.location.type == "hive") {
            let hive = this.location as Hive;
            hive.removeBee(this);
            this.location = null;
        }
    }

    enterFlower(flower: Flower) {
        console.log("bee is entering flower: " + this.name)
        this.inHive = false;
        this.location = flower;
        flower.addBee(this);
    }

    leaveFlower() {
        console.log("bee is leaving flower: " + this.name)
        if (this.location != null && this.location.type == "flower") {
            let flower = this.location as Flower;
            flower.removeBee(this);
            this.location = null;
        }
    }

    addToPollen(pollen: number) {
        this.pollen += pollen;
        if (this.pollen > this.pollenCapacity) {
            this.pollen = this.pollenCapacity;
        }
    }

    // Bee can only pollinate a flower if it is not already pollinated
    canPollinate(flower: Flower) {
        return !flower.isPollinated();
    }

    // Bee leaves behind a pheromone trail when it moves, which other bees can follow
    leavePheromoneTrail() {
        // TODO
    }

    // Bee can sense nearby pheromone trails
    sensePheromoneTrail() {
        // TODO
    }
}

let random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

let distance = (a: Coords, b: Coords) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

const Pollination = () => {
    // Run a Pollination simulation
    useEffect (() => {
        let canvas = document.getElementById("pollination") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");

        let beehive: Hive;
        let flowers: Flower[] = [];
        let bees: Bee[] = [];

        let initializeCanvas = () => {
            if (ctx == null) return;

            ctx.fillStyle = "aqua";
            ctx.fillRect(0, 0, 500, 500);

            // Create a hive
            beehive = new Hive({ x: 0, y: 0 });
            beehive.coords.x = random(0, 450);
            beehive.coords.y = random(0, 450);
            beehive.draw(ctx);

            // Create some flowers a minimum distance away from the hive
            for (let i = 0; i < 10; i++) {
                let flower = new Flower({ x: 0, y: 0 });
                flower.coords.x = random(0, 490);
                flower.coords.y = random(0, 490);
                while (distance(flower.coords, beehive.coords) < 100) {
                    flower.coords.x = random(0, 490);
                    flower.coords.y = random(0, 490);
                }
                flowers.push(flower);
                flower.draw(ctx);
            }

            // Make sure the flowers are not too close to each other
            for (let i = 0; i < flowers.length; i++) {
                for (let j = 0; j < flowers.length; j++) {
                    if (i == j) continue;
                    while (distance(flowers[i].coords, flowers[j].coords) < 50) {
                        flowers[i].coords.x = random(0, 490);
                        flowers[i].coords.y = random(0, 490);
                    }
                }
            }

            // Make sure no objects are off the screen or intersecting with each other
            for (let i = 0; i < flowers.length; i++) {
                if (flowers[i].coords.x < 0) flowers[i].coords.x = 0;
                if (flowers[i].coords.x > 490) flowers[i].coords.x = 490;
                if (flowers[i].coords.y < 0) flowers[i].coords.y = 0;
                if (flowers[i].coords.y > 490) flowers[i].coords.y = 490;
            }

            // Create some bees
            for (let i = 0; i < 10; i++) {
                let bee = new Bee({ x: 0, y: 0 });
                bee.coords.x = beehive.coords.x;
                bee.coords.y = beehive.coords.y;
                beehive.addBee(bee);
                bee.draw(ctx);

                bees.push(bee);
            }
        }

        let update = () => {
            if (ctx == null) return;

            ctx.fillStyle = "aqua";
            ctx.fillRect(0, 0, 500, 500);

            // Draw the hive
            beehive.update();
            beehive.draw(ctx);

            // Draw the flowers
            flowers.forEach(flower => {
                flower.update();
                flower.draw(ctx!);
            });

            // Draw the bees
            beehive.bees.forEach(bee => {
                bee.update();
                bee.draw(ctx!);
            });

            // Check if any bees are dead, and remove them
            for (let i = 0; i < bees.length; i++) {
                if (bees[i].isDead()) {
                    bees[i].leaveHive();
                    bees[i].leaveFlower();
                    bees.splice(i, 1);
                }
            }
        }

        initializeCanvas();

    }, []);

    return (
        <div>
            <canvas id="pollination" height="500" width="500" className='mx-auto'></canvas>
        </div>
    )
}

export default Pollination;