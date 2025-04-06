export class SessionMessageDto {
  message: boolean;
  session?: string;

  constructor(message: boolean, session?: string) {
    this.message = message;
    this.session = session;
  }

  public IsValid(): boolean {
    return this.message;
  }
}
