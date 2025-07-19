//Use of this code is subject to the licence agreement on github
//
//DISCLAIMER: This software is provided "as is", without warranty of any kind.
//Use at your own risk.
// Main script begins once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Spacing parameters for drawing lines between elements
    const verticalSpacing = 20;
    const leftSideSpacing = 30;
    const rightSideSpacing = 30;

    // Set up SVG canvas dimensions and clear its contents
    function adjustSvgCanvas(svg) {
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.innerHTML = '';
    }

    // Returns edge coordinates for connecting elements
    function getElementEdgePoints(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: { x: rect.left + window.scrollX, y: rect.top + rect.height / 2 + window.scrollY },
            right: { x: rect.right + window.scrollX, y: rect.top + rect.height / 2 + window.scrollY },
            top: { x: rect.left + rect.width / 2 + window.scrollX, y: rect.top + window.scrollY },
            bottom: { x: rect.left + rect.width / 2 + window.scrollX, y: rect.bottom + window.scrollY }
        };
    }

    // Draw a line between two points in the SVG
    function drawLine(svg, x1, y1, x2, y2) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "2");
        svg.appendChild(line);
    }

    // Connect two elements with a line, with optional horizontal offset
    function connectElements(svg, el1, el2, offset = 0) {
        const pos1 = getElementEdgePoints(el1);
        const pos2 = getElementEdgePoints(el2);

        if (offset !== 0) {
            drawLine(svg, pos1.right.x + offset, pos1.right.y, pos2.left.x - offset, pos2.left.y);
        } else {
            drawLine(svg, pos1.right.x, pos1.right.y, pos2.left.x, pos2.left.y);
        }
    }

    // Redraws all SVG connections for a diagram
    function drawDiagramLines(container) {
        const svgCanvas = container.querySelector(".svgCanvas");
        if (!svgCanvas) return;
        svgCanvas.innerHTML = '';

        const causes = Array.from(container.querySelectorAll(".causes .row"));
        const recoveries = Array.from(container.querySelectorAll(".consequences .row"));
        const topEvent = container.querySelector(".top-event-box");
        const hazard = container.querySelector(".hazard");

        // Connect top event to hazard
        if (topEvent && hazard) {
            const topEventPos = getElementEdgePoints(topEvent);
            const hazardPos = getElementEdgePoints(hazard);
            drawLine(svgCanvas, topEventPos.bottom.x, topEventPos.bottom.y, hazardPos.top.x, hazardPos.top.y + verticalSpacing);
        }

        // Connect causes to controls and hazard
        causes.forEach(row => {
            const cause = row.querySelector(".item");
            const controls = Array.from(row.querySelectorAll(".item")).slice(1);

            if (controls.length > 0) {
                controls.forEach((control, index) => {
                    if (index === 0) {
                        connectElements(svgCanvas, cause, control, leftSideSpacing);
                    } else {
                        connectElements(svgCanvas, controls[index - 1], control);
                    }
                });
                connectElements(svgCanvas, controls[controls.length - 1], hazard);
            } else {
                connectElements(svgCanvas, cause, hazard);
            }
        });

        // Connect hazard to recovery controls and consequences
        recoveries.forEach(row => {
            const controls = Array.from(row.querySelectorAll(".item")).slice(0, -1);
            const consequence = row.querySelector(".item:last-child");

            if (controls.length > 0) {
                controls.forEach((control, index) => {
                    if (index === 0) {
                        connectElements(svgCanvas, hazard, control);
                    } else {
                        connectElements(svgCanvas, controls[index - 1], control);
                    }
                });
                connectElements(svgCanvas, controls[controls.length - 1], consequence, rightSideSpacing);
            } else {
                connectElements(svgCanvas, hazard, consequence, rightSideSpacing);
            }
        });
    }

    // Update all diagrams on the page
    function processDiagrams() {
        const diagramContainers = document.querySelectorAll(".diagram-container");
        diagramContainers.forEach(drawDiagramLines);
    }

    // Dynamically position the tooltip to stay in the viewport
    function positionTooltip(icon, tooltip) {
        tooltip.style.visibility = 'hidden';
        tooltip.style.display = 'block';

        const iconRect = icon.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        // Horizontal placement: left or right side
        if (iconRect.left > window.innerWidth / 2) {
            tooltip.style.left = 'auto';
            tooltip.style.right = `${iconRect.width}px`;
        } else {
            tooltip.style.left = '0';
            tooltip.style.right = 'auto';
        }

        // Vertical placement: above or below the icon
        const spaceBelow = window.innerHeight - iconRect.bottom;
        const spaceAbove = iconRect.top;

        if (spaceBelow < tooltipRect.height && spaceAbove > tooltipRect.height) {
            tooltip.style.top = `-${tooltipRect.height}px`;
        } else {
            tooltip.style.top = `${iconRect.height}px`;
        }

        tooltip.style.visibility = 'visible';
        tooltip.style.display = 'block';
    }

    // Draw diagram on load
    processDiagrams();

    // Redraw diagrams on user interaction
    const container = document.querySelector(".container");
    container.addEventListener("scroll", processDiagrams);
    container.addEventListener("wheel", processDiagrams);
    window.addEventListener("resize", processDiagrams);

    // Tooltip display handlers
    const infoIcons = document.querySelectorAll('.info-icon');
    infoIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            let tooltip = icon.querySelector('.info-tooltip');

            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.className = 'info-tooltip';
                tooltip.innerText = icon.getAttribute('data-info');
                icon.appendChild(tooltip);
            }

            positionTooltip(icon, tooltip);
        });

        icon.addEventListener('mouseleave', function () {
            const tooltip = icon.querySelector('.info-tooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        });
    });

    // Data structure for storing notes
    const notesData = {};
    const extractNumber = document.querySelector('.btd-extractid-container').textContent.trim();

    // Export notes to a JSON file
    function saveNotes() {
        const dataStr = JSON.stringify(notesData, null, 4);
        const blob = new Blob([dataStr], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${extractNumber}_notes.json`;
        a.click();
    }

    document.querySelector(".save-all-notes").addEventListener("click", saveNotes);

    // Load notes from a JSON file
    function loadNotes(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const data = JSON.parse(event.target.result);
            for (const [key, value] of Object.entries(data)) {
                notesData[key] = value;
                const element = document.getElementById(key);
                if (element) {
                    element.setAttribute('data-note', value);
                    element.classList.add('has-note');
                    element.classList.remove('has-note-thick');
                }
            }
            processDiagrams();
        };
        reader.readAsText(file);
    }

    document.querySelector(".load-latest-notes").addEventListener("click", () => {
        document.getElementById("load-notes-file").click();
    });

    document.getElementById("load-notes-file").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            loadNotes(file);
        }
    });

    // Creates a modal dialog to edit notes for an element
    function createNotesDialog(element) {
        const dialog = document.createElement('div');
        dialog.classList.add('notes-dialog');

        const caption = document.createElement('div');
        caption.classList.add('caption');
        caption.textContent = element.id;
        dialog.appendChild(caption);

        const textarea = document.createElement('textarea');
        textarea.value = element.getAttribute('data-note') || '';
        dialog.appendChild(textarea);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        dialog.appendChild(saveButton);
        dialog.appendChild(cancelButton);

        // Save note and update state
        saveButton.addEventListener('click', () => {
            const note = textarea.value;
            element.setAttribute('data-note', note);
            notesData[element.id] = note;
            element.classList.add('has-note-thick');
            element.classList.remove('has-note');
            document.body.removeChild(dialog);
            window.removeEventListener('scroll', updateDialogPosition);
            window.removeEventListener('wheel', updateDialogPosition);
            window.removeEventListener('resize', updateDialogPosition);
        });

        // Cancel editing and close dialog
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(dialog);
            window.removeEventListener('scroll', updateDialogPosition);
            window.removeEventListener('wheel', updateDialogPosition);
            window.removeEventListener('resize', updateDialogPosition);
        });

        document.body.appendChild(dialog);

        // Keep dialog positioned near the target element
        function updateDialogPosition() {
            const elementRect = element.getBoundingClientRect();
            const dialogHeight = dialog.offsetHeight;
            const dialogWidth = dialog.offsetWidth;

            let left = elementRect.left + window.scrollX + (elementRect.width / 2) - (dialogWidth / 2);
            if (left + dialogWidth > window.innerWidth) {
                left = window.innerWidth - dialogWidth - 10;
            } else if (left < 10) {
                left = 10;
            }
            dialog.style.left = `${left}px`;
            dialog.style.top = `${elementRect.top + window.scrollY - dialogHeight - 10}px`;
        }

        updateDialogPosition();
        window.addEventListener('scroll', updateDialogPosition);
        window.addEventListener('wheel', updateDialogPosition);
        window.addEventListener('resize', updateDialogPosition);
    }

    // Attach double-click note editor to diagram elements
    const diagramElements = document.querySelectorAll('.item, .top-event-box, .hazard, .risk-summary');
    diagramElements.forEach(item => {
        item.addEventListener('dblclick', () => {
            createNotesDialog(item);
        });
    });
});
