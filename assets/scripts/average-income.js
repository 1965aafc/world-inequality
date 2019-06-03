// Path is relative to index.html
const averageDataFilepaths = "data/average-income-data/country_filepaths.json";

/*
 * Generate layout
 */
d3.select("#average-income-viz")
	.attr("class", "gallery")
	.attr("id", "averageviz")

d3.json(averageDataFilepaths, filePaths => {
	filePaths.forEach(filePath => {
		countryCode = filePath.substr(-8, 3) + "average";
		countrySelector = "." + countryCode;
		d3.select("#averageviz")
			.append("div")
			.attr("class", "gallery_chart " + countryCode);

		drawAverage(countrySelector, filePath);
	});
});

/*
 * Draws inequality chart for the JSON file provided (dataPath) at the
 * selector provided.
 */
function drawAverage(selector, dataPath) {
	d3.json(dataPath, countryObject => {
		// Create SVG
		const svg = d3.select(selector)
			.append("svg")
			.attr("width", svgWidth + margin.left + margin.right)
			.attr("height", svgHeight + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		// Create title
		const countryName = countryObject.name;
		const titleColor = "#b0b0b0";
		svg.append("text")
			.attr("font-size", "12px")
			.attr("x", 19)
			.attr("y", -10)
			.style("fill", titleColor)
			.text(countryName);

		/*
		 * Data organization and linear gradient code inspired by this example:
		 *   https://dev.to/chooblarin/d3js-chart-with-gradient-color-4j71
		 */
		// Reorganize data into layers
		const dataset = d3.layout.stack()(["bottom", "middle", "top"].map(layer => {
			return countryObject.data.map(d => {
				return {x: d.year, y: +d[layer]};
			});
		}));

		// Set x, y and colors
		const width = svgWidth;
		const height = svgHeight;
		var x = d3.scale.ordinal()
			.domain(dataset[0].map(function(d) { return d.x; }))
			.rangeRoundBands([10, width-10], 0.02);

		var y = d3.scale.linear()
			//.domain([0, d3.max(dataset, function(d) { return d3.max(d, function(d) { return d.y0 + d.y; });  })])
			.domain([0, 300000])
			.range([height, 0]);

		// Define colors
		var barColors = ["#D4D9B7", "#ffffff00", "#EDC066"];  // Same colour on both ends so that do not get orange halo around top of bars

		// Create groups for each series, rects for each segment 
		var groups = svg.selectAll("g.cost")
			.data(dataset)
			.enter().append("g")
			.attr("class", "cost")
			.style("fill", function(d, i) { return barColors[i]; });

		var rect = groups.selectAll("rect")
			.data(function(d) { return d; })
			.enter()
			.append("rect")
			.attr("x", function(d) { return x(d.x); })
			.attr("y", function(d) { return y(d.y0 + d.y); })
			.attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
			.attr("width", x.rangeBand())
	});
}