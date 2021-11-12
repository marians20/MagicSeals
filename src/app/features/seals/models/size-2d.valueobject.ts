export class Size2D {
  /**
   * Creates an instance of Size2D.
   * @param {number} [height=0]
   * @param {number} [width=0]
   * @memberof Size2D
   */
  constructor(
    /**
     * Y- axis
     */
    public readonly height: number = 0,

    /**
     * X- axis
     */
    public readonly width: number = 0
  ) {}
}
