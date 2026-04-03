(function (root) {
  const app = (root.ExcuseApp = root.ExcuseApp || {});
  const isNode = typeof module !== "undefined" && module.exports;
  const defaultGenerateExcuse = isNode
    ? require("./excuse").generateExcuse
    : app.generateExcuse;

  function initExcuseApp({
    outputElement,
    generateButton,
    copyButton,
    statusElement,
    generateExcuse = defaultGenerateExcuse,
    writeToClipboard = defaultWriteToClipboard,
  }) {
    renderExcuse(outputElement, generateExcuse);

    if (generateButton && typeof generateButton.addEventListener === "function") {
      generateButton.addEventListener("click", () => {
        renderExcuse(outputElement, generateExcuse);
      });
    }

    if (copyButton && typeof copyButton.addEventListener === "function") {
      copyButton.addEventListener("click", async () => {
        await writeToClipboard(outputElement.textContent);

        if (statusElement) {
          statusElement.textContent = "Excuse copied to clipboard.";
        }
      });
    }
  }

  function startExcuseApp(doc = root.document, options = {}) {
    if (!doc) {
      return;
    }

    const outputElement = doc.getElementById("excuseOutput");
    const generateButton = doc.getElementById("generateButton");
    const copyButton = doc.getElementById("copyButton");
    const statusElement = doc.getElementById("copyStatus");

    return initExcuseApp({
      outputElement,
      generateButton,
      copyButton,
      statusElement,
      ...options,
    });
  }

  function renderExcuse(outputElement, generateExcuse) {
    outputElement.textContent = generateExcuse();
  }

  function defaultWriteToClipboard(text) {
    return root.navigator.clipboard.writeText(text);
  }

  if (isNode) {
    module.exports = {
      initExcuseApp,
      startExcuseApp,
    };
  }

  app.initExcuseApp = initExcuseApp;
  app.startExcuseApp = startExcuseApp;

  if (!isNode && root.document) {
    startExcuseApp(root.document);
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
