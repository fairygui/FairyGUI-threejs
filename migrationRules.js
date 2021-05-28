// #Migration see https://github.com/mrdoob/three.js/wiki/Migration-Guide
const currentVersion = "116"
const rules = {
    "123": [
        {
            type: "string",
            pattern: ".inverse()",
            replacement: ".invert()"
        },
        {
            type: "regex",
            pattern:".getInverse\\(([^]+?)\\);",
            replacement: ".copy($1).invert();"
        }
    ]
};

const getMigrationRules = (version, rules) => {
    let rule = [];
    for (let key in rules) {
        if (+key >= +version) {
            rule.push(...rules[key]);
        }
    }
    return rule;
}
module.exports = getMigrationRules(currentVersion, rules);