// #Migration see https://github.com/mrdoob/three.js/wiki/Migration-Guide
const initalVersion = "116"; // fairygui启动时的three版本
const currentVersion = "134"; // 项目工程使用的three版本
const rules = {
    "123": [
        {
            type: "string",
            pattern: ".inverse()",
            replacement: ".invert()"
        },
        {
            type: "regex",
            pattern: ".getInverse\\(([^]+?)\\);",
            replacement: ".copy($1).invert();"
        }
    ]
};

const getMigrationRules = (version, rules) => {
    let rule = [];
    if (+currentVersion > +initalVersion) {
        for (let key in rules) {
            if (+key >= +version) {
                rule.push(...rules[key]);
            }
        }
    }
    return rule;
}

module.exports = getMigrationRules(currentVersion, rules);