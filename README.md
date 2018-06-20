# Javascript Assignment Model
Implement Assignment Model using JavaSript

## Hungarian method
This Library implement asssignment model using JavaScript. 
This model base on [Hungarian method](https://en.wikipedia.org/wiki/Hungarian_algorithm) 
(Kuhn–Munkres algorithm or Munkres assignment algorithm).

### Cost Table
--- | JOB#1 | JOB#2 | JOB#3 | JOB#4 | JOB#5
--- | --- | --- | --- | --- | ---
Resource#1 | 7 | 5 | 9 | 8 | 11
Resource#2 | 9 | 12 | 7 | 11 | 10
Resource#3 | 8 | 5 | 4 | 6 | 9
Resource#4 | 7 | 3 | 6 | 9 | 5
Resource#5 | 4 | 6 | 7 | 5 | 11


### Input in array form
```
[
    [7, 5, 9, 8, 11],
    [9, 12, 7, 11, 10],
    [8, 5, 4, 6, 9],
    [7, 3, 7, 5, 11],
    [4, 6, 7, 5, 11]
]
```

### Usage Example
```
Hungarian.run(
    [
        [7, 5, 9, 8, 11],
        [9, 12, 7, 11, 10],
        [8, 5, 4, 6, 9],
        [7, 3, 6, 9, 5],
        [4, 6, 7, 5, 11]
    ]
)
```


### Output
```
{ assign:
   { '1': { '2': 5 },
     '2': { '3': 7 },
     '3': { '4': 6 },
     '4': { '5': 5 },
     '5': { '1': 4 } },
  sum_cost: 27,
  matrix:
   [ [ 2, 0, 5, 2, 4 ],
     [ 1, 4, 0, 2, 0 ],
     [ 3, 0, 0, 0, 2 ],
     [ 4, 0, 4, 5, 0 ],
     [ 0, 2, 4, 0, 5 ] ] }
```
