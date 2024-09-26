const colorPicker = document.getElementById('colorPicker');
const formatText = document.getElementById('formatText');
const copyButton = document.getElementById('copyButton');
const errorMessage = document.getElementById('error-message');

function updateColor() {
    const color = colorPicker.value;
    const r = (parseInt(color.slice(1, 3), 16) / 255).toFixed(2);
    const g = (parseInt(color.slice(3, 5), 16) / 255).toFixed(2);
    const b = (parseInt(color.slice(5, 7), 16) / 255).toFixed(2);

    formatText.value = `${r}, ${g}, ${b}`;
    errorMessage.textContent = '';
}

colorPicker.addEventListener('input', updateColor);

function validateFormat(format) {
    const regex = /^([01]|0\.\d+|1(\.0+)?)\s*,\s*([01]|0\.\d+|1(\.0+)?)\s*,\s*([01]|0\.\d+|1(\.0+)?)$/;
    return regex.test(format);
}

function updatePreviewColor() {
    const format = formatText.value.trim();
    if (validateFormat(format)) {
        const [r, g, b] = format.split(',').map(val => parseFloat(val.trim()));
        const color = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
        colorPicker.value = colorToHex(color);
        errorMessage.textContent = '';
    } else {
        errorMessage.textContent = 'Formato Inválido';
    }
}

function colorToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function sanitizeInput(event) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9.,]/g, '');
}

formatText.addEventListener('input', sanitizeInput);
formatText.addEventListener('input', updatePreviewColor);

copyButton.addEventListener('click', () => {
    const textToCopy = formatText.value.trim();
    if (validateFormat(textToCopy)) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Color de formato copiado: ' + textToCopy);
        }).catch(err => {
            console.error('Color de formato no copiado: ', err);
        });
    } else {
        alert('Color de formato no inválido');
    }
});
