import { User as _User } from './user';
import { UserRelations as _UserRelations } from './user_relations';
import { Invite as _Invite } from './invite';
import { InviteRelations as _InviteRelations } from './invite_relations';
import { Project as _Project } from './project';
import { ProjectRelations as _ProjectRelations } from './project_relations';
import { Config as _Config } from './config';
import { ConfigRelations as _ConfigRelations } from './config_relations';
import { Access as _Access } from './access';
import { AccessRelations as _AccessRelations } from './access_relations';
import { Role as _Role } from './role';
import { RoleRelations as _RoleRelations } from './role_relations';
import { Right as _Right } from './right';
import { RightRelations as _RightRelations } from './right_relations';
import { Identifier as _Identifier } from './identifier';
import { IdentifierRelations as _IdentifierRelations } from './identifier_relations';
import { Language as _Language } from './language';
import { LanguageRelations as _LanguageRelations } from './language_relations';
import { Translation as _Translation } from './translation';
import { TranslationRelations as _TranslationRelations } from './translation_relations';
import { Review as _Review } from './review';
import { ReviewRelations as _ReviewRelations } from './review_relations';
import { Branch as _Branch } from './branch';
import { BranchRelations as _BranchRelations } from './branch_relations';
import { Bundle as _Bundle } from './bundle';
import { BundleRelations as _BundleRelations } from './bundle_relations';
import { Comment as _Comment } from './comment';
import { CommentRelations as _CommentRelations } from './comment_relations';

export namespace PrismaModel {
  export class User extends _User {}
  export class UserRelations extends _UserRelations {}
  export class Invite extends _Invite {}
  export class InviteRelations extends _InviteRelations {}
  export class Project extends _Project {}
  export class ProjectRelations extends _ProjectRelations {}
  export class Config extends _Config {}
  export class ConfigRelations extends _ConfigRelations {}
  export class Access extends _Access {}
  export class AccessRelations extends _AccessRelations {}
  export class Role extends _Role {}
  export class RoleRelations extends _RoleRelations {}
  export class Right extends _Right {}
  export class RightRelations extends _RightRelations {}
  export class Identifier extends _Identifier {}
  export class IdentifierRelations extends _IdentifierRelations {}
  export class Language extends _Language {}
  export class LanguageRelations extends _LanguageRelations {}
  export class Translation extends _Translation {}
  export class TranslationRelations extends _TranslationRelations {}
  export class Review extends _Review {}
  export class ReviewRelations extends _ReviewRelations {}
  export class Branch extends _Branch {}
  export class BranchRelations extends _BranchRelations {}
  export class Bundle extends _Bundle {}
  export class BundleRelations extends _BundleRelations {}
  export class Comment extends _Comment {}
  export class CommentRelations extends _CommentRelations {}

  export const extraModels = [
    User,
    UserRelations,
    Invite,
    InviteRelations,
    Project,
    ProjectRelations,
    Config,
    ConfigRelations,
    Access,
    AccessRelations,
    Role,
    RoleRelations,
    Right,
    RightRelations,
    Identifier,
    IdentifierRelations,
    Language,
    LanguageRelations,
    Translation,
    TranslationRelations,
    Review,
    ReviewRelations,
    Branch,
    BranchRelations,
    Bundle,
    BundleRelations,
    Comment,
    CommentRelations,
  ];
}
