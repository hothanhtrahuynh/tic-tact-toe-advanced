export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], path: lines[i] };
        }
    }
    return null;
};

export function calculateWinnerAdvancced(squares, gameSize) {

    let winPath = Array(5);//track of the square that show winner's path

    const directionMove = [
        { i: 0, j: 1 }, // row: L-R
        { i: 1, j: 0 },//col: T-B
        { i: 1, j: 1 },//diag:TL - BR
        { i: 1, j: -1 }//diag:TR - BL
    ];

    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {

            let index = i * gameSize + j; //calcualte square's index

            if (!squares[index]) { continue; }

            for (let k = 0; k < directionMove.length; k++) {

                let count = 1;
                let nextX = i;
                let nextY = j;

                while (count <= 4) {
                    nextX = nextX + directionMove[k].i;
                    nextY = nextY + directionMove[k].j;

                    if (nextX < 0 || nextX >= gameSize || nextY < 0 || nextY >= gameSize) {
                        break;
                    } //if cur is over the size break loop

                    let nextPos = nextX * gameSize + nextY;

                    if (squares[index] !== squares[nextPos]) {
                        break;
                    }// if tha value doesn't match break loop

                    winPath[count] = nextPos;
                    count++;
                }

                if (count === 5) {
                    winPath[0] = index;
                    return { winner: squares[index], path: winPath };
                }

            }

        }
    }

    return null;
}

