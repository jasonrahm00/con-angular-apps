export class Assignment {
  constructor(
    public courseID: string,
    public assignID: number,
    public empID?: string,
    public courseString?: string,
    public coord?: string,
    public didactic?: string,
    public practice?: string,
    public notes?: string,
    public semester?: string,
    public year?: string,
    public errors?: any
  ) { }
}
