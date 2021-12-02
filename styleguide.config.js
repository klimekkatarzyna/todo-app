module.exports = {
	propsParser: require('react-docgen-typescript').parse,
	ignore: [
		'**/*.spec.js',
		'**/components/Sidebar.tsx',
		'**/components/Board.tsx',
		'**/components/CreateGroup.tsx',
		'**/components/CreateListItem.tsx',
		'**/components/MainList/MainList.tsx',
	],
};
