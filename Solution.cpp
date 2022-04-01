
#include <queue>
#include <array>
#include <vector>
using namespace std;

class Solution {

    struct Point {
        int index{};
        bool priorJumpIsBackward{};
        Point(int index, bool priorJumpIsBackward) : index{index}, priorJumpIsBackward{ priorJumpIsBackward}{}
    };

public:

    int minimumJumps(vector<int>& forbidden, int forward, int backward, int homeBase) {
        const int upperLimit = 6001;
        const int notPossible = -1;

        array<bool, upperLimit > visited{};
        for (int n : forbidden) {
            visited[n] = true;
        }

        queue<Point> queue;
        queue.push(Point(0, false));
        visited[0] = true;
        int jumps = 0;

        while (!queue.empty()) {

            int size = queue.size();
            while (size-- > 0) {

                Point p = queue.front();
                queue.pop();
                if (p.index == homeBase) {
                    return jumps;
                }

                if ((p.index + forward) < upperLimit && !visited[p.index + forward]) {
                    //visited is set to 'true' only for forward jumps.
                    visited[p.index + forward] = true;
                    queue.push(Point(p.index + forward, false));
                }
                if (!p.priorJumpIsBackward && (p.index - backward) >= 0 && !visited[p.index - backward]) {
                    queue.push(Point(p.index - backward, true));
                }
            }
            jumps++;
        }

        return notPossible;
    }
};
