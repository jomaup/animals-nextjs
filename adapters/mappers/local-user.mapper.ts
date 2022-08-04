import { LocalUser } from "../../core/domain/local-user";
import { ModelLocalUserRepository } from "../../repositories/models/model.local-user.repository";

export class LocalUserMapper {
  public static toRepository(localUser: LocalUser): ModelLocalUserRepository {
    return {
      accessToken: localUser.accessToken,
      refreshToken: localUser.refreshToken,
      chatToken: localUser.chatToken,
      username: localUser.username,
    };
  }
  public static toDomain(localUser: ModelLocalUserRepository): LocalUser {
    return new LocalUser({
      chatToken: localUser.chatToken,
      accessToken: localUser.accessToken,
      refreshToken: localUser.refreshToken,
      username: localUser.username,
    });
  }
}
