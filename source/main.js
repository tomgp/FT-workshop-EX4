'use strict';
var d3 = require('d3');
//make an svg which responds to the location of a users click

//create the 'main' vis
d3.select('.app')
	.append('svg')
		.attr({
			width  : 500,
			height : 500,
			'class' : 'main-vis'
		})
	.on('click', function(){
		d3.select(this).selectAll('circle')
			.data([{
				x:d3.mouse(this)[0],
				y:d3.mouse(this)[1]
			}])
				.enter()
			.append('circle');
		
		d3.select(this).selectAll('circle').attr({
			cx:function(d){return d.x},
			cy:function(d){return d.y},
			r:20
		});

	});

//create the 'y' vis

d3.select('.app')
	.append('svg')
		.attr({
			width:100,
			height:500,
			'class':'y-vis'
		})
	.on('click', function(){
		d3.select(this).selectAll('g')
			.data([{
				x:d3.mouse(this)[0],
				y:d3.mouse(this)[1]
			}])
				.enter()
			.append('g')
			.append('use')
				.attr('xlink:href','graphics/arrows.svg#left');
		
		d3.select(this).selectAll('g').attr({
			'transform':function(d){
				return 'translate(0,'+(d.y-50)+')'}
		});
	})

//the 'y' vis
d3.select('.app')
	.append('svg')
		.attr({
			width:500,
			height:100,
			'class':'x-vis'
		})
	.on('click', function(){
		d3.select(this).selectAll('g')
			.data([{
				x:d3.mouse(this)[0],
				y:d3.mouse(this)[1]
			}])
				.enter()
			.append('g')
			.append('use')
				.attr('xlink:href','graphics/arrows.svg#up');
		
		d3.select(this).selectAll('g').attr({
			'transform':function(d){
				return 'translate('+(d.x-50)+',0)'}
		});
	})