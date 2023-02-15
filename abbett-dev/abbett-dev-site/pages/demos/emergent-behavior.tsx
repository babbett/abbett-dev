import { useEffect } from 'react';

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
}

// Based on code from
// https://www.youtube.com/watch?v=0Kx4Y9TVMGg

// game of life but smooth, 
// https://www.youtube.com/watch?v=PUsWxzfuUmA&list=PLYTjd0ZEnNx_Rfq4cERntyBe9BY3J4zHE&index=10
// what if this was used for some sort of pathfinding? one of the stable 
// structures is a sort of path, could connect food sources? 
var EmergentBehavior = () => {   
    useEffect (() => {
        let canvas: any = document.getElementById("life");
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

        let draw = (x: number, y: number, c: string, s: number) => {
            ctx.fillStyle = c;
            ctx.fillRect(x, y, s, s);
        }

        let particles = new Array<Particle>();

        let particleFactory = (x: number, y: number, c: string) => {
            let p: Particle = { 
                "x": x,
                "y": y,
                "vx": 0.0,
                "vy": 0.0,
                "color": c
            };

            return p;
        }
        
        let random = () => {
            return Math.random() * 400 + 50;
        }

        let create = (number: number, color: string) => {
            var group = []
            for (let i = 0; i < number; i++) {
                group.push(particleFactory(random(), random(), color));
                particles.push(group[i])
            }
            return group;
        }

        let update = () => {
            // Apply the rules
            rule(yellow, yellow, 0.2)
            rule(red, red, -0.2)
            rule(yellow, red, -0.13)
            // rule(red, blue, 0.2)
            // rule(blue, red, -0.1)
            // rule(blue, blue, -0.1)
            // rule(blue, yellow, 0.1)

            // Clear and redraw canvas background
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw(0, 0, "black", 500);

            // Draw particles
            for (let i = 0; i < particles.length; i++) {
                draw(particles[i].x, particles[i].y, particles[i].color, 5);
            }

            // Finally, update the frame
            requestAnimationFrame(update);
        }

        let rule = (particlesA: Array<Particle>, particlesB: Array<Particle>, g: number) => {
            for (let i = 0; i < particlesA.length; i++) {
                let fx = 0.0;
                let fy = 0.0;
                let particleA = particlesA[i];
                for (let j = 0; j < particlesB.length; j++) {
                    let particleB = particlesB[j];

                    let dx = particleA.x - particleB.x;
                    let dy = particleA.y - particleB.y;
                    let d = Math.sqrt(dx * dx + dy * dy);
                    if (d > 0 && d < 90) {
                        let F = (g * 1)/d;
                        fx += F * dx;
                        fy += F * dy;
                    }
                }   
                particleA.vx = (particleA.vx + fx) * 0.5;
                particleA.vy = (particleA.vy + fy) * 0.5;

                particleA.x += particleA.vx;
                particleA.y += particleA.vy;

                if (particleA.x <= 0 || particleA.x >= 500-10) {
                    particleA.vx *= -1;
                    particleA.x = Math.max(0, Math.min(500-10, particleA.x));
                }
                if (particleA.y <= 0 || particleA.y >= 500-10) {
                    particleA.vy *= -1;
                    particleA.y = Math.max(0, Math.min(500-10, particleA.y));
                }
            }
        }

        let yellow = create(100, "yellow");
        let red = create(100, "red");
        let blue = create(100, "blue");
        update();

    }, []);

    return (
        <canvas id="life" height="500" width="500" className='mx-auto'></canvas>
    );
}

export default EmergentBehavior;