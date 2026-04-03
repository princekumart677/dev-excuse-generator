(function (root) {
  const app = (root.ExcuseApp = root.ExcuseApp || {});

  function createExcuseGenerator(parts, randomIndex = defaultRandomIndex) {
    validateParts(parts);

    return function generateExcuse() {
      const subject = pickRandom(parts.subjects, randomIndex);
      const verb = pickRandom(parts.verbs, randomIndex);
      const object = pickRandom(parts.objects, randomIndex);

      return `${subject} ${verb} ${object}.`;
    };
  }

  function pickRandom(items, randomIndex) {
    return items[randomIndex(items.length)];
  }

  function defaultRandomIndex(length) {
    return Math.floor(Math.random() * length);
  }

  function validateParts(parts) {
    const requiredKeys = ["subjects", "verbs", "objects"];

    requiredKeys.forEach((key) => {
      if (!Array.isArray(parts[key]) || parts[key].length === 0) {
        throw new Error(`Expected "${key}" to be a non-empty array.`);
      }
    });
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      createExcuseGenerator,
    };
  }

  app.createExcuseGenerator = createExcuseGenerator;
})(typeof globalThis !== "undefined" ? globalThis : this);
