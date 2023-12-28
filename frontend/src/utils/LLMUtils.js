const { GoogleGenerativeAI } = require("@google/generative-ai");

const few_shot_prompt = `Question: 
Write an HTML snippet with this objective: write an app to calculate how many tennis balls can fill a room with given dimensions.

Write HTML snippet containing the title of the app, the description of what the app is doing and the calculations/methods/ equations used in this app. The result should be functioning. Do not write clickbait words. and make the Result very SEO Optimised. Use Tailwind CSS.

The snippet should start with <main> and end with </main>. It should also have a script tag to make the code functional. Return nothing else.


Answer:
<main class="max-w-screen-md mx-auto p-4 bg-white rounded border border-gray-300 mt-8">

    <header>
      <h1 class="text-3xl font-bold text-center mb-6">Tennis Ball Room Calculator</h1>
      <p class="text-center">
        Determine how many tennis balls are needed to fill a room based on its dimensions. This calculator estimates the number of tennis balls required for a given room size.
      </p>
    </header>

    <section class="my-6">
      <h2 class="text-2xl font-semibold mb-2">Calculation Method</h2>
      <p>
        This app uses the room's length, width, and height to calculate the room volume using the formula: Room Volume = Length × Width × Height.
      </p>
      <p>
        The standard volume of a tennis ball is approximately 0.0000575 cubic meters.
      </p>
      <p>
        Number of Tennis Balls = Room Volume / Volume of a Tennis Ball
      </p>
    </section>

    <section class="my-6">
      <h2 class="text-2xl font-semibold mb-2">Room Dimensions</h2>
      <label for="length" class="block mb-1">Length (in meters):</label>
      <input type="number" id="length" placeholder="Enter length" min="0" class="w-full py-2 px-3 mb-3 border border-gray-300 rounded">

      <label for="width" class="block mb-1">Width (in meters):</label>
      <input type="number" id="width" placeholder="Enter width" min="0" class="w-full py-2 px-3 mb-3 border border-gray-300 rounded">

      <label for="height" class="block mb-1">Height (in meters):</label>
      <input type="number" id="height" placeholder="Enter height" min="0" class="w-full py-2 px-3 mb-3 border border-gray-300 rounded">

      <button onclick="calculateTennisBalls()" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Calculate</button>
    </section>

    <section class="my-6">
      <h2 class="text-2xl font-semibold mb-2">Result</h2>
      <p id="result" class="font-bold"></p>
    </section>

    <script>
      function calculateTennisBalls() {
        const length = document.getElementById('length').value;
        const width = document.getElementById('width').value;
        const height = document.getElementById('height').value;

        const roomVolume = length * width * height;
        const ballVolume = 0.0000575; // Volume of a standard tennis ball in cubic meters
        const numberOfBalls = Math.floor(roomVolume / ballVolume);

        const resultElement = document.getElementById('result');
        resultElement.textContent = \`The room can hold approximately \${numberOfBalls} tennis balls.\`;
      }
    </script>

  </main>

Question:
Write an HTML snippet with this objective: Write an inflation calculator.

Write HTML snippet containing the title of the app, the description of what the app is doing and the calculations/methods/ equations used in this app. The result should be functioning. Do not write clickbait words. and make the Result very SEO Optimised. Use Tailwind CSS.

The snippet should start with <main> and end with </main>. It should also have a script tag to make the code functional. Return nothing else.

Answer:
<main class="max-w-screen-md mx-auto p-4 bg-white rounded border border-gray-300 mt-8">

  <header>
    <h1 class="text-3xl font-bold text-center mb-6">Inflation Calculator</h1>
    <p class="text-center">
      Calculate the inflation-adjusted value based on the initial amount, years, and inflation rate.
    </p>
  </header>

  <section class="my-6">
    <h2 class="text-2xl font-semibold mb-2">Calculation Method</h2>
    <p>
      This calculator estimates the future value of an amount considering inflation using the formula:
    </p>
    <p>
      Future Value = Present Value × (1 + Inflation Rate)^Number of Years
    </p>
  </section>

  <section class="my-6">
    <h2 class="text-2xl font-semibold mb-2">Inflation Calculator</h2>
    <label for="presentValue" class="block mb-1">Present Value:</label>
    <input type="number" id="presentValue" placeholder="Enter present value" min="0" step="any" class="w-full py-2 px-3 mb-3 border border-gray-300 rounded">

    <label for="years" class="block mb-1">Number of Years:</label>
    <input type="number" id="years" placeholder="Enter number of years" min="0" class="w-full py-2 px-3 mb-3 border border-gray-300 rounded">

    <label for="inflationRate" class="block mb-1">Annual Inflation Rate (%):</label>
    <input type="number" id="inflationRate" placeholder="Enter inflation rate" min="0" step="any" class="w-full py-2 px-3 mb-3 border border-gray-300 rounded">

    <button onclick="calculateInflation()" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Calculate</button>
  </section>

  <section class="my-6">
    <h2 class="text-2xl font-semibold mb-2">Result</h2>
    <p id="result" class="font-bold"></p>
  </section>

  <script>
    function calculateInflation() {
      const presentValue = parseFloat(document.getElementById('presentValue').value);
      const years = parseInt(document.getElementById('years').value);
      const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;

      const futureValue = presentValue * Math.pow((1 + inflationRate), years);

      const resultElement = document.getElementById('result');
      resultElement.textContent = \`The inflation-adjusted value after \${years} years will be approximately \${futureValue.toFixed(2)}.\`;
    }
  </script>

</main>


Question:
Write an HTML snippet with this objective: $human_prompt

Write HTML snippet containing the title of the app, the description of what the app is doing and the calculations/methods/ equations used in this app. The result should be functioning. Do not write clickbait words. and make the Result very SEO Optimised. Use Tailwind CSS.

The snippet should start with <main> and end with </main>. It should also have a script tag to make the code functional. Return nothing else.

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
