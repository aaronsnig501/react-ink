"use strict";
const React = require("react");
const { Box, Text } = require("ink");
const TextInput = require("ink-text-input").default;
const SelectInput = require("ink-select-input").default;
const globby = require("globby");
const fuzzaldrin = require("fuzzaldrin");
const openEditor = require("open-editor");

const App = () => {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [files, setFiles] = React.useState([]);

	React.useEffect(() => {
		globby(["**/*", "!node_modules"]).then((files) => {
			setFiles(files);
		});
	});

	const searchResults = fuzzaldrin.filter(files, searchQuery).map((file) => ({
		label: file,
		value: file,
	}));

	const handleSelect = (searchResult) => {
		openEditor([
			{
				file: searchResult.value,
				line: 1,
				column: 1,
			},
		]);
	};

	return (
		<Box flexDirection="column">
			<Box>
				<Text color="green">❯ </Text>
				<TextInput
					placeholder="Enter your search query..."
					value={searchQuery}
					onChange={setSearchQuery}
				/>
			</Box>

			<SelectInput limit={5} items={searchResults} onSelect={handleSelect} />
		</Box>
	);
};

module.exports = App;
