---
layout: doc
title: Control Theory
---

# Control Theory

In vehicle modeling, we don't just care about how a vehicle moves; we care about how to make it move the way we want. Control theory is the mathematical framework used to regulate the behavior of dynamic systems to reach a desired state.

## Open-Loop vs. Closed-Loop

The most fundamental distinction in control is whether or not the system "looks" at its own output to make decisions.

### Open-Loop Control
The controller sends a command based on a preset map or timer without checking the actual result.
* **Drone Example:** You tell the motors to spin at 5,000 RPM. If a gust of wind pushes the drone down, the controller does nothing to compensate because it doesn't "know" the altitude changed.
* **Pros:** Simple, requires no sensors.
* **Cons:** Cannot account for disturbances or changes in the environment.

### Closed-Loop (Feedback) Control
The controller measures the actual output ($y$) using a sensor (like a barometer) and compares it to the desired setpoint ($r$) to calculate the **Error** ($e$).
* **The Error Equation:** $e(t) = r(t) - y(t)$



## Bang-Bang Control
The simplest form of feedback. The controller only has two states: **Full On** or **Full Off**.

If the error is positive, turn the actuator to max. If negative, shut it down.
$$
u(t) = 
\begin{cases} 
U_{max} & \text{if } e(t) > 0 \\ 
0 & \text{if } e(t) < 0 
\end{cases}
$$

* **Drone Example:** To reach 10 meters, you blast the motors at 100% until you hit 10m, then turn them off. 
* **The Downside:** The drone will constantly overshoot and undershoot, oscillating wildly around the target. This is called "chatter."



## PID Control
The "Workhorse" of engineering. It calculates a smooth control input $u(t)$ using three distinct terms to minimize error.

$$u(t) = K_p e(t) + K_i \int e(t) dt + K_d \frac{de(t)}{dt}$$

| Term | Name | Drone Altitude Function |
| :--- | :--- | :--- |
| **$K_p$** | Proportional | **The Power:** If you are 5m below the target, spin the motors fast. As you get closer, slow them down. |
| **$K_i$** | Integral | **The Memory:** If the drone is hovering slightly below the target for a long time, this term sums up that "hidden" error and gives an extra push to close the gap. |
| **$K_d$** | Derivative | **The Damper:** If the drone is approaching the target too fast, this term senses the high speed and "brakes" the motors to prevent overshooting. |



## Feedforward Control
While PID reacts to error, **Feedforward** predicts the required input based on known physics.

In a drone, we know **gravity** is always pulling it down. Instead of waiting for the drone to fall and then letting PID react, we apply a base motor speed just to cancel out gravity. 

* **The Math:** $u = u_{ff} + u_{fb}$
* **The Benefit:** The PID (Feedback) now only has to handle wind and small corrections, while the Feedforward handles the "heavy lifting" of staying airborne.



## State-Space Representation
For complex vehicles that need to manage altitude, pitch, roll, and yaw all at once, simple PID loops start to fight each other. State-Space allows us to look at the "State" of the vehicle as a single vector.

We represent the system using two primary matrix equations:

$$\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$$
$$\mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u}$$

* **$\mathbf{x}$**: The state vector (e.g., [position, velocity, tilt angle]).
* **$\mathbf{A}$**: The System Matrix (how the drone moves naturally due to physics).
* **$\mathbf{B}$**: The Input Matrix (how motor thrust affects those states).

This allows for advanced techniques like **LQR (Linear Quadratic Regulator)**, which mathematically calculates the most efficient way to move all motors simultaneously to keep the drone perfectly level and at the right height.