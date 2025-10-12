public class Solution 
{    public static int getTotalIslands(int[][] mat) 
	{   
        int row=mat.length;
        if(row==0)
            return 0;
        int col=mat[0].length;
        int island=0;
        for(int i=0;i<row;i++){
            for(int j=0;j<col;j++){
                if(mat[i][j]==1){
                    check(mat,i,j,row,col);
                    island++;
                }
            }
        }
        return island;// NM,1
    }
    public static void check(int[][] mat,int i,int j,int r,int c){
        if(i<0 || i>=r || j<0 || j>=c || mat[i][j]!=1)// corner cases
            return;
       mat[i][j]=2;// marking it visited
        // Now check in all four direction
        check(mat,i-1,j,r,r);//top
        check(mat,i,j-1,r,c);////left
        check(mat,i+1,j,r,c);//down
        check(mat,i,j+1,r,c);//right
        
        // diagonal direction
        check(mat,i-1,j-1,r,r);//top
        check(mat,i-1,j+1,r,c);////left
        check(mat,i+1,j-1,r,c);//down
        check(mat,i+1,j+1,r,c);//right
    }
}
