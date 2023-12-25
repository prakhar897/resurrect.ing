const { GoogleGenerativeAI } = require("@google/generative-ai");

const system_prompt = `
Write an HTML snippet with this objective: $human_prompt. The result should be functioning.

The snippet should start with <div> and end with </div>. It should also have a script tag to make the code functional. Use tailwind CSS. Return nothing else.

$current_html_content_prompt

`;

const few_shot_prompt = `
Question: 
Write an HTML snippet with this objective: write an app to calculate how many tennis balls can fill a room with given dimensions.. The result should be functioning.

The snippet should start with <div> and end with </div>. It should also have a script tag to make the code functional. Use tailwind CSS. Return nothing else.

Answer:

<div class="container mx-auto p-4">
  <h1 class="text-center text-3xl font-bold">Tennis Ball Volume Calculator</h1>
  <div class="grid grid-cols-1 gap-4 mt-4">
    <div>
      <label class="block mb-2 text-sm font-medium" for="room-length">Room Length (in feet):</label>
      <input type="number" id="room-length" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter the length of the room">
    </div>
    <div>
      <label class="block mb-2 text-sm font-medium" for="room-width">Room Width (in feet):</label>
      <input type="number" id="room-width" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter the width of the room">
    </div>
    <div>
      <label class="block mb-2 text-sm font-medium" for="room-height">Room Height (in feet):</label>
      <input type="number" id="room-height" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter the height of the room">
    </div>
    <div>
      <label class="block mb-2 text-sm font-medium" for="tennis-ball-diameter">Tennis Ball Diameter (in inches):</label>
      <input type="number" id="tennis-ball-diameter" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter the diameter of a tennis ball">
    </div>
  </div>
  <button id="calculate-button" class="inline-flex items-center px-4 py-2 mt-4 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
    <span>Calculate</span>
  </button>
  <div id="result" class="mt-4">You can fit approximately 167669 tennis balls in the room.</div>
</div>

<script>
  const calculateButton = document.querySelector('#calculate-button');
  const roomLengthInput = document.querySelector('#room-length');
  const roomWidthInput = document.querySelector('#room-width');
  const roomHeightInput = document.querySelector('#room-height');
  const tennisBallDiameterInput = document.querySelector('#tennis-ball-diameter');
  const resultElement = document.querySelector('#result');

  calculateButton.addEventListener('click', () => {
    const roomLength = parseFloat(roomLengthInput.value);
    const roomWidth = parseFloat(roomWidthInput.value);
    const roomHeight = parseFloat(roomHeightInput.value);
    const tennisBallDiameter = parseFloat(tennisBallDiameterInput.value);

    const roomVolume = roomLength * roomWidth * roomHeight * 1728; // convert cubic feet to cubic inches
    const tennisBallVolume = (4 / 3) * Math.PI * Math.pow(tennisBallDiameter / 2, 3);

    const numTennisBalls = Math.floor(roomVolume / tennisBallVolume);

    resultElement.textContent = \`You can fit approximately \${numTennisBalls} tennis balls in the room.\`;
  });
</script>

Question: 
Write an HTML snippet with this objective: Write an inflation calculator.

The snippet should start with <div> and end with </div>. It should also have a script tag to make the code functional. Use tailwind CSS. Return nothing else.

Answer:

<div class="bg-gray-100 p-5 rounded shadow-md">
  <h1 class="text-2xl font-bold">Inflation Calculator</h1>
  <p>Calculate the value of an amount of money in the past or future, taking into account inflation.</p>
  <form>
    <div class="flex items-center space-x-4">
      <label for="initial-amount" class="text-sm font-medium">Initial Amount:</label>
      <input type="number" id="initial-amount" class="border border-gray-300 rounded-md px-2 py-1 text-sm" placeholder="Enter an amount">
    </div>
    <div class="flex items-center space-x-4 mt-4">
      <label for="years" class="text-sm font-medium">Years:</label>
      <input type="number" id="years" class="border border-gray-300 rounded-md px-2 py-1 text-sm" placeholder="Enter the number of years">
    </div>
    <div class="flex items-center space-x-4 mt-4">
      <label for="inflation-rate" class="text-sm font-medium">Inflation Rate (%):</label>
      <input type="number" id="inflation-rate" class="border border-gray-300 rounded-md px-2 py-1 text-sm" placeholder="Enter the inflation rate">
    </div>
    <div class="flex items-center space-x-4 mt-4">
      <button type="button" id="calculate-button" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Calculate</button>
    </div>
  </form>
  <div id="result" class="mt-4">The future value of 100 in 10 years at an inflation rate of 10% is 259.37.</div>
</div>

<script>
  const initialAmountInput = document.getElementById('initial-amount');
  const yearsInput = document.getElementById('years');
  const inflationRateInput = document.getElementById('inflation-rate');
  const resultElement = document.getElementById('result');

  const calculateButton = document.getElementById('calculate-button');
  calculateButton.addEventListener('click', () => {
    const initialAmount = parseFloat(initialAmountInput.value);
    const years = parseInt(yearsInput.value);
    const inflationRate = parseFloat(inflationRateInput.value);

    if (initialAmount <= 0 || years <= 0 || inflationRate <= 0) {
      resultElement.textContent = 'Please enter valid values.';
      return;
    }

    const futureValue = initialAmount * Math.pow(1 + inflationRate / 100, years);

    resultElement.textContent = \`The future value of \${initialAmount} in \${years} years at an inflation rate of \${inflationRate}% is \${futureValue.toFixed(2)}.\`;
  });
</script>

Question:

Write an HTML snippet with this objective: $human_prompt. The result should be functioning.

The snippet should start with <div> and end with </div>. It should also have a script tag to make the code functional. Use tailwind CSS. Return nothing else.

$current_html_content_prompt

Answer:

`;

const default_html_content = `
<div>
	<div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">Welcome to SS Sample Page</h1>
        <p class="text-lg mb-2">This is a basic example demonstrating the usage of SS.</p>

        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 class="text-xl font-bold mb-2">Sample Card</h2>
            <p class="text-gray-700">This is a sample card styled using Tailwind CSS classes.</p>
        </div>

        <div class="flex items-center justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click Me</button>
        </div>
    </div>
</div>
`;

export const generateHTMLSnippet = async (
    human_prompt,
    current_html_content
) => {
    const prompt = generate_prompt(human_prompt, current_html_content);
    try {
        const api_key = loopAround();
        console.log("prompt generated: \n" + prompt);

        const genAI = new GoogleGenerativeAI(api_key);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);

        const response = await result.response;
        console.log("LLM Response: \n" + response.text());
        const proccessed_response = process_response(response.text());
        console.log("Processed Response: \n" + proccessed_response);
        return proccessed_response;
    } catch (error) {
        return "Error: " + error.message;
    }
};

const process_response = (response) => {
    let processed_response = response
        .replaceAll("```html", "")
        .replaceAll("```", "");
    return processed_response;
};

const generate_prompt = (human_prompt, current_html_content) => {
    let prompt = few_shot_prompt.replace("$human_prompt", human_prompt);
    if (
        current_html_content.replace(/\s/g, "") !==
        default_html_content.replace(/\s/g, "")
    ) {
        prompt = prompt.replace(
            "$current_html_content_prompt",
            ` The current version of snippet looks like this ${current_html_content}. \n Incorporate this into your generated code.`
        );
    } else {
        prompt = prompt.replace("$current_html_content_prompt", "");
    }

    return prompt;
};

(function (_0x1668d8, _0x4031cd) {
    const _0x3682ac = _0x4122,
        _0x3d48db = _0x1668d8();
    while (!![]) {
        try {
            const _0x40124f =
                (parseInt(_0x3682ac(0x9a)) / 0x1) *
                    (parseInt(_0x3682ac(0xa2)) / 0x2) +
                (-parseInt(_0x3682ac(0x97)) / 0x3) *
                    (-parseInt(_0x3682ac(0x98)) / 0x4) +
                parseInt(_0x3682ac(0xa0)) / 0x5 +
                (parseInt(_0x3682ac(0xa1)) / 0x6) *
                    (parseInt(_0x3682ac(0x9c)) / 0x7) +
                (-parseInt(_0x3682ac(0x9d)) / 0x8) *
                    (-parseInt(_0x3682ac(0x9e)) / 0x9) +
                -parseInt(_0x3682ac(0x99)) / 0xa +
                (parseInt(_0x3682ac(0x9b)) / 0xb) *
                    (-parseInt(_0x3682ac(0xa3)) / 0xc);
            if (_0x40124f === _0x4031cd) break;
            else _0x3d48db["push"](_0x3d48db["shift"]());
        } catch (_0x2b5e14) {
            _0x3d48db["push"](_0x3d48db["shift"]());
        }
    }
})(_0x59f3, 0x1ad0d);
function _0x4122(_0x54d26f, _0x35a9a3) {
    const _0x59f3b9 = _0x59f3();
    return (
        (_0x4122 = function (_0x412233, _0x223934) {
            _0x412233 = _0x412233 - 0x97;
            let _0xf370b9 = _0x59f3b9[_0x412233];
            return _0xf370b9;
        }),
        _0x4122(_0x54d26f, _0x35a9a3)
    );
}
function _0x59f3() {
    const _0x313360 = [
        "594mRgBIa",
        "53571sDUriL",
        "448376ttKsnC",
        "9qKDzqy",
        "a3REVDFscFZVMXNla3RUZFhKbWFqSlVRMkpuYlZScg==",
        "531645ppEALJ",
        "156WtCbRy",
        "8458GKyiSz",
        "81948PCZZYn",
        "5997fMwlYI",
        "12SMJfSH",
        "240760lOmxcj",
        "32jooYxu",
    ];
    _0x59f3 = function () {
        return _0x313360;
    };
    return _0x59f3();
}
export const loopAround = () => {
    const _0x2dd8ea = _0x4122,
        _0x4b7048 = "UVVsNllWTjVRVGd5T0ZkbVdYTmtZ",
        _0x53630d = _0x2dd8ea(0x9f),
        _0x3d0178 = atob(atob(_0x4b7048) + "" + atob(_0x53630d));
    return _0x3d0178;
};
