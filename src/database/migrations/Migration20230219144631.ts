import { Migration } from '@mikro-orm/migrations';

export class Migration20230219144631 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "sas_modules" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "created_by" int null, "updated_by" int null, "is_active" boolean not null default true, "name" varchar(255) not null, "description" varchar(255) not null);',
    );
    this.addSql(
      'alter table "sas_modules" add constraint "sas_modules_name_unique" unique ("name");',
    );

    this.addSql(
      'create table "sas_privileges" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "created_by" int null, "updated_by" int null, "is_active" boolean not null default true, "name" varchar(255) not null, "description" varchar(255) not null, "method" varchar(255) not null);',
    );
    this.addSql(
      'alter table "sas_privileges" add constraint "sas_privileges_name_unique" unique ("name");',
    );
    this.addSql(
      'alter table "sas_privileges" add constraint "sas_privileges_method_unique" unique ("method");',
    );

    this.addSql(
      'create table "sas_roles" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "created_by" int null, "updated_by" int null, "is_active" boolean not null default true, "name" varchar(255) not null, "description" varchar(255) not null);',
    );
    this.addSql(
      'alter table "sas_roles" add constraint "sas_roles_name_unique" unique ("name");',
    );

    this.addSql(
      'create table "sas_screens" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "created_by" int null, "updated_by" int null, "is_active" boolean not null default true, "name" varchar(255) not null, "description" varchar(255) not null, "module_id" int not null);',
    );
    this.addSql(
      'alter table "sas_screens" add constraint "sas_screens_name_unique" unique ("name");',
    );

    this.addSql(
      'create table "sas_screen_privilege_mappings" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "created_by" int null, "updated_by" int null, "is_active" boolean not null default true, "screen_id" int not null, "privilege_id" int not null, "url" varchar(255) not null);',
    );

    this.addSql(
      'create table "sys_accesses" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "created_by" int null, "updated_by" int null, "is_active" boolean not null default true, "screen_privilege_mapping_id" int not null, "role_id" int not null);',
    );

    this.addSql(
      'create table "sas_users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "created_by" int null, "updated_by" int null, "is_active" boolean not null default true, "first_name" varchar(255) not null, "middle_name" varchar(255) null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "mobile_number" varchar(255) not null, "user_type" text check ("user_type" in (\'SYSTEM\', \'MEDIC\', \'PUBLIC\')) not null);',
    );
    this.addSql(
      'alter table "sas_users" add constraint "sas_users_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "sas_users" add constraint "sas_users_mobile_number_unique" unique ("mobile_number");',
    );

    this.addSql(
      'create table "sas_user_role_mappings" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "created_by" int null, "updated_by" int null, "is_active" boolean not null default true, "user_id" int not null, "role_id" int not null);',
    );

    this.addSql(
      'alter table "sas_screens" add constraint "sas_screens_module_id_foreign" foreign key ("module_id") references "sas_modules" ("id") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "sas_screen_privilege_mappings" add constraint "sas_screen_privilege_mappings_screen_id_foreign" foreign key ("screen_id") references "sas_screens" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "sas_screen_privilege_mappings" add constraint "sas_screen_privilege_mappings_privilege_id_foreign" foreign key ("privilege_id") references "sas_privileges" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "sys_accesses" add constraint "sys_accesses_screen_privilege_mapping_id_foreign" foreign key ("screen_privilege_mapping_id") references "sas_screen_privilege_mappings" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "sys_accesses" add constraint "sys_accesses_role_id_foreign" foreign key ("role_id") references "sas_roles" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "sas_user_role_mappings" add constraint "sas_user_role_mappings_user_id_foreign" foreign key ("user_id") references "sas_users" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "sas_user_role_mappings" add constraint "sas_user_role_mappings_role_id_foreign" foreign key ("role_id") references "sas_roles" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "sas_screens" drop constraint "sas_screens_module_id_foreign";',
    );

    this.addSql(
      'alter table "sas_screen_privilege_mappings" drop constraint "sas_screen_privilege_mappings_privilege_id_foreign";',
    );

    this.addSql(
      'alter table "sys_accesses" drop constraint "sys_accesses_role_id_foreign";',
    );

    this.addSql(
      'alter table "sas_user_role_mappings" drop constraint "sas_user_role_mappings_role_id_foreign";',
    );

    this.addSql(
      'alter table "sas_screen_privilege_mappings" drop constraint "sas_screen_privilege_mappings_screen_id_foreign";',
    );

    this.addSql(
      'alter table "sys_accesses" drop constraint "sys_accesses_screen_privilege_mapping_id_foreign";',
    );

    this.addSql(
      'alter table "sas_user_role_mappings" drop constraint "sas_user_role_mappings_user_id_foreign";',
    );

    this.addSql('drop table if exists "sas_modules" cascade;');

    this.addSql('drop table if exists "sas_privileges" cascade;');

    this.addSql('drop table if exists "sas_roles" cascade;');

    this.addSql('drop table if exists "sas_screens" cascade;');

    this.addSql(
      'drop table if exists "sas_screen_privilege_mappings" cascade;',
    );

    this.addSql('drop table if exists "sys_accesses" cascade;');

    this.addSql('drop table if exists "sas_users" cascade;');

    this.addSql('drop table if exists "sas_user_role_mappings" cascade;');
  }
}
