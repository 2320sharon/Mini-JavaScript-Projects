// Select the elements we are going to need

const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    console.log("drag started");
    draggable.classList.add("dragging");
  });
  // When dragend event occurs remove the dragging class from the
  // draggable Element
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (event) => {
    console.log("drag over occurred");
    // By default there is a do not allow symbol displayed when dragging
    // this line of code removes that
    event.preventDefault();
    // Pass in the current container being dragged over and the event's Y position
    const afterElement = getDragAfterElement(container, event.clientY);
    console.log(afterElement);

    // Only 1 element will have the dragging class at a time so use querySelector
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      // This will add the draggable to the container we are hovering over
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

draggables.forEach((draggable) => {
  draggable.style.border = "3px solid #4287f5";
  console.log("Please tell me this worked");
});

function getDragAfterElement(container, mouseY) {
  // Returns the mouse position of whatever element our mouse is directly after
  // By default the element is appended to the end of the container, this modifies that behavior
  // container.querySelectorAll("draggable:not(.dragging)");
  // This will get every element we are not currently dragging
  // By default querySelectorAll does not return an array so use the
  //  spread operator(...) to turn it into an array
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const bbox = child.getBoundingClientRect();
      // center of child is top - height
      const offset = mouseY - bbox.top - bbox.height;
      // Above element = postive numbers and below element = negative
      // Above element =  numbers and below element = positive
      // only care about negative offsets because that means we are above an element
      // if offset is is close to 0 it means it is very close to an element
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
  // Return the element that was closest not the offset
}
