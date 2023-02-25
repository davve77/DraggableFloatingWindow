
class Draggable {
    /**
     * The element that was passed to the constructor.
     */
    #targetElement;

    /**
     * Creates a new DFW instance.
     * @param {HTMLElement} targetElement The element you wish to make draggable.
     */
    constructor(targetElement) {
        this.#targetElement = targetElement;
    }

    /**
     * Loads DFW.
     * @param {number} constraintGap The gap between the end of the document and your element.
     */
    load(constraintGap) {
        let isDragReady;
        let offsetX;
        let offsetY;

        const dragOffset = {};

        Draggable.event(this.#targetElement, 'mousedown', e => {
            isDragReady = true;
            document.body.style['userSelect'] = 'none';

            offsetX = e.pageX || e.clientX + window.scrollX;
            offsetY = e.pageY || e.clientY + window.scrollY;

            dragOffset.x = offsetX - this.#targetElement.offsetLeft;
            dragOffset.y = offsetY - this.#targetElement.offsetTop;
        });

        Draggable.event(document, 'mouseup', () => {
            isDragReady = false;
            document.body.style['userSelect'] = 'auto';
        });

        Draggable.event(document, 'mousemove', e => {
            if (!isDragReady) return;

            const height = parseInt(getComputedStyle(this.#targetElement).height);
            const width = parseInt(getComputedStyle(this.#targetElement).width);
            const gap = constraintGap ?? 8;

            offsetX = e.pageX || e.clientX + document.documentElement.scrollLeft;
            offsetY = e.pageY || e.clientY + document.documentElement.scrollTop;

            // Left and right constraint
            if (e.pageX - dragOffset.x < gap) {
                offsetX = gap;
            } else if (e.pageX - dragOffset.x + width > document.body.clientWidth - gap) {
                offsetX = document.body.clientWidth - width - gap;
            } else {
                offsetX = e.pageX - dragOffset.x;
            }

            // Top and bottom constraint   
            if (e.pageY - dragOffset.y < gap) {
                offsetY = gap;
            } else if (e.pageY - dragOffset.y + height > window.innerHeight - gap) {
                offsetY = window.innerHeight - height - gap;
            } else {
                offsetY = e.pageY - dragOffset.y;
            }

            Object.assign(this.#targetElement.style, {
                top: `${offsetY}px`,
                left: `${offsetX}px`
            });
        });

        Draggable.event(document, 'mousewheel', () => {
            isDragReady = false;
        });

        if (!/fixed|absolute/.test(getComputedStyle(this.#targetElement).position))
            this.#targetElement.style.position = 'fixed';
    }

    /**
     * Adds an event listener to a specific element.
     */
    static event(elm, event, func) {
        document.attachEvent ? elm.attachEvent('on' + event, func) : elm.addEventListener(event, func);
    }
}

// More methods (and functionality) coming soon.