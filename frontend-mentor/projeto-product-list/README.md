# Product List with Shopping Cart

![Project Design Preview](./design/active-states.jpg)

## Overview

This project is a visually appealing, fully interactive product listing page with a functional shopping cart! It was a fantastic opportunity to enhance my JavaScript skills, especially in handling complex DOM manipulation and dynamic updates.

## Project Highlights

Creating this product list and cart was both challenging and rewarding, as it pushed me to apply JavaScript concepts at a deeper level, specifically in DOM manipulation. I made extensive use of **event delegation** and **DOM traversal** to manage dynamic elements and update their states effectively. Due to the use of `insertAdjacentHTML`, many elements weren’t directly accessible by traditional selectors like `document.querySelector`. To solve this, I had to work with `event delegation` and `closest` methods, navigating through parent-child relationships to interact with specific elements in real-time.

## Key Features

- **Add Items to Cart:** Products can be easily added to the cart by clicking an "Add to Cart" button, dynamically updating the cart's contents.
  
- **Adjust Item Quantities:** Users can increase or decrease quantities for items in their cart, with real-time updates on total costs.
  
- **Remove Items from Cart:** Items can be removed from the cart, and the displayed cart total will update instantly.

- **Responsive Layout:** This project is fully responsive, providing an intuitive and consistent user experience across devices, from mobile screens to desktops.

## Technologies and Techniques

- **HTML5 & CSS3**
- **JavaScript**: Leveraged for advanced DOM manipulation, event delegation, and state management.
- **Responsive Design**: Made use of CSS properties like `display`, `position`, and flex/grid layouts for a smooth, adaptable user experience.
- **Problem Solving**: Utilized knowledge from previous projects to tackle layout adjustments and ensure everything functioned smoothly.

## Challenges and Solutions

- **DOM Traversing & Event Delegation:** Managing dynamically inserted elements required `event delegation` to listen for user actions, as well as `DOM traversing` to select and modify specific elements.
- **Real-Time Cart Updates:** Ensuring the cart reflects real-time changes was crucial, particularly with updating quantities and total costs as items were added, updated, or removed.
  
## Acknowledgments

Design provided by [Frontend Mentor](https://www.frontendmentor.io/).

## Usage

1. Clone this repository to your local machine:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project folder:
    ```bash
    cd project-folder
    ```

3. Open `index.html` in your browser to explore the interactive product list and shopping cart.


## Enjoy shopping! 😊