export class SessionMessageDto {
  message: boolean;
  session?: string;
  userId?: string;

  constructor(message: boolean, session?: string, userId?: string) {
    this.message = message;
    this.session = session;
    this.userId = userId;
  }

  public IsValid(): boolean {
    return this.message;
  }
}
