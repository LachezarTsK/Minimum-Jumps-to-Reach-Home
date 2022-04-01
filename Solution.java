
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private record Point(int index, boolean priorJumpIsBackward){}

    public int minimumJumps(int[] forbidden, int forward, int backward, int homeBase) {
        final int upperLimit = 6001;
        final int notPossible = -1;

        boolean[] visited = new boolean[upperLimit];
        for (int n : forbidden) {
            visited[n] = true;
        }

        Queue<Point> queue = new LinkedList<>();
        queue.add(new Point(0, false));
        visited[0] = true;
        int jumps = 0;

        while (!queue.isEmpty()) {

            int size = queue.size();
            while (size-- > 0) {

                Point p = queue.poll();
                if (p.index == homeBase) {
                    return jumps;
                }

                if ((p.index + forward) < upperLimit && !visited[p.index + forward]) {
                    //visited is set to 'true' only for forward jumps.
                    visited[p.index + forward] = true;
                    queue.add(new Point(p.index + forward, false));
                }
                if (!p.priorJumpIsBackward && (p.index - backward) >= 0 && !visited[p.index - backward]) {
                    queue.add(new Point(p.index - backward, true));
                }
            }
            jumps++;
        }

        return notPossible;
    }
}
