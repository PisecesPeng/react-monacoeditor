(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[609],{1210:function(t,r,e){"use strict";e.r(r),r.default="/* Game of Life\r\n * Implemented in TypeScript\r\n * To learn more about TypeScript, please visit http://www.typescriptlang.org/\r\n */\r\n\r\nnamespace Conway {\r\n\r\n\texport class Cell {\r\n\t\tpublic row: number;\r\n\t\tpublic col: number;\r\n\t\tpublic live: boolean;\r\n\r\n\t\tconstructor(row: number, col: number, live: boolean) {\r\n\t\t\tthis.row = row;\r\n\t\t\tthis.col = col;\r\n\t\t\tthis.live = live;\r\n\t\t}\r\n\t}\r\n\r\n\texport class GameOfLife {\r\n\t\tprivate gridSize: number;\r\n\t\tprivate canvasSize: number;\r\n\t\tprivate lineColor: string;\r\n\t\tprivate liveColor: string;\r\n\t\tprivate deadColor: string;\r\n\t\tprivate initialLifeProbability: number;\r\n\t\tprivate animationRate: number;\r\n\t\tprivate cellSize: number;\r\n\t\tprivate context: CanvasRenderingContext2D;\r\n\t\tprivate world;\r\n\r\n\r\n\t\tconstructor() {\r\n\t\t\tthis.gridSize = 50;\r\n\t\t\tthis.canvasSize = 600;\r\n\t\t\tthis.lineColor = '#cdcdcd';\r\n\t\t\tthis.liveColor = '#666';\r\n\t\t\tthis.deadColor = '#eee';\r\n\t\t\tthis.initialLifeProbability = 0.5;\r\n\t\t\tthis.animationRate = 60;\r\n\t\t\tthis.cellSize = 0;\r\n\t\t\tthis.world = this.createWorld();\r\n\t\t\tthis.circleOfLife();\r\n\t\t}\r\n\r\n\t\tpublic createWorld() {\r\n\t\t\treturn this.travelWorld( (cell : Cell) =>  {\r\n\t\t\t\tcell.live = Math.random() < this.initialLifeProbability;\r\n\t\t\t\treturn cell;\r\n\t\t\t});\r\n\t\t}\r\n\r\n\t\tpublic circleOfLife() : void {\r\n\t\t\tthis.world = this.travelWorld( (cell: Cell) => {\r\n\t\t\t\tcell = this.world[cell.row][cell.col];\r\n\t\t\t\tthis.draw(cell);\r\n\t\t\t\treturn this.resolveNextGeneration(cell);\r\n\t\t\t});\r\n\t\t\tsetTimeout( () => {this.circleOfLife()}, this.animationRate);\r\n\t\t}\r\n\r\n\t\tpublic resolveNextGeneration(cell : Cell) {\r\n\t\t\tvar count = this.countNeighbors(cell);\r\n\t\t\tvar newCell = new Cell(cell.row, cell.col, cell.live);\r\n\t\t\tif(count < 2 || count > 3) newCell.live = false;\r\n\t\t\telse if(count == 3) newCell.live = true;\r\n\t\t\treturn newCell;\r\n\t\t}\r\n\r\n\t\tpublic countNeighbors(cell : Cell) {\r\n\t\t\tvar neighbors = 0;\r\n\t\t\tfor(var row = -1; row <=1; row++) {\r\n\t\t\t\tfor(var col = -1; col <= 1; col++) {\r\n\t\t\t\t\tif(row == 0 && col == 0) continue;\r\n\t\t\t\t\tif(this.isAlive(cell.row + row, cell.col + col)) {\r\n\t\t\t\t\t\tneighbors++;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\treturn neighbors;\r\n\t\t}\r\n\r\n\t\tpublic isAlive(row : number, col : number) {\r\n\t\t\tif(row < 0 || col < 0 || row >= this.gridSize || col >= this.gridSize) return false;\r\n\t\t\treturn this.world[row][col].live;\r\n\t\t}\r\n\r\n\t\tpublic travelWorld(callback) {\r\n\t\t\tvar result = [];\r\n\t\t\tfor(var row = 0; row < this.gridSize; row++) {\r\n\t\t\t\tvar rowData = [];\r\n\t\t\t\tfor(var col = 0; col < this.gridSize; col++) {\r\n\t\t\t\t\trowData.push(callback(new Cell(row, col, false)));\r\n\t\t\t\t}\r\n\t\t\t\tresult.push(rowData);\r\n\t\t\t}\r\n\t\t\treturn result;\r\n\t\t}\r\n\r\n\t\tpublic draw(cell : Cell) {\r\n\t\t\tif(this.context == null) this.context = this.createDrawingContext();\r\n\t\t\tif(this.cellSize == 0) this.cellSize = this.canvasSize/this.gridSize;\r\n\r\n\t\t\tthis.context.strokeStyle = this.lineColor;\r\n\t\t\tthis.context.strokeRect(cell.row * this.cellSize, cell.col*this.cellSize, this.cellSize, this.cellSize);\r\n\t\t\tthis.context.fillStyle = cell.live ? this.liveColor : this.deadColor;\r\n\t\t\tthis.context.fillRect(cell.row * this.cellSize, cell.col*this.cellSize, this.cellSize, this.cellSize);\r\n\t\t}\r\n\r\n\t\tpublic createDrawingContext() {\r\n\t\t\tvar canvas = <HTMLCanvasElement> document.getElementById('conway-canvas');\r\n\t\t\tif(canvas == null) {\r\n\t\t\t\t\tcanvas = document.createElement('canvas');\r\n\t\t\t\t\tcanvas.id = 'conway-canvas';\r\n\t\t\t\t\tcanvas.width = this.canvasSize;\r\n\t\t\t\t\tcanvas.height = this.canvasSize;\r\n\t\t\t\t\tdocument.body.appendChild(canvas);\r\n\t\t\t}\r\n\t\t\treturn canvas.getContext('2d');\r\n\t\t}\r\n\t}\r\n}\r\n\r\nvar game = new Conway.GameOfLife();\r\n"}}]);
//# sourceMappingURL=609.c2648611.chunk.js.map