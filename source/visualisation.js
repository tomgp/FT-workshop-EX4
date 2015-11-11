var d3 = require('d3');

module.exports = {
	iceCream:iceCream,
	verticalLocator:verticalLocator,
	horizontalLocator:horizontalLocator
};

function iceCream(parent, model){
	parent.append('svg')
		.attr({
			width  : 500,
			height : 500,
			'class' : 'main-vis'
		})
		.on('click', function(){
			model.set({
				x:d3.mouse(this)[0],
				y:d3.mouse(this)[1]
			});
		});

	function drawMainVis(model){
		var mainVis = parent.select('.main-vis');

		mainVis.selectAll('use')
			.data([model])
				.enter()
			.append('g')
			.append('use')
				.attr('xlink:href','graphics/arrows.svg#icecream');
		
		mainVis.selectAll('g').attr({
			transform:function(d){ return 'translate(' + (d.x-50) + ',' +(d.y-50)+')' }
		});
	}

	model.dispatch.on('change.icecream', drawMainVis);
}


//create the 'y' vis

function verticalLocator(parent, model){
	parent.append('svg')
			.attr({
				width:100,
				height:500,
				'class':'y-vis'
			})
		.on('click', function(){
			model.set({
				y:d3.mouse(this)[1]
			});
		});

	model.dispatch.on('change.y', drawYVis);
	function drawYVis(model){
		var yVis = parent.select('.y-vis');

		yVis.selectAll('g')
			.data([model])
				.enter()
			.append('g')
			.append('use')
				.attr('xlink:href','graphics/arrows.svg#left');
		
		yVis.selectAll('g').attr({
			'transform':function(d){
				return 'translate(0,'+(d.y-50)+')'}
		});
	};
}


//the 'x' vis

function horizontalLocator(parent, model){
	parent.append('svg')
		.attr({
			width:500,
			height:100,
			'class':'x-vis'
		})
		.on('click', function(){
			model.set({
				x:d3.mouse(this)[0]
			});
		});

	model.dispatch.on('change.x', drawXVis);

	function drawXVis(model){
		var xVis = parent.select('.x-vis');

		xVis.selectAll('g')
			.data([model])
				.enter()
			.append('g')
			.append('use')
				.attr('xlink:href','graphics/arrows.svg#up');
		
		xVis.selectAll('g').attr({
			'transform':function(d){
				return 'translate('+(d.x-50)+',0)'}
		});
	};
}