let dictionary = ["whoops", "loops", "oops", "hops", "top", "hop", "tops", "loop", "mop", "cop", "roof", "tooth", "coop"];

function handleWord(word, node)
{
	let distance = DLDistance(node.word, word);
	if(node.children[distance])
	{
		handleWord(word, node.children[distance]);
	}
	else
	{
		node.children[distance] = {
			word: word,
			children: {}
		};
	}
}

function generateTree(words)
{
	let node;
	for(let word of words)
	{
		if(node == undefined)
		{
			node = {
				word: word,
				children: {}
			};
			tree = node;
		}
		else 
		{
			handleWord(word, node);
		}
	}
	return node;
}

function findWord(word, tolerance, tree)
{
	let node_word = tree.word;
	let distance = DLDistance(node_word, word);
	let words = [];
	for(let i = distance - tolerance; i <= distance + tolerance; i++)
	{
		let child = tree.children[i];
		if(child == undefined)
		{
			continue;
		}

		let child_distance = DLDistance(child.word, word);
		if(child_distance <= tolerance)
		{
			words.push({
				word:child.word,
				distance: child_distance
			});
		}

		let newWords = findWord(word, tolerance, child);
		words = words.concat(newWords);
	}

	return words;
}

let bktree;

function spellCheckWord(word)
{
	let words = findWord(word, 5, bktree);
	words.sort((a,b) => a.distance - b.distance);
	console.log(words);
	console.log("Did you mean:");
	console.log(words[0]);
	console.log(words[1]);
	console.log(words[2]);
}


function setup() {
	bktree = generateTree(dictionary);
	spellCheckWord("op");
}


function draw() {
	
}