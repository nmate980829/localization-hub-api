import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './utils/prisma/prisma.module';
import { InvitationsModule } from './invitations/invitations.module';
import { ProjectsModule } from './projects/projects.module';
import { LanguagesModule } from './languages/languages.module';
import { AccessesModule } from './accesses/accesses.module';
import { CommentsModule } from './comments/comments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RightsModule } from './rights/rights.module';
import { RolesModule } from './roles/roles.module';
import { BranchesModule } from './branches/branches.module';
import { IdentifiersModule } from './identifiers/identifiers.module';
import { BundlesModule } from './bundles/bundles.module';
import { TranslationsModule } from './translations/translations.module';
import { TokensModule } from './tokens/tokens.module';

@ApiBearerAuth()
@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    InvitationsModule,
    ProjectsModule,
    LanguagesModule,
    AccessesModule,
    CommentsModule,
    ReviewsModule,
    RightsModule,
    RolesModule,
    BranchesModule,
    IdentifiersModule,
    BundlesModule,
    TranslationsModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        '/api/ping',
        '/api/auth',
        '/api/auth/(.*)',
        '/api/v([0-9]+)/auth',
        '/api/v([0-9]+)/auth/(.*)',
      )
      .forRoutes('/');
  }
}
