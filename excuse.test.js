const { generateExcuse } = require("./excuse");
const { createExcuseGenerator } = require("./excuse-generator");

describe("generateExcuse", () => {
  it("returns a non-empty excuse string", () => {
    const excuse = generateExcuse();

    expect(typeof excuse).toBe("string");
    expect(excuse.length).toBeGreaterThan(0);
  });
});

describe("createExcuseGenerator", () => {
  it("builds an excuse from the selected phrase parts", () => {
    const parts = {
      subjects: ["The build server"],
      verbs: ["caused"],
      objects: ["a merge conflict"],
    };

    const generateDeterministicExcuse = createExcuseGenerator(parts, () => 0);

    expect(generateDeterministicExcuse()).toBe(
      "The build server caused a merge conflict."
    );
  });

  it("formats the excuse as a sentence with subject, verb, object, and period", () => {
    const parts = {
      subjects: ["CI"],
      verbs: ["broke"],
      objects: ["the release"],
    };

    const generateDeterministicExcuse = createExcuseGenerator(parts, () => 0);

    expect(generateDeterministicExcuse()).toMatch(/^CI broke the release\.$/);
  });

  it("throws when a required phrase group is empty", () => {
    const invalidParts = {
      subjects: [],
      verbs: ["caused"],
      objects: ["a merge conflict"],
    };

    expect(() => createExcuseGenerator(invalidParts)).toThrow(
      'Expected "subjects" to be a non-empty array.'
    );
  });
});
