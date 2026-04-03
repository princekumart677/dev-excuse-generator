const { initExcuseApp, startExcuseApp } = require("./script");

describe("initExcuseApp", () => {
  it("renders an excuse into the output element on startup", () => {
    const output = { textContent: "" };
    const button = {
      addEventListener: jest.fn(),
    };

    initExcuseApp({
      outputElement: output,
      generateExcuse: () => "The API gateway caused a rollback.",
      generateButton: button,
    });

    expect(output.textContent).toBe("The API gateway caused a rollback.");
  });

  it("renders a new excuse when the generate button is clicked", () => {
    const output = { textContent: "" };
    let clickHandler;
    const button = {
      addEventListener: jest.fn((eventName, handler) => {
        if (eventName === "click") {
          clickHandler = handler;
        }
      }),
    };
    const excuses = [
      "The API gateway caused a rollback.",
      "The feature flag triggered a hotfix.",
    ];
    const generateExcuse = jest.fn(() => excuses.shift());

    initExcuseApp({
      outputElement: output,
      generateExcuse,
      generateButton: button,
    });

    clickHandler();

    expect(output.textContent).toBe("The feature flag triggered a hotfix.");
  });

  it("copies the current excuse and shows a success message", async () => {
    const output = { textContent: "" };
    const generateButton = {
      addEventListener: jest.fn(),
    };
    const statusElement = { textContent: "" };
    let copyHandler;
    const copyButton = {
      addEventListener: jest.fn((eventName, handler) => {
        if (eventName === "click") {
          copyHandler = handler;
        }
      }),
    };
    const writeToClipboard = jest.fn(() => Promise.resolve());

    initExcuseApp({
      outputElement: output,
      generateButton,
      copyButton,
      statusElement,
      generateExcuse: () => "The API gateway caused a rollback.",
      writeToClipboard,
    });

    await copyHandler();

    expect(writeToClipboard).toHaveBeenCalledWith(
      "The API gateway caused a rollback."
    );
    expect(statusElement.textContent).toBe("Excuse copied to clipboard.");
  });
});

describe("startExcuseApp", () => {
  it("wires the app to page elements selected by id", () => {
    const outputElement = { textContent: "" };
    const generateButton = { addEventListener: jest.fn() };
    const documentLike = {
      getElementById: jest.fn((id) => {
        const elements = {
          excuseOutput: outputElement,
          generateButton,
        };

        return elements[id];
      }),
    };

    startExcuseApp(documentLike, {
      generateExcuse: () => "The CSS cascade caused a production incident.",
    });

    expect(documentLike.getElementById).toHaveBeenCalledWith("excuseOutput");
    expect(documentLike.getElementById).toHaveBeenCalledWith("generateButton");
    expect(outputElement.textContent).toBe(
      "The CSS cascade caused a production incident."
    );
  });
});
