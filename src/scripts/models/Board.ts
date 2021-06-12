import { Field } from './Field';

export class Board extends Phaser.Events.EventEmitter {
  private _fields: Field[] = [];
  constructor(
    private _scene: Phaser.Scene = null,
    private _rows = 0,
    private _cols = 0,
    private _bombs = 0
  ) {
    super();
    this._fields = [];
    this._create();
  }
  public get cols(): number {
    return this._cols;
  }

  public get rows(): number {
    return this._rows;
  }
  private _create(): void {
    this._createFields();
    this._createBombs();
    this._createValues();
  }
  private _createFields(): void {
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        const field = new Field(this._scene, this, row, col);
        field.view.on('pointerdown', this._onFieldClick.bind(this, field));
        this._fields.push(field);
      }
    }
  }
  private _createBombs(): void {
    let count = this._bombs;
    while (count > 0) {
      const field =
        // eslint-disable-next-line new-cap
        this._fields[Phaser.Math.Between(0, this._fields.length - 1)];

      if (field.empty) {
        field.setBomb();
        --count;
      }
    }
  }
  private _createValues() {
    this._fields.forEach(field => {
      if (field.mined) {
        field.getClosestFields().forEach(item => {
          if (item.value >= 0) {
            ++item.value;
          }
        });
      }
    });
  }
  public getField(row: number, col: number): Field {
    return this._fields.find(field => field.row === row && field.col === col);
  }
  private _onFieldClick(field: Field, pointer: Phaser.Input.Pointer): void {
    if (pointer.leftButtonDown()) {
      this.emit('left-click', field);
    } else if (pointer.rightButtonDown()) {
      this.emit('right-click', field);
    }
  }
  public openClosestFields(field: Field): void {
    field.getClosestFields().forEach(item => {
      if (item.closed) {
        item.open();
        if (item.empty) {
          this.openClosestFields(item);
        }
      }
    });
  }
  public get completed(): boolean {
    return this._fields.filter(field => field.completed).length === this._bombs;
  }
  public open(): void {
    this._fields.forEach(field => field.open());
  }
  public get countMarked(): number {
    return this._fields.filter(field => field.marked).length;
  }
}
