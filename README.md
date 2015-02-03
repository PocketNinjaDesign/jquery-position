# jquery-position
Just some code for positioning flash style :-D

## Code examples

#### x position relative
```
$('#box').x();
```

#### x position
```
$('#box').x('abs');
```

#### y position
```
$('#box').y();
```

#### Set new x position
```
$('#box').x(100);
```

#### animate to a new x position
```
$('#box').x(900, {
  duration: 1000
});
```

#### animate multiple items to a new x position with steps
```
$('.box').x(900, {
  duration: 1000,
  stepDuration: 200,
  complete: function() {
    console.log('animation complete');
  }
});
```

#### Get x & y position relative
```
$('#box').xy();
```

#### Get x & y position document absolute
```
$('#box').xy('abs');
```

#### Set new x & y position
```
$('#box').xy(100, 100);
```


#### animate multiple items to a new x & y position with steps
```
$('.box').xy(900, 200, {
  duration: 1000,
  stepDuration: 200,
  complete: function() {
    console.log('animation complete');
  }
});
```
