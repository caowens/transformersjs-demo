import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.3.0';

const longTextInput = document.getElementById('long-text-input');
const generateButton = document.getElementById('generate-button');
const output = document.getElementById('output-div');
const spinner = document.getElementById('spinner');

const sentiment = await pipeline(
    'text-classification', // task
    'Xenova/distilbert-base-uncased-finetuned-sst-2-english' // model
);

generateButton.removeAttribute('disabled');

generateButton.addEventListener('click', async () => {
    spinner.classList.add('show');
    generateButton.setAttribute("disabled", true);

    const input = longTextInput.value;
    const result = await sentiment(input, {
        min_length: 50, max_length: 250,
    });

    output.innerHTML = result[0].label;
    console.log(result);
    spinner.classList.remove('show');
    generateButton.removeAttribute("disabled");
    output.style.display = 'block';
});