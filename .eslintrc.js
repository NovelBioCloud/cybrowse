module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"installedESLint": true,
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		}
	},
	"plugins": [
        "react"
    ],
	"rules": {
		"indent": [
            "error",
            "tab"
        ],
		"linebreak-style": [
            "error",
            "unix"
        ],
		"quotes": [
            "error",
            "double"
        ],
		"semi": [
            "error",
            "always"
        ]
	}
};
