import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function Square (props) {
  return (
        <button
          className="square"
          onClick={props.onClick}
        >
            {props.value}
        </button>
  )
}

class Board extends React.Component {
  renderSquare (i) {
    return <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
  }

  render () {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: false,
      isTie: false,
      stepNumber: 0
    }
  }

  resetGame () {
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: false,
      isTie: false,
      stepNumber: 0
    })
  }

  handleClick (i) {
    const history = this.state.history
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }
    if (squares[i] !== null) { return }
    squares[i] = this.state.xIsNext ? 'O' : 'X'

    let isTie = true
    for (const square of squares) {
      if (square === null) {
        isTie = false
      }
    }
    this.setState({
      history: history.concat([{
        squares
      }]),
      xIsNext: !this.state.xIsNext,
      isTie
    })
  }

  jumpTo (move) {

  }

  render () {
    const history = this.state.history
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares)

    let status
    if (winner) {
      status = 'Winner is ' + winner
    } else if (this.state.isTie) {
      status = 'Tie!'
    } else {
      status = 'Current player: ' + (this.state.xIsNext ? 'O' : 'X')
    }

    const moves = history.map((step, move) => {
      const desc = move
        ? 'Move to #' + move + '-' + (move % 2 === 0 ? 'O' : 'X')
        : false

      if (desc === false) {
        return (
          <li key={move}>
            <button className="history-move-btn history-move-btn-disabled">Game History</button>
          </li>
        )
      } else {
        return (
          <li key={move}>
            <button className="history-move-btn" onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      }
    })

    return (
      <div className="wrapper">
        <div className="main-content-wrapper">
          <div className="game">
            <div className="game-board">
              <div className="status">{status}</div>
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                className="board-below-spacer"
              />
              <button
                className='resetBtn'
                onClick={() => this.resetGame()}
              >
                Reset
              </button>
            </div>
            <div className="game-info">
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Game />)
