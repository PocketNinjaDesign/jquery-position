# jquery-position
Just some code for positioning flash style :-D

## Code examples

#### Get x or y Position
```
$('#box').x();
$('#box').y();
```

###### Get Document x position
```
$('#box').x('abs');
```
###### Set x position
```
$('#box').x(100);
```
###### Set x position + animation
```
$('.box').x(900, {
  duration: 1000,
  stepDuration: 200,
  complete: function() {
    console.log('animation complete');
  }
});
```

#### Get x & y position
```
$('#box').xy();
```
###### Get x & y document position
```
$('#box').xy('abs');
```
###### Set new x & y position
```
$('#box').xy(100, 100);
```
###### Set new x & y position + animation
```
$('.box').xy(900, 200, {
  duration: 1000,
  stepDuration: 200,
  complete: function() {
    console.log('animation complete');
  }
});
```
