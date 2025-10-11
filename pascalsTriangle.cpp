class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> pascal(numRows); // make space for all rows

        for (int i = 0; i < numRows; i++) {
            pascal[i] = vector<int>(i + 1, 1); // each row has (i+1) numbers, all 1

            // fill middle numbers using formula
            for (int j = 1; j < i; j++) {
                pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
            }
        }
        return pascal;
    }
};
