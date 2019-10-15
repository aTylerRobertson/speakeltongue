const input = document.getElementById("in");
const result = document.getElementById("out");
const extraInput = document.getElementById("food");

$('#speak').click(() => {
  translate(input.value, extraInput.value);
});

$('#in').keydown((e) => {
    if (e.keyCode == 9) {  // tab
        e.preventDefault();
    }
});

const translate = (input, extra) => {
  console.clear();

  var stop = false;
  setTimeout(() => {
    stop = true;
    console.log('Stopped.');
  }, 10000);

  input = input.split(/\s/);
  var food = extra.split('');

  var snake = [0];
  var loopEnd = [];
  var loopStart = [];
  var loop = [];

  var output = "";


  var pointer = 0; // where we are in the program

  for (pointer = 0; pointer < input.length; pointer++) {
    const command = input[pointer];

    if (command.match(/^shake$/i)) { // start loop
        loop.push(pointer);
    } else if (command.match(/^rattle$/i)) { // set loop endpoints
        const start = loop.pop();
        loopEnd[start] = pointer;
        loopStart[pointer] = start;
    }
  }

  var scale = 0; // where we are on the snake
  pointer = 0;

  while (pointer < input.length) {
    if (!stop) {
      const command = input[pointer];
      console.log(command);

      if (command.match(/^gu+lp$/i)) { // take first character from input and insert it into snake as new scale
        for (var i = 3; i < command.length; i++) {
          if (food[0]) { // longer guuuuuuulp inserts next character from input (once per u)
            snake.splice(scale, 0, food.shift().charCodeAt(0));
            $('#food').val(food.join());
            console.log(`Swallowed input ${snake[scale]} into scale ${scale}`);
          }
        }
      } else if (command.match(/^che+w+$/i)) { // move to next empty scale
        while (snake[scale] > 0) {
          scale++;
        }
        console.log('Moved to scale', scale);
      } else if (command.match(/^mu+n+ch$/i)) { // move to next empty scale and count number of spaces moved
        var n = 0
        while (snake[scale] > 0) {
          scale++;
          n++
        }
        snake[scale] = n;
        console.log('Moved to scale', scale);
        console.log(`Set scale ${scale} to`, n);
      } else if (command.match(/^hi+s+s$/i)) { // output UTF-16
        for (var i = 3; i < command.length; i++) {
          output += String.fromCharCode(snake[scale]);
          console.log('Output', output);
        }
      } else if (command.match(/^shake$/i)) { // start loop unless 0
          if (snake[scale] == 0) {
            pointer = loopEnd[pointer];
            console.log('Skip loop to point', pointer);
          } else {
            console.log('Starting loop at point', pointer);
          }
      } else if (command.match(/^rattle$/i)) { // restart loop unless 0
          if (snake[scale] != 0) {
            pointer = loopStart[pointer];
            console.log('Restart loop at point', pointer);
          } else {
            console.log('Ending loop at point', pointer);
          }
      } else if (command.match(/^zi+g$/i)) { // move scale right
          for (var i = 0; i < command.length-2; i++) {
            scale++;
            if (!snake[scale]) {
              snake.push(0);
            }
          }
          console.log('Moved to scale', scale);
      } else if (command.match(/^za+g$/i)) { // move scale left
          for (var i = 0; i < command.length-2; i++) {
            if (scale > 0) {
              scale--;
            }
          }
          console.log('Moved to scale', scale);
      } else if (command.match(/^S+$/)) { // increment cell
          snake[scale] += command.length;
          console.log(`Set scale ${scale} to`, snake[scale]);
      } else if (command.match(/^s+$/)) { // decrement cell
          snake[scale] -= command.length;
          console.log(`Set scale ${scale} to`, snake[scale]);
      } else if (command.match(/^ble+[mp]$/i)) { // clear cell
          snake[scale] = 0;
          console.log(`Set scale ${scale} to 0`);
      }

      pointer++;
      result.value = output;

    }
  }
}

const shareLink = (food, input) => {
  
}

const loadExample = (example) => {
  if (example == 'hello') {
    $('#food').val('Hello, world!');
    $('#in').val('zig guuuuuuuuuuuuulp\nmunch\nshake\n zag\n hiss\nrattle');
  }
  if (example == 'backwards') {
    $('#food').val('Hello, world!');
    $('#in').val('guuuuuuuuuuuuulp\nshake\n hiss\n zig\nrattle');
  }
  if (example == 'no-input') {
    $('#food').val('');
    $('#in').val('SSSSSSSS shake zig SSSS shake zig SS zig SSS zig SSS zig S zaaaag s rattle zig S zig S zig s ziig S shake zag rattle zag s rattle ziig HISS zig sss HISS SSSSSSS HISSS SSS HISS ziig hiss zag s hiss zag hiss SSS hiss ssssss hiss ssssssss hiss ziig hiss ziig S HISS zig SS HISS');
  }
}
