var width = 60,
	height = 60,
	offset = 10;

function Tile( number ){
	this.number = number;
	this.x;
	this.y;
	
	this.view = Ti.UI.createView({
		backgroundColor: number < 16 ? 'pink' : 'transparent',
		width: width,
		height: height,
		tile: this
	});
	var label = Ti.UI.createLabel({
		text: number,
		left: 3, top: 3, color:"#fff",
		font: { fontSize: 18 },
		tile: this
	});
	if (this.number < 16){
		this.view.add(label);
	}
};

Tile.prototype.moveTo = function(x,y) {
	this.view.left = (x * width) + (x * offset);
	this.view.top = (y * height) + (y * offset);
	this.x = x;
	this.y = y;
};

Tile.prototype.animateTo = function(x, y){
	var animation = Ti.UI.createAnimation();	
	if (x != this.x){
		animation.left = (x * width) + (x * offset);
	} else{
		animation.top = (y * width) + (y * offset);
	}
	this.view.animate(animation);
	this.x = x;
	this.y =y;
};

module.exports = Tile;