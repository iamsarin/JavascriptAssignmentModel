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

## Reference
### Books
* Reder. Barry; Stair, Ralph M. Jr.; and Hanna, Michael E. Quantitative Analysis for management. 1th edition. Singapore : Pearson, 2012
* รองศาสตราจารย์สุทธิมา ช านาญเวช, การวิเคราะห์เชิงปริมาณ Quantitative Analysis, กรุงเทพ ฯ : วิทยพัฒน์, 2561
* สุปัญญา ไชยชาญ, การวิเคราะห์เชิงปริมาณ : ฉบับสมบูรณ์ พิมพ์ครั้งที่ 5. กรุงเทพ ฯ : พี.เอ. ลีฟวิ่ง, 2550

### Website
* [The assignment problem](http://www.hungarianalgorithm.com/assignmentproblem.php)
* [The Hungarian algorithm](http://www.hungarianalgorithm.com/hungarianalgorithm.php)
* [Hungarian algorithm O(N^3)](https://pastebin.com/tn6v0HDr)
* [Kuhn-Munkres (Hungarian) Algorithm in C++](https://github.com/saebyn/munkres-cpp)
* [A C implementation of the Hungarian Method](http://robotics.usc.edu/~gerkey/tools/hungarian.html)
* [Munkres (aka Hungarian) algorithm for JS](https://github.com/addaleax/munkres-js)
* [การมอบหมายงาน (The Assignment Method)](http://oservice.skru.ac.th/ebookft/255/chapter7.pdf)
* [ปัญหาการมอบหมายงาน Assignment Problem](http://courseware.payap.ac.th/docu/cs352/PDF_file/Chapter04.pdf)
* [บทที่ 2 ปัญหาการมอบหมายงาน (Assignment Problem)](http://www.ubu.ac.th/~pitakaso/1302476/new_doc/ch02_s.pdf)
* [นางสาวกัลยา เหมกรณ์ การแก้ปัญหามอบหมายงานให้เครื่องจักรที่มีหลายวัตถุประสงค์ สำหรับโรงงานผลิตชิ้นส่วนอิเล็กทรอนิกส์ด้วยวิธีฟัซซี่](http://digi.library.tu.ac.th/thesis/en/0592/01title-illustrations.pdf)
