module.exports = {
  parser: "babel-eslint",
  extends: ["standard", "standard-react"],
  rules: {
    "comma-dangle": [2, "always-multiline"],
    "react/no-unused-prop-types": "warn",
    "no-unused-vars": "warn",
  },
}
