
/**
 * @param {number[]} forbidden
 * @param {number} forward
 * @param {number} backward
 * @param {number} homeBase
 * @return {number}
 */
var minimumJumps = function (forbidden, forward, backward, homeBase) {
    const upperLimit = 6001;
    const notPossible = -1;

    const visited = new Array(upperLimit).fill(false);
    for (let n of forbidden) {
        visited[n] = true;
    }

    const queue = new Queue();
    queue.enqueue(new Point(0, false));
    visited[0] = true;
    let jumps = 0;

    while (!queue.isEmpty()) {

        let size = queue.size();
        while (size-- > 0) {

            const p = queue.dequeue();
            if (p.index === homeBase) {
                return jumps;
            }

            if ((p.index + forward) < upperLimit && !visited[p.index + forward]) {
                //visited is set to 'true' only for forward jumps.
                visited[p.index + forward] = true;
                queue.enqueue(new Point(p.index + forward, false));
            }
            if (!p.priorJumpIsBackward && (p.index - backward) >= 0 && !visited[p.index - backward]) {
                queue.enqueue(new Point(p.index - backward, true));
            }
        }
        jumps++;
    }

    return notPossible;
};

/**
 * @param {number} index
 * @param {number} priorJumpIsBackward
 */
function Point(index, priorJumpIsBackward) {
    this.index = index;
    this.priorJumpIsBackward = priorJumpIsBackward;
}
