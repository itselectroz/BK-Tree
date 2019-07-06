/** 
 * Damerau-Levenshtein Distance with Adjacent Transpositions implementation.
 */

function DLDistance(a, b)
{
	let da = {};
	for(let c of a.split("").concat(b.split("")))
	{
		da[c] = 0;
	}

	let d = [];

	let maxdist = a.length + b.length;

	d[0] = [maxdist];

	for(let i = 0; i <= a.length; i++)
	{
		d[i + 1] = [maxdist, 1];
	}
	for(let j = 0; j <= b.length; j++)
	{
		d[0][j + 1] = maxdist;
		d[1][j + 1] = j;
	}

	for(let i = 1; i <= a.length; i++)
	{
		let db = 0;
		for(let j = 1; j <= b.length; j++)
		{
			let k = da[b[j-1]];
			let l = db;
			let cost;
			if(a[i-1] == b[j-1])
			{
				cost = 0;
				db = j;
			}
			else 
			{
				cost = 1;
			}

			d[i+1][j+1] = Math.min(d[i][j] + cost, d[i+1][j] + 1, d[i][j+1] + 1, d[k][l] + (i - k -1) + 1 + (j-l-1));
		}
		da[a[i-1]] = i;
	}
	return d[a.length + 1][b.length + 1]
}