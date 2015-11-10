'use strict';
var d3 = require('d3');
//make an svg which responds to the location of a users click

function makeModel(){
	var model = {
		x:250, y:250
	}

	model.set = function(o){
		if(o.x) model.x = o.x;
		if(o.y) model.y = o.y;
		console.log('set', o);
	}

	return model;
}

var myModel = makeModel();

//create the 'main' vis
d3.select('.app')
	.append('svg')
		.attr({
			width  : 500,
			height : 500,
			'class' : 'main-vis'
		})
	.on('click', function(){
		myModel.set({
			x:d3.mouse(this)[0],
			y:d3.mouse(this)[1]
		});
		d3.select(this).selectAll('circle')
			.data([myModel])
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

		myModel.set({
			y:d3.mouse(this)[1]
		});

		d3.select(this).selectAll('g')
			.data([myModel])
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

		myModel.set({
			x:d3.mouse(this)[0]
		});

		d3.select(this).selectAll('g')
			.data([myModel])
			.enter()
			.append('g')
			.append('use')
				.attr('xlink:href','graphics/arrows.svg#up');
		
		d3.select(this).selectAll('g').attr({
			'transform':function(d){
				return 'translate('+(d.x-50)+',0)'}
		});
	})