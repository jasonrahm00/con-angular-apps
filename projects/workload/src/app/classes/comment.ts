export class Comment {
  constructor(
    public comments: string,
    public empID: string,
    public editing?: boolean,
    public errors?: any
  ) { }
}
