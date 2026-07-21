import React, { useState } from 'react';

const TicTacToeContent: React.FC = () => {
    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [gameMode, setGameMode] = useState<'ai' | 'pvp'>('ai');

    const calculateWinner = (squares: (string | null)[]) => {
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
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every((s) => s !== null);

    const makeAIMove = (currentBoard: (string | null)[]) => {
        const emptyIndices: number[] = [];
        currentBoard.forEach((val, idx) => {
            if (val === null) emptyIndices.push(idx);
        });

        if (emptyIndices.length === 0) return;

        // 1. Try to win
        for (let i = 0; i < emptyIndices.length; i++) {
            const temp = [...currentBoard];
            temp[emptyIndices[i]] = 'O';
            if (calculateWinner(temp) === 'O') {
                updateBoard('O', temp);
                return;
            }
        }

        // 2. Try to block X
        for (let i = 0; i < emptyIndices.length; i++) {
            const temp = [...currentBoard];
            temp[emptyIndices[i]] = 'X';
            if (calculateWinner(temp) === 'X') {
                const updated = [...currentBoard];
                updated[emptyIndices[i]] = 'O';
                updateBoard('O', updated);
                return;
            }
        }

        // 3. Take center or corners preference
        const preferred = [4, 0, 2, 6, 8, 1, 3, 5, 7];
        for (let i = 0; i < preferred.length; i++) {
            if (emptyIndices.includes(preferred[i])) {
                const updated = [...currentBoard];
                updated[preferred[i]] = 'O';
                updateBoard('O', updated);
                return;
            }
        }
    };

    const updateBoard = (player: string, nextBoard: (string | null)[]) => {
        setBoard(nextBoard);
        setIsXNext(player === 'X' ? false : true);
    };

    const handleClick = (index: number) => {
        // Prevent moves if game over, square occupied, or it's AI's turn
        if (board[index] || winner || isDraw || (gameMode === 'ai' && !isXNext)) return;

        const nextBoard = [...board];
        const currentPlayer = isXNext ? 'X' : 'O';
        nextBoard[index] = currentPlayer;

        setBoard(nextBoard);
        setIsXNext(!isXNext);

        if (gameMode === 'ai' && !calculateWinner(nextBoard) && nextBoard.some((s) => s === null)) {
            setTimeout(() => {
                makeAIMove(nextBoard);
            }, 350);
        }
    };

    const handleRestart = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="h-full flex flex-col items-center justify-between p-6 bg-slate-900/40 text-white select-none">
            <div className="text-center">
                <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">
                    macOS Retro Grid
                </h3>
                <p className="text-[11px] text-gray-400 mt-1">Play code grid challenge inside your Dock</p>
            </div>

            <div className="flex bg-slate-950/60 p-1.5 rounded-lg border border-white/5 space-x-1 text-[11px] font-bold">
                <button
                    onClick={() => { setGameMode('ai'); handleRestart(); }}
                    className={`px-3 py-1 rounded-md transition ${gameMode === 'ai' ? 'bg-amber-500 text-slate-950 shadow-md' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    VS Robot (AI)
                </button>
                <button
                    onClick={() => { setGameMode('pvp'); handleRestart(); }}
                    className={`px-3 py-1 rounded-md transition ${gameMode === 'pvp' ? 'bg-amber-500 text-slate-950 shadow-md' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    Local 2P (PvP)
                </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 w-64 h-64 p-2 bg-slate-950/20 border border-white/10 rounded-2xl relative">
                {board.map((cell, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleClick(idx)}
                        className="bg-slate-900/60 hover:bg-slate-800/80 active:scale-95 transition rounded-xl font-black text-2xl flex items-center justify-center border border-white/5 focus:outline-none"
                    >
                        {cell === 'X' ? (
                            <span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">X</span>
                        ) : cell === 'O' ? (
                            <span className="text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">O</span>
                        ) : null}
                    </button>
                ))}
            </div>

            <div className="w-full flex items-center justify-between mt-3 text-xs">
                <div className="font-semibold text-gray-300">
                    {winner ? (
                        <span className="text-emerald-400">
                            Winner: {winner === 'X' ? 'Player X' : (gameMode === 'ai' ? 'Robot O' : 'Player O')} 🎉
                        </span>
                    ) : isDraw ? (
                        <span className="text-amber-400">Match Drawn! 🤝</span>
                    ) : (
                        <span>Turn: {isXNext ? 'Player X' : (gameMode === 'ai' ? 'Robot O...' : 'Player O')}</span>
                    )}
                </div>
                <button
                    onClick={handleRestart}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 font-bold transition text-[11px] border border-white/15"
                >
                    Restart Game
                </button>
            </div>
        </div>
    );
};

export default TicTacToeContent;
