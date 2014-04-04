var Tile = require('game/Tile'),
	_ = require('underscore')._;
	
function GameWindow(){
	var win = Ti.UI.createWindow({
		backgroundColor:"#eee"
	});	
	
	var gameView = Ti.UI.createView({
		left: 10, right: 10, top: 100, height: 400
	});
	
	var gameTitle = Ti.UI.createLabel({
		text: "Sixteens", top: 60,
		left: 10, right: 10, textAlign:'center',
		color:"#000", font: { fontSize: 24 },
	});
	win.add(gameTitle);
	
	var grid = [];
	
	
	var tileSwipeEvent = function( e ){
		var tile = e.source.tile;
		
		for (var i=0; i<grid.length; i++){
			for (var j=0; j<grid[i].length; j++){
				if (grid[i][j] != null && grid[i][j].number == tile.number){
					if (e.direction == "up"){
						swapTiles(i,j, i, j-1);
					} else if (e.direction == "down"){
						swapTiles(i, j, i, j+1);
					} else if (e.direction == "right"){
						swapTiles(i, j, i+1, j);
					} else if (e.direction == "left"){
						swapTiles(i, j, i-1, j);
					}
					checkWinner();
					return;
				}
			}
		}
	};
	
	var checkWinner = function(){
		var won = true,
			lastNumber = 0;
		for (var y=0; y<1; y++){
			for (var x=0; x<4; x++){
				if (grid[x][y] != null){
					if (grid[x][y].number-1 != lastNumber){
						return;
					}
					lastNumber = grid[x][y].number;
				}
			}
		}
		
		Ti.API.info("WE HAAVE A WINNER");
		
		
	};
	
	var swapTiles = function(x1,y1, x2, y2){
		if (grid[x2][y2] != null) return;
		grid[x1][y1].animateTo(x2, y2);
		grid[x2][y2] = grid[x1][y1];
		grid[x1][y1] = null;
	};
	
	
	var number = 0,
		max_tiles = 15,
		tiles = [];
	
	for (var i=0; i<max_tiles; i++){
		tiles.push(new Tile(i+1));
	}
	tiles.push(null);
	tiles = _.shuffle(tiles);
	
	for (var x=0; x<4; x++){
		grid[x] = [];
		for (var y=0; y<4; y++){
			grid[x][y] = null;
		};
	}
	
	for (var y=0; y<4; y++){
		for (var x=0; x<4; x++){
			grid[x][y] = tiles[number];
			if (grid[x][y] != null){
				grid[x][y].moveTo(x,y);
				gameView.add(grid[x][y].view);
				grid[x][y].view.addEventListener('swipe', tileSwipeEvent);
			}
			number++;
		}
	}
	
	
	
	
	// SHUFFLE
	gameTitle.addEventListener('click', function(){
		tiles = _.shuffle(tiles);
		var number = 0;
		for (var i=0; i<grid.length; i++){
			for (var j=0; j<grid[i].length; j++){
				grid[i][j] = null;
			}
		}
		
		for (var i=0; i<grid.length; i++){
			for (var j=0; j<grid[i].length; j++){
				grid[i][j] = tiles[number];
				if (grid[i][j] != null){
					(function(x,y){
						setTimeout(function(){
							grid[x][y].animateTo(x,y);	
						}, 300 * number);
					})(i,j);
					
				}
				number++;
			}
		}
	});
	
	
	
	win.add(gameView);
	return win;
};


module.exports = GameWindow;
