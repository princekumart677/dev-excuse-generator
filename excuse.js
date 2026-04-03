(function (root) {
  const app = (root.ExcuseApp = root.ExcuseApp || {});
  const isNode = typeof module !== "undefined" && module.exports;
  const excuseParts = isNode ? require("./excuse-parts").excuseParts : app.excuseParts;
  const createExcuseGenerator = isNode
    ? require("./excuse-generator").createExcuseGenerator
    : app.createExcuseGenerator;

  const generateExcuse = createExcuseGenerator(excuseParts);

  if (isNode) {
    module.exports = {
      generateExcuse,
    };
  }

  app.generateExcuse = generateExcuse;
})(typeof globalThis !== "undefined" ? globalThis : this);
