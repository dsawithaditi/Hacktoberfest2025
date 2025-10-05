class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> ans = new ArrayList<>();
        int n = s.length();
        int m = words.length;
        int w = words[0].length();

        HashMap<String,Integer> map = new HashMap<>();
        for(String x : words)
        map.put(x, map.getOrDefault(x,0)+1);

        for(int i=0; i<w; i++){
            HashMap<String,Integer> temp = new HashMap<>();
            int count = 0;
            for(int j=i,k=i; j+w <= n; j=j+w){
                String word = s.substring(j,j+w);
                temp.put(word,temp.getOrDefault(word,0)+1);
                count++;
                
                if(count==m){
                    if(map.equals(temp)){
                        ans.add(k);
                    }
                    String remove = s.substring(k,k+w);
                    temp.computeIfPresent(remove, (a, b) -> (b > 1) ? b - 1 : null);
                    count--;
                    k=k+w;
                }
            }//inner for loop
        }//outer for loop
        return ans;
    }//method
}//class

//................................................................
