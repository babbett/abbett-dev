import { useEffect } from "react";

type Coords = {
    x: number;
    y: number;
}

type AngularMomentum = {
    x: number;
    y: number;
}

type GrabbedLocation = {
    x: number | null;
    y: number | null;
    isGrabbed: boolean;
}

type UniverseConstants = {
    gravity: number;
    friction: number;
}

interface PhysicsObject {
    coords: Coords;
    vx: number;
    vy: number;
    color: string;
    radius: number;
    logger: (msg: string) => void | null;

    draw(ctx: CanvasRenderingContext2D): void;
    calculateForces(con: UniverseConstants): void;
    calculateNewPosition(): void;
    collides(coords: Coords): boolean;
    // collidesX(coords: Coords): boolean;
    // collidesY(coords: Coords): boolean;
}

class Material {
    symbol: string;
    name: string;
    mass: number;
    color: string;
    meltingPoint: number;
    boilingPoint: number;

    constructor(symbol: string, name: string, mass: number, color: string, meltingPoint: number, boilingPoint: number) {
        this.symbol = symbol;
        this.name = name;
        this.mass = mass;
        this.color = color;
        this.meltingPoint = meltingPoint;
        this.boilingPoint = boilingPoint;
    }
}

class Ball implements PhysicsObject {
    coords: Coords;
    vx: number;
    vy: number;
    angularVelocity: number;
    radius: number;
    color: string;
    material: Material;
    logger: (msg: string) => void | undefined;
    stateLog: Array<object>;
    isGrabbed: GrabbedLocation;


    stateIntervalCounter: number;

    constructor(coords: Coords, vx: number, vy: number, radius: number, material: Material, logger: (msg: string) => void = (s: string) => {}) {
        this.coords = coords;
        this.vx = vx;
        this.vy = vy;
        this.angularVelocity = 0;
        this.radius = radius;
        this.material = material;
        this.color = material.color;
        this.logger = logger; // will log messages if provided
        this.stateLog = [];
        this.stateIntervalCounter = 120; // log the state every 10 frames
        this.isGrabbed = { isGrabbed: false, x: null, y: null };
    }

    draw(ctx: CanvasRenderingContext2D) {
        // draw a silly little circle
        ctx.beginPath();
        ctx.arc(this.coords.x, this.coords.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.changeColorWithSpeed();
        ctx.fill();

        if (this.logger !== undefined) {
            this.logState();
        }
    }

    calculateForces(con: UniverseConstants) {
        // gravity
        this.vy += con.gravity;

        // friction
        this.vx *= con.friction;
        this.vy *= con.friction;

        // to prevent the ball from getting stuck in the ground
        if (this.coords.y + this.vy + this.radius > 600) {
            this.vy = -this.vy;
        }
    }

    calculateNewPosition() {
        if (this.isGrabbed.isGrabbed) {
            this.coords.x = this.isGrabbed.x!;
            this.coords.y = this.isGrabbed.y!;
        } else {
            this.coords.x += this.vx;
            this.coords.y += this.vy;
        }
    }

    collides(coords: Coords) {
        if (Math.abs(coords.x - this.coords.x) < this.radius && Math.abs(coords.y - this.coords.y) < this.radius) {
            return true;
        }
        return false;
    }

    changeColorWithSpeed() {
        // change the color of the ball based on its speed
        const speed = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
        const maxSpeed = 10;
        const minSpeed = 0;
        const maxColor = 255;
        const minColor = 0;

        const red = Math.round((speed - minSpeed) * (maxColor - minColor) / (maxSpeed - minSpeed) + minColor);
        const green = Math.round((maxSpeed - speed) * (maxColor - minColor) / (maxSpeed - minSpeed) + minColor);
        const blue = 0;

        return `rgb(${red}, ${green}, ${blue})`;
    }

    getArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }

    rotateAroundPoint(point: Coords, angle: number) {
        // rotate the ball around a point by an angle
        const x = this.coords.x - point.x;
        const y = this.coords.y - point.y;

        this.coords.x = x * Math.cos(angle) - y * Math.sin(angle) + point.x;
        this.coords.y = x * Math.sin(angle) + y * Math.cos(angle) + point.y;
    }

    getState() {
        return {
            coords: this.coords,
            vx: this.vx,
            vy: this.vy,
            angularVelocity: this.angularVelocity,
            radius: this.radius,
            color: this.color,
            material: this.material.name,
        }
    }

    logState() {
        if (this.logger !== undefined) {
            if (this.stateIntervalCounter > 0) {
                this.stateIntervalCounter--;
                return;
            }
            //this.logger(`Logging state: ${JSON.stringify(this.getState())}`);
            this.stateLog.push(this.getState());
            this.stateIntervalCounter = 120;
        }
    }

    grab(mouseLoc: Coords) {
        //athis.isGrabbed = true;

        // stop the ball from moving
        this.vx = 0;
        this.vy = 0;

        // stop the ball from rotating
        this.angularVelocity = 0;

        // calculate the offset between the mouse and the center of the ball
        this.isGrabbed = { isGrabbed: true, x: mouseLoc.x, y: mouseLoc.y };

    }

    isPointInside(arg0: Coords) {
        if (Math.abs(arg0.x - this.coords.x) < this.radius && Math.abs(arg0.y - this.coords.y) < this.radius) {
            return true;
        }
        return false;
    }

}

class PhysicsPen {
    width: number;
    height: number;
    objects: Array<PhysicsObject>;
    constants: UniverseConstants;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;

    constructor(width: number, height: number, objects: Array<PhysicsObject>, constants: UniverseConstants) {
        this.width = width;
        this.height = height;
        this.objects = objects;
        this.constants = constants;

        this.canvas = null;
        this.ctx = null;
    }

    initialize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        // initialize the pen
        this.canvas = canvas;
        this.ctx = ctx;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }


    update() {
        if (this.canvas === null || this.ctx === null) {
            console.error("ERROR - update() in PhysicsPen: canvas or ctx is null");
            return;
        }

        this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.objects.length; i++) {
            const obj = this.objects[i];
            obj.calculateForces(this.constants);
            obj.calculateNewPosition();

            // No more calculation, time to draw
            obj.draw(this.ctx);
            if (obj.coords.y + obj.vy + obj.radius > this.canvas.height || obj.coords.y + obj.vy - obj.radius < 0) {
                obj.vy = -obj.vy;
            }
            if (obj.coords.x + obj.vx + obj.radius > this.canvas.width || obj.coords.x + obj.vx - obj.radius < 0) {
                obj.vx = -obj.vx;
            }
        }
        requestAnimationFrame(() => this.update);
    }

    add(obj: PhysicsObject) {
        // add an object to the pen
        this.objects.push(obj);
    }

    remove(obj: PhysicsObject) {
        // remove an object from the pen
    }
}

const PhysSim = () => {
    // A simple page to display the physics simulator
    useEffect(() => {
        const canvas = document.getElementById('simulator') as HTMLCanvasElement;
        const ctx = canvas!.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = 800;
        canvas.height = 600;

        let maxLogs = 100;
        const logger = (msg: string) => {
            if (maxLogs > 0) {
                maxLogs--;
            } else {
                return;
            }
            console.log(msg);
        }

        canvas.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            console.log(`(${x}, ${y})`);

            //pen.add(new Ball({ x, y }, 2, 2, 10, new Material("R", "rock", 100, "gray", 0, 100)));
        
            // if it's a ball, grab it
            for (let i = 0; i < pen.objects.length; i++) {
                const obj = pen.objects[i];
                if (obj instanceof Ball) {
                    if (obj.isPointInside({ x, y })) {
                        let loc: Coords = { x, y };
                        obj.grab(loc);
                        break;
                    }
                }
            }
        });


        // canvas.addEventListener('mousemove', (e) => {
        //     const rect = canvas.getBoundingClientRect();
        //     const x = e.clientX - rect.left;
        //     const y = e.clientY - rect.top;
        //     //console.log(`(${x}, ${y})`);

        //     // if it's a ball, grab it
        //     for (let i = 0; i < pen.objects.length; i++) {
        //         const obj = pen.objects[i];
        //         if (obj instanceof Ball) {
        //             if (obj.isPointInside({ x, y })) {
        //                 obj.grab();
        //                 break;
        //             }
        //         }
        //     }
        // });


        const rock = new Material("R", "rock", 100, "gray", 0, 100);
        const ball1 = new Ball({ x: 200, y: 200 }, 2, 2, 10, rock, logger);
        const ball2 = new Ball({ x: 300, y: 300 }, 2, 2, 10, rock);
        const ball3 = new Ball({ x: 400, y: 400 }, 2, 2, 10, rock);

        const physicsObjects = Array<PhysicsObject>(ball1, ball2, ball3);
        const constants = {
            gravity: 0.1,
            friction: 0.99,
        }

        const pen = new PhysicsPen(canvas.width, canvas.height, physicsObjects, constants);
        pen.initialize(canvas, ctx);

        // update at 60 fps
        setInterval(() => pen.update(), 1000/60);
    }, []);

    return (
        <div>
        <h1 className="dark:text-white">Physics Simulator</h1>
            <canvas id="simulator" className="border-2 border-white" />
        </div>
    );
}

export default PhysSim;

