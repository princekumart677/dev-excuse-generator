(function (root) {
  const app = (root.ExcuseApp = root.ExcuseApp || {});

  const excuseParts = {
    subjects: [
      "The deployment pipeline",
      "Our microservice architecture",
      "The legacy codebase",
    ],
    verbs: ["introduced", "triggered", "surfaced"],
    objects: [
      "a caching issue",
      "an unexpected race condition",
      "a production-only bug",
    ],
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      excuseParts,
    };
  }

  app.excuseParts = excuseParts;
})(typeof globalThis !== "undefined" ? globalThis : this);
