// Hungarian method
/*

Note:   In javascript array/object are pass by referrent 
        We need to ensure array/object that we pass to step (function)
        cause we use statement below to duplicate then
            var matrix = JSON.parse(JSON.stringify(_matrix));

- Cost Table
            [   JOB#1   JOB#2   JOB#3   JOB#4   JOB#5
Resource#1      7       5       9       8       11
Resource#2      9       12      7       11      10
Resource#3      8       5       4       6       9   
Resource#4      7       3       6       9       5
Resource#5      4       6       7       5       11
            ]

- Input in array form
[
    [7, 5, 9, 8, 11],
    [9, 12, 7, 11, 10],
    [8, 5, 4, 6, 9],
    [7, 3, 7, 5, 11],
    [4, 6, 7, 5, 11]
]

Process
    Step 0.
    Step 1.
    Step 2.
    Step 3.

*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function util_matrix_transpose(_matrix) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    return Object.keys(matrix[0]).map(function (c) {
        return matrix.map(function (r) { return r[c]; });
    });
}

function util_array_get_zero_count(arr) {
    return arr.filter(element => element == 0).length;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
STEP 0
    Pad metrix with zero column/row if matrix M x N; M != N
    Example 
    Ex 1 Resource < JOB
    Input:
        [
            [7, 5, 9, 8, 11],
            [9, 12, 7, 11, 10],
            [8, 5, 4, 6, 9],
            [7, 3, 7, 5, 11],
        ]
    Output: 
        [
            [7, 5, 9, 8, 11],
            [9, 12, 7, 11, 10],
            [8, 5, 4, 6, 9],
            [7, 3, 7, 5, 11],
            [0, 0, 0, 0, 0],
        ]

    Ex 2 Resource > JOB
    Input:
        [
            [7, 5, 9, 8],
            [9, 12, 7, 11],
            [8, 5, 4, 6],
            [7, 3, 7, 5],
            [4, 6, 7, 5]
        ]
    Output:
        [
            [7, 5, 9, 8, 0],
            [9, 12, 7, 11, 0],
            [8, 5, 4, 6, 0],
            [7, 3, 7, 5, 0],
            [4, 6, 7, 5, 0]
        ]
*/
var DEFAULT_PAD_VALUE = 0;
function step_0_pad_metrix(_matrix) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    var number_of_row = matrix.length;                      //  1. initial number of row 
    var number_of_column = matrix[0].length;                //  2. initial number of coloumn

    // CASE Resource = JOB                                  //  3.1 don't want padding ok to next step
    if (number_of_row === number_of_column) {
        return matrix;
    }

    // CASE  Resource < JOB                         
    if (number_of_row < number_of_column) {
        for (var i = 0; i < number_of_column - number_of_row; i++) {
            var zero_row = Array(number_of_column).fill(0);     //  3.2.1 create zero row
            matrix.push(zero_row);                              //  3.2.2 push zero row to metrix
        }
    }

    // CASE Resource > JOB     
    if (number_of_row > number_of_column) {
        for (var i = 0; i < number_of_row; i++) {
            for (var j = 0; j < number_of_row - number_of_column; j++) {
                matrix[i].push(0);                              //  3.3 pad column with zero 0
            }
        }

    }

    // Now matrix is a squre ready to use for next step
    return matrix;
}

// Step 0 Test Case
/* console.log(step_0_pad_metrix(
    [
        [7, 5, 9, 8, 11],
        [9, 12, 7, 11, 10],
        [8, 5, 4, 6, 9],
        [7, 3, 7, 5, 11],
    ]
));

console.log(step_0_pad_metrix(
    [
        [7, 5, 9, 8],
        [9, 12, 7, 11],
        [8, 5, 4, 6],
        [7, 3, 7, 5],
        [4, 6, 7, 5]
    ]
));
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
STEP 1
    Subtract all value of each row with loweast value of each row
    Example 
    Ex 1 
    Input:
        [
            [7, 5, 9, 8, 11],
            [9, 12, 7, 11, 10],
            [8, 5, 4, 6, 9],
            [7, 3, 6, 9, 5],
            [4, 6, 7, 5, 11]
        ]
    Output: 
        [
            [2, 0, 4, 3, 6],
            [2, 5, 0, 4, 3],
            [4, 1, 0, 2, 5],
            [4, 0, 3, 6, 2],
            [0, 2, 3, 1, 7],
        ]
*/
function step_1_subtract_each_row_with_lowest_value(_matrix) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    var number_of_row = matrix.length;                      //  1. initial number of row 
    var number_of_column = matrix[0].length;                //  2. initial number of coloumn

    for (var i = 0; i < number_of_row; i++) {
        var loweast_of_this_row = Math.min(...matrix[i]);      //  3. Find loweast
        for (var j = 0; j < number_of_column; j++) {
            matrix[i][j] = matrix[i][j] - loweast_of_this_row;  // 4. Subtract all value by loweast value
        }
    }

    return matrix;
}

// Step 1 Test Case
/*console.log(step_1_subtract_each_row_with_lowest_value(
    [
        [7, 5, 9, 8, 11],
        [9, 12, 7, 11, 10],
        [8, 5, 4, 6, 9],
        [7, 3, 6, 9, 5],
        [4, 6, 7, 5, 11]
    ]
));*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
STEP 2
    Subtract all value of each column with loweast value of each column
    Example 
    Ex 1 
    Input:
        [
            [2, 0, 4, 3, 6],
            [2, 5, 0, 4, 3],
            [4, 1, 0, 2, 5],
            [4, 0, 3, 6, 2],
            [0, 2, 3, 1, 7],
        ]
    Output: 
        [
            [2, 0, 4, 2, 4],
            [2, 5, 0, 3, 1],
            [4, 1, 0, 1, 3],
            [4, 0, 3, 5, 0],
            [0, 2, 3, 0, 5],
        ]
*/
function step_2_subtract_each_coloumn_with_lowest_value(_matrix) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    var number_of_row = matrix.length;                      //  1. initial number of row 
    var number_of_column = matrix[0].length;                //  2. initial number of coloumn
    var loweast_value_of_column = Array(number_of_column).fill(null)   // 3. initial loweast of coloumn array

    for (var i = 0; i < number_of_row; i++)                 //  3. find loweast value of each column
    {
        for (var j = 0; j < number_of_column; j++) {
            if (loweast_value_of_column[j] === null || matrix[i][j] < loweast_value_of_column[j]) {
                loweast_value_of_column[j] = matrix[i][j];
            }
        }
    }

    for (var i = 0; i < number_of_row; i++) {
        for (var j = 0; j < number_of_column; j++) {
            matrix[i][j] = matrix[i][j] - loweast_value_of_column[j];  // 4. Subtract all value by loweast value
        }
    }

    return matrix;
}

// Step 2 Test Case
/*console.log(step_2_subtract_each_coloumn_with_lowest_value(
    [
        [2, 0, 4, 3, 6],
        [2, 5, 0, 4, 3],
        [4, 1, 0, 2, 5],
        [4, 0, 3, 6, 2],
        [0, 2, 3, 1, 7],
    ]
));*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
STEP 3
    Check minimium zero row-line + column-line is more than row/column count
    Example 
    Ex 1 
    Input:
            C1  C2  C3  C4  C5
        [
    L1      [2, 0,  4,  2,  4],
    L2      [2, 5,  0,  3,  1],
    L3      [4, 1,  0,  1,  3],
    L4      [4, 0,  3,  5,  0],
    L5      [0, 2,  3,  0,  5],
        ]

    Output: 
        {
            result: false,
            line_used: { R_4: true, R_5: true, C_2: true, C_3: true }
        }
*/

function step_3_1_find_row_column_line(_matrix) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    var result = [];
    for (var i = 0; i < matrix.length; i++) {                               // Find zero count of each row
        if (util_array_get_zero_count(matrix[i]) == 0) {
            continue;
        }
        result.push({
            zero_count: util_array_get_zero_count(matrix[i]),
            row_no: i + 1,
            column_no: null,
            row_data: matrix[i]
        });
    }

    var transpose_matrix = util_matrix_transpose(matrix);

    for (var i = 0; i < transpose_matrix.length; i++) {                     // Find zero count of each column
        if (util_array_get_zero_count(transpose_matrix[i]) == 0) {
            continue;
        }
        result.push({
            zero_count: util_array_get_zero_count(transpose_matrix[i]),
            row_no: null,
            column_no: i + 1,
            row_data: transpose_matrix[i]
        });
    }

    return result.sort((item_a, item_b) => item_b.zero_count - item_a.zero_count);    // sort result by zero count descending order
}

function step_3_util_check_remain_zero(_matrix) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[i].indexOf(0) !== -1) {
            return false;                                                   // Found zero value atleast one
        }
    }

    return true;                                                            // this matrix not contain with zero
}

function step_3_util_replace_zero_element_with_star_in_row(_matrix, no_row) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    matrix[no_row - 1] = matrix[no_row - 1].map(value => '*');
    return matrix;
}

function step_3_util_replace_zero_element_with_star_in_column(_matrix, no_column) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    for (var i = 0; i < matrix.length; i++)                 //  3. find loweast value of each column
    {
        for (var j = 0; j < matrix.length; j++) {
            if (j === no_column - 1) {
                matrix[i][j] = '*';
            }
        }
    }
    return matrix;
}

function step_3_util_check_line_used(line_used, line_code) {
    if (line_used.hasOwnProperty(line_code)) {
        return line_used[line_code];
    }
    return false;
}

function step_3_check_count_zero_line_and_get_line_used(_matrix) {
    // console.log(_matrix);
    var matrix = JSON.parse(JSON.stringify(_matrix));
    var line_count = 0;
    var zero_element_used = {};
    var line_used = {};
    var zero_count_report = step_3_1_find_row_column_line(matrix);

    // console.log('zero_count_report', zero_count_report);

    while(zero_count_report.length > 0)
    {
        if (zero_count_report[0].row_no !== null) {
            line_used['R_' + zero_count_report[0].row_no] = true;
            line_count += step_3_util_check_line_used('R_' + zero_count_report[0].row_no) ? 0 : 1;
            matrix = step_3_util_replace_zero_element_with_star_in_row(matrix, zero_count_report[0].row_no)
        }

        if (zero_count_report[0].column_no !== null) {
            line_used['C_' + zero_count_report[0].column_no] = true;
            line_count += step_3_util_check_line_used('C_' + zero_count_report[0].column_no) ? 0 : 1;
            matrix = step_3_util_replace_zero_element_with_star_in_column(matrix, zero_count_report[0].column_no)
        }

        // console.log(step_3_util_check_remain_zero(matrix));
        if (step_3_util_check_remain_zero(matrix)) {
            break;
        }

        zero_count_report = step_3_1_find_row_column_line(matrix);
    }

    // console.log(matrix);
    // console.log(line_count, line_used);

    return { result: line_count >= matrix.length, line_used };
}

// Step 3 Test Case
/*console.log(step_3_check_count_zero_line_and_get_line_used(
    [
        [2, 0, 4, 2, 4],
        [2, 5, 0, 3, 1],
        [4, 1, 0, 1, 3],
        [4, 0, 3, 5, 0],
        [0, 2, 3, 0, 5]
    ]
));*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
STEP 4
    From STEP 3 if we get false we will update/improve metrix and go back to check STEP 3 agin.
    But if STEP 3 get true then we will forward to STEP5

    STEP 4-1 | Find loweast value than not on used line
    STEP 4-2 | Subtract all value that not on used line by STEP 4-1 value
    STEP 4-3 | Plus STEP 4-1 value to element that was interseced by multi-line

    Example 
    Ex 1 
    Input:
                                [
                                    [2, 0, 4, 2, 4],
                                    [2, 5, 0, 3, 1],
        matrix =                    [4, 1, 0, 1, 3],
                                    [4, 0, 3, 5, 0],
                                    [0, 2, 3, 0, 5],
                                ]

        report_from_step_3 =    {
                                    result: false,
                                    line_used: { R_4: true, R_5: true, C_2: true, C_3: true }
                                }
    Output:  
        [
            
        ]
*/

function step_4_1_find_lowest_value_that_not_on_used_line(step_3_report, _matrix) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    var loweast_value = null;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (step_3_report.line_used.hasOwnProperty('R_' + (i + 1))
                || step_3_report.line_used.hasOwnProperty('C_' + (j + 1))) {
                continue;                                                           // skip value on used line
            }

            if (loweast_value === null || matrix[i][j] < loweast_value) {
                loweast_value = matrix[i][j]                                        // assing lower to loweast_value
            }
        }
    }
    return loweast_value;
}

function step_4_2_subtract_all_value_with_loweast_value(step_3_report, _matrix, loweast_value) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (step_3_report.line_used.hasOwnProperty('R_' + (i + 1))
                || step_3_report.line_used.hasOwnProperty('C_' + (j + 1))) {
                continue;                                                           // skip value on used line
            }

            matrix[i][j] = matrix[i][j] - loweast_value;                            // subtract all value not on used line with loweast value

        }
    }

    // console.log('ssss', matrix);

    return matrix;
}

function step_4_3_plus_intersacted_value_with_loweast_value(step_3_report, _matrix, loweast_value) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (step_3_report.line_used.hasOwnProperty('R_' + (i + 1))
                && step_3_report.line_used.hasOwnProperty('C_' + (j + 1))) {
                matrix[i][j] = matrix[i][j] + loweast_value;                        // plus intersacted element with loweast value
            }
        }
    }
    return matrix;
}

function step_4_improve_matrix(_matrix, step_3_report) {
    var matrix = JSON.parse(JSON.stringify(_matrix));

    // console.log('input :: step_4_improve_matrix', _matrix, step_3_report);

    var loweast_value = step_4_1_find_lowest_value_that_not_on_used_line(step_3_report, matrix);
    // console.log('input :: step_4_2_subtract_all_value_with_loweast_value', loweast_value, matrix);
    matrix = step_4_2_subtract_all_value_with_loweast_value(step_3_report, matrix, loweast_value);
    // console.log('output :: step_4_2_subtract_all_value_with_loweast_value', matrix);
    matrix = step_4_3_plus_intersacted_value_with_loweast_value(step_3_report, matrix, loweast_value);

    return matrix;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function step_5_interpret(_matrix, _cost_matrix) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    var coloumn_used = {};
    var report = {};
    report.assign = {};
    report.sum_cost = 0;
    report.matrix = _matrix;

    matrix_sort = matrix.map((row, index) => { return { index, row }; }).sort(function (row_a, row_b) {
        return row_a.row.filter(val => val == 0).length - row_b.row.filter(val => val == 0).length;
    });

    // console.log('----sort metrix----');
    // console.log(matrix_sort);
    // console.log('----sort metrix----');

    for (var i = 0; i < matrix_sort.length; i++) {
        var row = matrix_sort[i].row;
        var index_row = matrix_sort[i].index;

        for (var j = 0; j < matrix.length; j++) {            
            if (row[j] == 0 && !coloumn_used.hasOwnProperty(j)) {
                coloumn_used[j] = true;
                // console.log('index_row', index_row, coloumn_used);
                if (!report.assign.hasOwnProperty(index_row + 1)) {
                    report.assign[index_row + 1] = {};
                }
                // console.log('index_row', index_row);
                report.assign[index_row + 1][j + 1] = _cost_matrix[index_row][j];
                report.sum_cost += _cost_matrix[index_row][j];
                break;
            }
        }
    }
    return report;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Hungarian = {};
Hungarian.run = function (_matrix) {
    var matrix = JSON.parse(JSON.stringify(_matrix));
    var _cost_matrix = JSON.parse(JSON.stringify(_matrix));
    var report_from_step_3 = null;
    var counter = 1, limit_loop = 30;

    matrix = step_0_pad_metrix(matrix);
    _cost_matrix = step_0_pad_metrix(_cost_matrix)
    matrix = step_1_subtract_each_row_with_lowest_value(matrix);
    matrix = step_2_subtract_each_coloumn_with_lowest_value(matrix);

    report_from_step_3 = step_3_check_count_zero_line_and_get_line_used(matrix);
    // console.log('report_from_step_3', report_from_step_3, matrix);
    while (!report_from_step_3.result) {
        matrix = step_4_improve_matrix(matrix, report_from_step_3);
        // console.log('output :: step_4_improve_matrix', matrix);
        report_from_step_3 = step_3_check_count_zero_line_and_get_line_used(matrix);
        // console.log('report_from_step_3#' + counter, report_from_step_3, matrix);
        counter++;
        if (counter >= limit_loop) {
            break;
        }
    }

    return step_5_interpret(matrix, _cost_matrix);
}

// Hungarian.run Test Case
/*console.log(Hungarian.run(
    [
        [7, 5, 9, 8, 11],
        [9, 12, 7, 11, 10],
        [8, 5, 4, 6, 9],
        [7, 3, 6, 9, 5],
        [4, 6, 7, 5, 11]
    ]
));
console.log(Hungarian.run(
    [
        [10, 13, 12, 11],
        [9, 14, 8, 11],
        [6, 10, 8, 9],
        [11, 7, 9, 13]
    ]
));
console.log(Hungarian.run(
    [
        [6, 8, 14, 5],
        [7, 10, 15, 5],
        [7, 10, 15, 5],
        [5, 7, 15, 5]
    ]
));*/