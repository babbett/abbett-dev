import { useEffect } from "react";
import { LayersModel, Sequential } from "@tensorflow/tfjs-node";
import tf from "@tensorflow/tfjs-node";
import { sampleSize } from "cypress/types/lodash";

class Car {
    minPosition: number;
    maxPosition: number;
    maxSpeed: number;
    goalPosition: number;
    goalVelocity: number;
    gravity: number;
    carWidth: number;
    carHeight: number;
    force: number;
    position: number;
    velocity: number;
    
    constructor() {
        this.minPosition = -1.2;
        this.maxPosition = 0.6;
        this.maxSpeed = 0.07;
        this.goalPosition = 0.5;
        this.goalVelocity = 0;
        this.gravity = 0.0025;
        this.carWidth = 0.2;
        this.carHeight = 0.1;
        this.force = 0.0013;

        this.position = 0;
        this.velocity = 0;
        this.setRandomState();
    }

    /** 
     * Set the car to a random position and velocity.
     */
    setRandomState() {
        this.position = Math.random() / 5 - 0.6;
        this.velocity = 0;
    }

    /**
     * Update the mountain car system using an action
     * @param {number} action -1 for left, 0 for no force, 1 for right
     * @returns {bool} whether the simulation is done
     */
    update(action: number) {
        this.velocity += action * this.force - Math.cos(3 * this.position) * this.gravity;
        this.velocity = Math.min(Math.max(this.velocity, -this.maxSpeed), this.maxSpeed);

        this.position += this.velocity;
        this.position = Math.min(Math.max(this.position, this.minPosition), this.maxPosition);
        if (this.position === this.minPosition && this.velocity < 0) {
            this.velocity = 0;
        }

        return this.isDone();
    }

    /**
     * Check if the car is in the goal position and velocity is greater than 0
     * @returns {bool} whether the simulation is done
     */
    isDone() {
        return this.position >= this.goalPosition && this.velocity >= this.goalVelocity;
    }
}

class Model {
    numStates: number;
    numActions: number;
    batchSize: number;
    network!: LayersModel | Sequential;

    constructor(hiddenLayerSizesOrModel: LayersModel | Sequential, numStates: number, numActions: number, batchSize: number) {
        this.numStates = numStates;
        this.numActions = numActions;
        this.batchSize = batchSize;
        
        // if we already have a model, use it
        if (hiddenLayerSizesOrModel instanceof tf.LayersModel) {
            this.network = hiddenLayerSizesOrModel;
            this.network.summary();
            this.network.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
        } else {
            this.defineModel(hiddenLayerSizesOrModel);
        }
    }

    defineModel(hiddenLayerSizes: number[]) {
        if (!Array.isArray(hiddenLayerSizes)) {
            hiddenLayerSizes = [hiddenLayerSizes];
        }
        this.network = tf.sequential();
        hiddenLayerSizes.forEach((hiddenLayerSize, i) => {
            let layer = tf.layers.dense({
                units: hiddenLayerSize,
                inputShape: i === 0 ? [this.numStates] : undefined,
                activation: 'relu'
            });
            // since this.network is a Sequential model, we can call `add` to add layers
            if (this.network instanceof tf.Sequential)
                this.network.add(layer);
        });
        if (this.network instanceof tf.Sequential)
            this.network.add(tf.layers.dense({ units: this.numActions }));

        this.network.summary();
        this.network.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    }

    /**
     * Predict the action values for a given state
     * @param {tf.Tensor | tf.Tensor[]} states - the states to predict the action values for
     * @returns {tf.Tensor} the predicted action values
     */
    predict(states: tf.Tensor) {
        return tf.tidy(() => this.network.predict(states))
    }

    /**
     * Train the model on a batch of experiences
     * @param {tf.Tensor} xBatch
     * @param {tf.Tensor} yBatch
     */
    async train(xBatch: tf.Tensor, yBatch: tf.Tensor) {
        await this.network.fit(xBatch, yBatch);
    }

    /**
     * Choose an action based on the given state and epsilon
     * @param {tf.Tensor} state - the state to choose an action for
     * @returns {number} the chosen action {-1, 0, 1}
     */
    chooseAction(state: tf.Tensor, eps: number) {
        if (Math.random() < eps) {
            return Math.floor(Math.random() * this.numActions) - 1;
        } else {
            return tf.tidy(() => {
                let actionValues = this.network.predict(state);
                if (actionValues instanceof tf.Tensor)
                    return actionValues.argMax(1).dataSync()[0] - 1;
                else
                    console.log("actionValues is not a tensor");
            });
        }
    }
}

class Memory {
    maxMemory: number;
    samples: Array<any>;

    constructor(maxMemory: number) {
        this.maxMemory = maxMemory;
        this.samples = new Array();
    }

    addSample(sample: any) {
        this.samples.push(sample);
        if (this.samples.length > this.maxMemory) {
            this.samples.shift();
        }
    }

    sample(nSamples: number) {
        return sampleSize(this.samples, nSamples);
    }
}

// Solve the 'mountain car' problem with q-learning
// https://medium.com/@pierrerouhard/reinforcement-learning-in-the-browser-an-introduction-to-tensorflow-js-9a02b143c099
const MountainCar = () => {
    useEffect(() => {
        let canvas: any = document.getElementById("canvas");
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
   
   
    }, []);

    return (
        <canvas id="canvas" width="500" height="500" />
    );
}

export default MountainCar;