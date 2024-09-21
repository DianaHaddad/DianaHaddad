// Array of commands and their corresponding outputs
const commands = {
    "help": "Type 'education', 'experience', or 'skills' to know more.",
    "education": `
        Education:<br>
        - <b>Bachelor of Science in Architecture</b>, Jordan University of Science and Technology, Irbid - Jordan<br>
        - Graduated with a GPA of 3.47 (Very Good)
    `,
    "experience": `
        Work Experience:<br>
        1. <b>Architecture Teaching Assistant</b>, Jordan University of Science and Technology (2022-2024)<br>
        2. <b>Architectural Engineer</b>, Green Front for Engineering Services (2021-2023)<br>
        3. <b>Inspection and Test Plan Coordinator</b>, Jrl Aluminium Pty Ltd (2022-2023)<br>
        4. <b>Junior Architect</b>, Hazem Marji Design Office (2020-2021)
    `,
    "skills": `
        Skills:<br>
        - <b>AutoCAD, Revit, SketchUp, Rhino, Grasshopper</b><br>
        - Time Management, Teamwork, Creativity<br>
        - Leadership, Communication Skills
    `,
    "contact": `
        Contact:<br>
        Email: haddaddiana239@gmail.com<br>
        Phone: +962 7 7225 3517
    `,
    "clear": "cleared"
};

// Function to simulate typing text with HTML rendering
function typeText(element, html, speed = 25) {
    let index = 0;
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const content = tempDiv.childNodes;

    function typeNode() {
        if (index < content.length) {
            let currentNode = content[index].cloneNode(true);
            element.appendChild(currentNode);
            index++;
            setTimeout(typeNode, speed);
        }
    }

    typeNode();
}

// Main command handling logic
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        const input = this.value.toLowerCase();
        const outputDiv = document.getElementById('output');

        if (commands[input]) {
            if (input === 'clear') {
                outputDiv.innerHTML = '';
            } else {
                const newParagraph = document.createElement('p');
                outputDiv.appendChild(newParagraph);
                typeText(newParagraph, commands[input], 25);
            }
        } else {
            const errorParagraph = document.createElement('p');
            outputDiv.appendChild(errorParagraph);
            typeText(errorParagraph, `Command not found: ${input}`, 25);
        }

        this.value = '';
    }
});

// Help box functionality
const helpButton = document.getElementById('help-button');
const helpBox = document.getElementById('help-box');
const closeHelpButton = document.getElementById('close-help');

helpButton.addEventListener('click', function() {
    helpBox.style.display = 'block';
    helpButton.style.backgroundColor = "#ffcc00"; // Change button background when help is shown
});

closeHelpButton.addEventListener('click', function() {
    helpBox.style.display = 'none';
    helpButton.style.backgroundColor = "#00ff00"; // Reset button color when closed
});

// Make the help box draggable
dragElement(document.getElementById("help-box"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById("help-header");

    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
