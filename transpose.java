import java.util.ArrayList;
import java.util.Scanner;

public class GfG {

    public static ArrayList<ArrayList<Integer>>
                            transpose(int[][] mat) {
        
        int rows = mat.length;           
        int cols = mat[0].length;        

        // Create a result matrix of size 
        // cols x rows for the transpose
        ArrayList<ArrayList<Integer>> tMat = new ArrayList<>();

        // Fill the transposed matrix by 
        // swapping rows with columns
        for (int i = 0; i < cols; i++) {
            ArrayList<Integer> row = new ArrayList<>();
            for (int j = 0; j < rows; j++) {
                // Assign transposed value
                row.add(mat[j][i]);  
            }
            tMat.add(row);
        }

        return tMat;
    }

    public static void main(String[] args) {

        int[][] mat = {
            {1, 1, 1, 1},
            {2, 2, 2, 2},
            {3, 3, 3, 3},
            {4, 4, 4, 4}
        };

        ArrayList<ArrayList<Integer>> res = transpose(mat);

        for (ArrayList<Integer> row : res) {
            for (int elem : row) {
                System.out.print(elem + " ");
            }
            System.out.println();
        }
    }
}
