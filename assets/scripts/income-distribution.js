// Path is relative to index.html
const distributionDataFilepaths = "data/income-distribution-data/country_filepaths.json";

/*
 * Generate layout
 */
d3.select("#income-distribution-viz")
	.attr("class", "gallery")
	.attr("id", "distributionviz")

d3.json(distributionDataFilepaths, filePaths => {
	filePaths.forEach(filePath => {
		countryCode = filePath.substr(-8, 3) + "distribution";
		countrySelector = "." + countryCode;
		d3.select("#distributionviz")
			.append("div")
			.attr("class", "gallery_chart " + countryCode);

		drawDistribution(countrySelector, filePath);
	});
});

/*
 * Draws inequality chart for the JSON file provided (dataPath) at the
 * selector provided.
 */
function drawDistribution(selector, dataPath) {
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
			.domain([0, d3.max(dataset, function(d) { return d3.max(d, function(d) { return d.y0 + d.y; });  })])
			.range([height, 0]);

		// Define colors
		var bottomBarColors = ["#D4D9B7", "#ffffff00", "#D4D9B7"];  // Same colour on both ends so that do not get orange halo around top of bars
		const barColors = [bottomBarColors[0], '#F5E193', '#EDC066', '#C48E42'];
		const lineColor = '#FAFCFA';  // Line color must match background color in CSS

		// Create groups for each series, rects for each segment 
		var groups = svg.selectAll("g")
			.data(dataset)
			.enter().append("g")
			.style("fill", function(d, i) { return bottomBarColors[i]; });

		var rect = groups.selectAll("rect")
			.data(function(d) { return d; })
			.enter()
			.append("rect")
			.attr("x", function(d) { return x(d.x); })
			.attr("y", function(d) { return y(d.y0 + d.y); })
			.attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
			.attr("width", x.rangeBand())

		const defs = svg.append("defs");

		const bgGradient = defs
			.append("linearGradient")
			.attr("id", "bg-gradient")
			.attr("gradientTransform", "rotate(90)");

		// Define bar colors in the most elegant way possible...
		bgGradient
			.append('stop')
			.attr('stop-color', barColors[0])
			.attr('offset', '19.5%');
		bgGradient
			.append('stop')
			.attr('stop-color', lineColor)
			.attr('offset', '19.5%');
		bgGradient
			.append('stop')
			.attr('stop-color', lineColor)
			.attr('offset', '20%');
		bgGradient
			.append('stop')
			.attr('stop-color', barColors[1])
			.attr('offset', '20%');
		bgGradient
			.append('stop')
			.attr('stop-color', barColors[1])
			.attr('offset', '39.5%');
		bgGradient
			.append('stop')
			.attr('stop-color', lineColor)
			.attr('offset', '39.5%');
		bgGradient
			.append('stop')
			.attr('stop-color', lineColor)
			.attr('offset', '40%');
		bgGradient
			.append('stop')
			.attr('stop-color', barColors[2])
			.attr('offset', '40%');
		bgGradient
			.append('stop')
			.attr('stop-color', barColors[2])
			.attr('offset', '59.5%');
		bgGradient
			.append('stop')
			.attr('stop-color', lineColor)
			.attr('offset', '59.5%');
		bgGradient
			.append('stop')
			.attr('stop-color', lineColor)
			.attr('offset', '60%');
		bgGradient
			.append('stop')
			.attr('stop-color', barColors[3])
			.attr('offset', '60%');

		const pairData = dataset[2];
		clipID = 'clip-bar-rects'.concat(selector.substr(1,3))
		defs
			.append('clipPath')
			.attr('id', clipID)
			.selectAll('bar')
			.data(pairData)
			.enter()
			.append('rect')
			.attr("x", function(d) { return x(d.x); })
			.attr("y", function(d) { return y(d.y0 + d.y); })
			.attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
			.attr("width", x.rangeBand());

		const clipPath = svg
			.append('g')
			.attr('clip-path', `url(#${clipID})`);

		clipPath
			.append('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height)
			.style('fill', 'url(#bg-gradient)');
	});
}