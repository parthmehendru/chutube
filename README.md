Debouncing: 

typing slow: suppose difference between two keystrokes is 200ms
typing fast: difference between two keystrokes will be around 50ms

Performance: 
 -  at a time , suppose 1000 people search iphone pro max , total api calls are 15000

 - with debouncing, around 3-5k will be made, so it does not hardly create a difference



 - Debouncing with 200ms
   - if difference between 2 key strokes is <200ms - DECLINE API call
   - for >200ms, make an API call



