---
layout: doc
title: Control Theory
---

# Control Theory

In vehicle modeling, we don't just care about how a vehicle moves — we care about how to make it move the way we want. Control theory is the mathematical framework used to regulate the behavior of dynamic systems to reach a desired state.

## Open-Loop vs. Closed-Loop

The most fundamental distinction in control is whether or not the system "looks" at its own output to make decisions.

### Open-Loop Control

The controller sends a command based on a preset map or timer without checking the actual result.

- **Drone example.** You tell the motors to spin at 5,000 RPM. If a gust of wind pushes the drone down, the controller does nothing — it doesn't know the altitude changed.
- **Pros.** Simple, requires no sensors.
- **Cons.** Cannot account for disturbances or changes in the environment.

### Closed-Loop (Feedback) Control

The controller measures the actual output $y$ using a sensor and compares it to the desired setpoint $r$ to compute the **error** $e$.

$$e(t) = r(t) - y(t)$$

The control signal is then a function of this error. Every controller discussed below is a closed-loop controller.

## Bang-Bang Control

The simplest form of feedback. The controller has only two states: **full on** or **full off**.

$$u(t) = \begin{cases} U_{\max} & \text{if } e(t) > 0 \\ -U_{\max} & \text{if } e(t) < 0 \end{cases}$$

If the error is positive, drive the actuator to max. If negative, drive it to min. The result is constant oscillation around the setpoint — this is called **chatter**.

<ClientOnly>
  <BangBangPlot />
</ClientOnly>

Notice that the system never settles. Bang-bang control is useful when simplicity matters more than precision (thermostats, relays), but it's unsuitable for smooth vehicle control.

## PID Control

The workhorse of engineering. PID computes a smooth control input $u(t)$ using three terms that each address a different aspect of the error.

$$u(t) = K_p\, e(t) + K_i \int_0^t e(\tau)\, d\tau + K_d\, \frac{de(t)}{dt}$$

| Term | Name | Role |
| :--- | :--- | :--- |
| $K_p$ | Proportional | Reacts to the **current** error. Larger $K_p$ = faster response, but too high causes oscillation. |
| $K_i$ | Integral | Accumulates **past** error. Eliminates steady-state offset, but can cause windup and overshoot. |
| $K_d$ | Derivative | Reacts to the **rate of change** of error. Damps oscillation and prevents overshoot. |

<ClientOnly>
  <PIDPlot />
</ClientOnly>

### Tuning intuition

- **$K_i = 0$:** The system will settle near but not exactly at the setpoint (steady-state error).
- **$K_d = 0$:** The system reaches the setpoint but overshoots and rings.
- **All three tuned:** Fast rise, minimal overshoot, zero steady-state error.

## Feedforward Control

PID reacts to error after it has already occurred. **Feedforward** predicts the required input based on known physics and applies it proactively, before any error builds up.

$$u(t) = u_{\text{ff}}(t) + u_{\text{fb}}(t)$$

Where $u_{\text{ff}}$ is computed from a model of the plant (e.g., gravity compensation for a drone) and $u_{\text{fb}}$ is the PID feedback term.

**The benefit.** The feedback loop only has to handle disturbances and model error — the feedforward handles the predictable, steady-state load. This reduces the demands on PID gains and allows tighter tuning.

In vehicle dynamics, feedforward is used for steering angle prediction, throttle mapping, and active suspension load estimation.

## State-Space Representation

For systems that need to regulate multiple coupled outputs simultaneously — altitude, pitch, roll, and yaw on a drone — independent PID loops start to interfere with each other. State-space treats the entire system state as a single vector and applies control to all states at once.

The system is described by two matrix equations:

$$\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$$
$$\mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u}$$

| Symbol | Meaning |
| :--- | :--- |
| $\mathbf{x}$ | State vector (e.g., $[\text{position},\ \text{velocity},\ \text{angle}]^\top$) |
| $\mathbf{A}$ | System matrix — how states evolve naturally from physics |
| $\mathbf{B}$ | Input matrix — how control inputs affect each state |
| $\mathbf{C}$ | Output matrix — which states are observable |
| $\mathbf{D}$ | Feedthrough matrix — direct input-to-output coupling (often zero) |

### LQR

**Linear Quadratic Regulator (LQR)** is an optimal controller derived from the state-space model. It computes a gain matrix $\mathbf{K}$ such that the control law:

$$\mathbf{u} = -\mathbf{K}\mathbf{x}$$

minimizes a cost function that trades off state error against control effort:

$$J = \int_0^\infty \left( \mathbf{x}^\top \mathbf{Q}\, \mathbf{x} + \mathbf{u}^\top \mathbf{R}\, \mathbf{u} \right) dt$$

The $\mathbf{Q}$ matrix penalizes state error; $\mathbf{R}$ penalizes control effort. Tuning LQR is a matter of choosing these weight matrices rather than individual scalar gains.
