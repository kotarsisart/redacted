# REDACTED

An interactive narrative experience built around system failure, control illusion, and acceptance.

---

## 🧠 Concept

REDACTED is designed as a psychological journey through structured states:

**Denial → Anger → Bargaining → Depression → Acceptance**

Each stage is not just visual — it is implemented as an **interactive system**
that translates emotional states into behavior.

> The goal is not to show emotions — but to make the user experience them.

---

## 🧩 Structure

The project consists of **two main parts**:

### 1. Crash Flow (Entry Experience)

A guided, interactive sequence where the user attempts to "fix" a broken system.

This flow contains multiple mini-mechanics:

* **Escaping buttons** — UI elements that actively resist interaction
* **Contrast calibration** — adjusting visibility to “restore” the system
* **Hold-to-focus mechanic** — clarity emerges only when the user maintains input
* **Stability interaction** — the system reacts differently based on persistence
* **Broken reward system** — a distorted "Best Developer" trophy:

  * cannot be perfectly aligned
  * even when “correct”, the system responds with *“good enough”*
  * reinforces the idea that perfection is not required to move forward

Each mechanic simulates **attempts to regain control**, but never fully resolves the system.

---

### 2. Main Experience (Home)

After the crash flow, the user enters the main page.

Here, the narrative unfolds through interactive sections:

* **Denial** — fake validation systems that appear reliable
* **Anger** — escalating interaction pressure
* **Bargaining** — illusion of control through selectable options
* **Depression** — randomness and absence of control
* **Acceptance** — resolution through understanding

---

## 🖱️ Interaction System

The experience is driven by interaction mechanics rather than navigation.

Key patterns:

* **Cursor as communication layer**

  * directional cursors guide movement
  * interaction is often explained without text

* **State-driven behavior**

  * each section introduces its own logic
  * user expectations are intentionally broken

* **Controlled imperfection**

  * systems appear functional but fail intentionally
  * “good enough” is often treated as success

---

## ⚙️ Tech Stack

* React + TypeScript
* SCSS (modular architecture)
* Custom i18n system
* No animation libraries — all interactions built manually

---

## 🧱 Architecture Highlights

* Component-driven architecture
* Reusable interaction systems (preloader, staged flows)
* Separation of logic and presentation
* State-based UX instead of route-based navigation
* Independent interaction modules per section

---

## 🚀 Getting Started

```bash id="j41y0h"
npm install
npm run dev
```

---

## 📌 Implementation Notes

* Two-phase structure: **interactive entry → narrative experience**
* Interaction logic tightly coupled with UI behavior
* Animations controlled via state + CSS (no external libs)
* Cursor system acts as a primary UX communication tool
* Systems are intentionally designed to **fail or behave imperfectly**

---

## 🎨 Design Philosophy

* UI is treated as a narrative medium
* Interaction replaces explanation
* Systems are designed to **break intentionally**
* Imperfection is not an error — it is part of the solution

---

## 💡 Author

Part of the **Kotarsis** ecosystem —
a collection of concept-driven projects combining engineering, design, and interactive storytelling.
