export class Member {
  private _id: number;
  private _dashboardId: number;
  private _memberId: number;
  private _createdAt: string;

  constructor(dashboardId: number, memberId: number, id?: number, createdAt?: string) {
    this._id = id;
    this._dashboardId = dashboardId;
    this._memberId = memberId;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  get dashboardId() {
    return this._dashboardId;
  }

  get memberId() {
    return this._memberId;
  }

  get createdAt() {
    return this._createdAt;
  }

  set id(id: number) {
    this._id = id;
  }

  set dashboardId(dashboardId: number) {
    this._dashboardId = dashboardId;
  }

  set memberId(memberId: number) {
    this._memberId = memberId;
  }

  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  static fromJson(json: any) {
    return new Member(json.dashboardId, json.memberId, json.id, json.createdAt);
  }

  toJson() {
    return {
      id: this.id,
      dashboardId: this.dashboardId,
      memberId: this.memberId,
      createdAt: this.createdAt,
    };
  }
}
