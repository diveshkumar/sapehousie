var app = require('./app');
var http = require('http');
var socketio = require('socket.io');
var game = require('./custom_modules/game');

var server = http.createServer(app);
server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

var io = socketio.listen(server);
var clientCount = 0;
io.sockets.on("connection", function(socket) {
  socket.on("connect", function() {
    clientCount++;
  });
  socket.on("disconnect", function() {
    clientCount--;
  });
  var numbers = game.arrayShuffle(game.generateNumbers());
  var len = numbers.length;

  socket.on('send', function(data) {
    io.sockets.emit('drawNumber', {data: numbers.pop(), total: numbers.length});
  });

  socket.on('currentTicket', function(data) {
    io.sockets.emit('anotherTicket', {ticketData: data});
  });


});
