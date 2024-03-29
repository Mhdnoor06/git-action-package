import React, { useEffect, useState } from "react";
import "./Magnifier.css"; // Ensure your CSS rules are in this file

const SCALE = 1.3; // Magnification
const SIZE = 150; // Diameter
const LENSE_OFFSET_X = SIZE / 10.2;
const LENSE_OFFSET_Y = SIZE / 10.2;

function MagnifierComponent() {
  useEffect(() => {
    // Apply initial CSS custom properties
    document.documentElement.style.setProperty("--scale", SCALE);
    document.documentElement.style.setProperty("--size", `${SIZE}px`);
  }, []);

  const addMagnifyingGlass = () => {
    const handleElement = document.createElement("div");
    handleElement.classList.add("handle");

    const magnifyingGlass = document.createElement("div");
    magnifyingGlass.classList.add("magnifying-glass");
    magnifyingGlass.style.top = `${LENSE_OFFSET_Y}px`;
    magnifyingGlass.style.left = `${LENSE_OFFSET_X}px`;

    const bodyClone = document.body.cloneNode(true);
    bodyClone.classList.add("body-clone");
    bodyClone.style.top = "0px";
    bodyClone.style.left = "0px";

    magnifyingGlass.append(bodyClone);
    handleElement.append(magnifyingGlass);
    document.body.append(handleElement);

    const moveMagnifyingGlass = (event) => {
      let pointerX, pointerY;

      // Check if it's a touch event
      if (event.type === "touchmove") {
        // Prevent the default touch action, e.g., scrolling
        event.preventDefault();
        pointerX = event.touches[0].pageX;
        pointerY = event.touches[0].pageY;
      } else {
        pointerX = event.pageX;
        pointerY = event.pageY;
      }

      handleElement.style.left = `${pointerX - SIZE / 1.7}px`;
      handleElement.style.top = `${pointerY - SIZE / 1.7}px`;

      if (magnifyingGlass.children[0]) {
        let offsetX = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerX * SCALE;
        let offsetY = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerY * SCALE;
        magnifyingGlass.children[0].style.left = `${offsetX}px`;
        magnifyingGlass.children[0].style.top = `${offsetY}px`;
      }
    };

    // Listen for both pointer and touch events
    document.addEventListener("pointermove", moveMagnifyingGlass);
    document.addEventListener("touchmove", moveMagnifyingGlass, {
      passive: false,
    });

    const removeMagnifyingGlass = () => {
      magnifyingGlass.children[0]?.remove();
      handleElement.remove();
      document.removeEventListener("pointermove", moveMagnifyingGlass);
      document.removeEventListener("touchmove", moveMagnifyingGlass);
    };

    magnifyingGlass.addEventListener("dblclick", removeMagnifyingGlass);
  };

  return (
    <div className="wrapper">
      <button id="magnify" onClick={addMagnifyingGlass}>
        Magnify
      </button>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
        cupiditate molestiae, vero eos deserunt facilis asperiores error eveniet
        corrupti. Autem vero saepe repellat voluptatum, fugiat alias nobis
        aperiam, dolor ea libero eum iure minima consectetur veniam doloribus
        consequatur molestias? Soluta labore molestias veniam sapiente
        consequuntur voluptate atque, odio illo nostrum vero ullam dolorum,
        architecto nemo. Esse numquam explicabo hic nemo sed blanditiis. Vero
        sed, nobis, consequuntur vel aliquam perferendis obcaecati facilis odio
        totam deleniti, sint numquam voluptates sunt! Dolores, vitae eligendi
        porro fuga dolore voluptatibus debitis quos recusandae nulla. Nobis?
      </p>
    </div>
  );
}

export default MagnifierComponent;
