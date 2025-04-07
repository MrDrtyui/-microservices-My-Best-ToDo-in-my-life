import { IsUUID } from 'class-validator';

export class SessionDto {
  @IsUUID()
  sessionId: string;

  @IsUUID()
  userId: string;

  constructor(userId: string, sessionId: string) {
    this.userId = userId;
    this.sessionId = sessionId;
  }
}
