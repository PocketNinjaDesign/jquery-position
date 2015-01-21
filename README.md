# jquery-position
Just some code for positioning flash style :-D

## Code examples

x position
$('#box').x()

y position
$('#box').y()

Set new x position
$('#box').x(100)

animate to a new x position
('#box').x({
  val: 900,
  duration: 1000
});

animate to a new x position and run function
('#box').x({
  val: 900,
  duration: 1000,
  fn: function() {
    console.log('animation complete');
  }
});