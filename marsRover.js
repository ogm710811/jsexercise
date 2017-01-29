/*
We are sending a rover to Mars and we need to program
its movements so that we can send it commands from Earth.
*/

// create a grid of 10 x 10
grid = [
  ['.','.','.','.','.','.','.','.','.','.'],
	['.','.','.','.','.','.','.','.','.','.'],
	['.','.','.','.','.','.','.','*','.','.'],
	['.','.','*','.','.','.','.','.','.','.'],
	['.','.','.','.','.','.','.','.','.','.'],
	['.','.','.','.','.','.','.','.','.','.'],
	['.','.','.','.','.','.','*','.','.','.'],
	['.','.','.','.','.','.','.','.','.','.'],
	['*','.','.','.','.','.','.','.','.','.'],
	['.','.','.','.','.','.','.','.','.','.'],
	];

obstacles = [
	[8,0],
	[3,2],
	[6,6],
	[2,7],
];

// display grid on screen
for (var i = 0; i < grid.length; i++) {
	for (var j = 0; j < grid.length; j++) {
		document.write(grid[i][j] + " ");
	}
	document.write("<br/>");
}

// commands to send to myRover
commands = ["b", "f", "r", "l"];

// myRover object
var myRover = {
	position : [9,0],
	direction : "N"
};

/* Moves fordward the rover. */
function goFordward(rover) {
	switch(rover.direction) {
		case 'N': rover.position[0]--;
			break;
		case 'E': rover.position[1]++;
			break;
		case 'W': rover.position[1]--;
			break;
		case 'S': rover.position[0]++;
			break;
	}
}

/* Moves backward the rover. */
function goBack(rover) {
	switch(rover.direction) {
		case 'N': rover.position[0]++;
			break;
		case 'E': rover.position[1]--;
			break;
		case 'W': rover.position[1]++;
			break;
		case 'S': rover.position[0]--;
			break;
	}
}

/* Moves to the left the rover. */
function goLeft(rover) {
	switch(rover.direction) {
		case 'N': rover.position[1]--;
			break;
		case 'E': rover.position[0]--;
			break;
		case 'W': rover.position[0]++;
			break;
		case 'S': rover.position[1]++;
			break;
	}
}

/* Moves to the right the rover. */
function goRight(rover) {
	switch(rover.direction) {
		case 'N': rover.position[1]++;
			break;
		case 'E': rover.position[0]++;
			break;
		case 'W': rover.position[0]--;
			break;
		case 'S': rover.position[1]--;
			break;
	}
}

/* Changes the direction of the rover when commands
   are left or right */
function changeDirection(direction, command) {
	if (direction == 'N' && command == 'l') {
		myRover.direction = 'W';
	}
	else if (direction == 'N' && command == 'r') {
		myRover.direction = 'E';
	}
	else if (direction == 'E' && command == 'l') {
		myRover.direction = 'N';
	}
	else if (direction == 'E' && command == 'r') {
		myRover.direction = 'S';
	}
	else if (direction == 'W' && command == 'l') {
		myRover.direction = 'S';
	}
	else if (direction == 'W' && command == 'r') {
		myRover.direction = 'N';
	}
	else if (direction == 'S' && command == 'l') {
		myRover.direction = 'E';
	}
	else {
		myRover.direction = 'W';
	}
}

/* Checks the grid to verify if the rover is on the edge*/
function checkGrid(rover) {
	if ( 	rover.position[0] < 0 || rover.position[0] > 9 ) {
    if (rover.position[0] < 0) {
      myRover.position[0]++;
    }
    if (rover.position[0] > 9) {
      myRover.position[0]--;
    }
		return true;
	}
	else if (rover.position[1] < 0 || rover.position[1] > 9) {
    if (rover.position[1] < 0) {
      myRover.position[1]++;
    }
    if (rover.position[1] > 9) {
      myRover.position[1]--;
    }
		return true;
	}
	else {
		return false;
	}
}

/* Checks for obstacles on the grid */
function checkObstacle (rover) {
  for (var i = 0; i < obstacles.length; i++) {
    if (rover.position[0] == obstacles[i][0] && rover.position[1] == obstacles[i][1]){
      return true;
    }
    return false;
  }
}

/* Changes the rover direction always to the right when finding an obstacle. */
function changeDirectionObstacle(rover) {
  if (myRover.direction == 'N') {
    myRover.direction = 'E';
  } else if (myRover.direction == 'E') {
    myRover.direction = 'S';
  } else if (myRover.direction == 'W') {
    myRover.direction = 'N';
  } else {
    myRover.direction = 'W';
  }
}

/* Displays position of the rover after apply a command. */
function displayPosition() {
	console.log("Rover Current Position: [" + myRover.position[0] + ", " + myRover.position[1] + "]");
}

// start main
for(var i = 0; i < commands.length; i++) {
	var command = commands[i];

	// check position on the grid before send a command
	var gridEdge = false;
	var obstaclesFound = false;

	switch (command) {
		case 'f':
			goFordward(myRover);
			break;
		case 'r':
			goRight(myRover);
			changeDirection(myRover.direction, command);
			break;
		case 'l':
			goLeft(myRover);
			changeDirection(myRover.direction, command);
			break;
		case 'b':
			goBack(myRover);
			break;
	}
	// check position of rover
	gridEdge = checkGrid(myRover);
	if (gridEdge) {
		console.log("myRover is on the edge. We are sending it a back command");
		console.log("Rover Position at edge: [" + myRover.position[0] + ", " + myRover.position[1] + "]");
		continue;
	}

	// check for obstacles
	obstaclesFound = checkObstacle(myRover);
	if (obstaclesFound) {
		console.log("myRover found an obstacle. We are changing direction");
		console.log("Position of obstacle: [" + myRover.position[0] + ", " + myRover.position[1] + "]");
    changeDirectionObstacle(myRover);
    continue;
	}

	displayPosition();
} // end main
