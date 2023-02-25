const elementToDrag = document.querySelector('#drag');
const draggable = new Draggable(elementToDrag);

draggable.load();

// Or you can set a custom constraint gap like so
// draggable.load(24);