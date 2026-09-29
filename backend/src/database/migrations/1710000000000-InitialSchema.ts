import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1710000000000 implements MigrationInterface {
  name = 'InitialSchema1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"`);
    await queryRunner.query(`CREATE TYPE "public"."users_rol_enum" AS ENUM('CLIENTE','BARBERO','ADMINISTRADOR')`);
    await queryRunner.query(`CREATE TYPE "public"."citas_estado_enum" AS ENUM('PROGRAMADA','CONFIRMADA','EN_PROCESO','FINALIZADA','CANCELADA')`);
    await queryRunner.query(`CREATE TYPE "public"."pagos_metodopago_enum" AS ENUM('EFECTIVO','TARJETA','TRANSFERENCIA','OTRO')`);
    await queryRunner.query(`CREATE TYPE "public"."pagos_estado_enum" AS ENUM('PENDIENTE','COMPLETADO','FALLIDO','REEMBOLSADO')`);

    await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying NOT NULL, "rol" "public"."users_rol_enum" NOT NULL DEFAULT 'CLIENTE', "estado" boolean NOT NULL DEFAULT true, "fechaRegistro" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_users_id" PRIMARY KEY ("id"), CONSTRAINT "UQ_users_email" UNIQUE ("email"))`);
    await queryRunner.query(`CREATE TABLE "clientes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "telefono" character varying(30), "direccion" character varying(200), CONSTRAINT "PK_clientes_id" PRIMARY KEY ("id"), CONSTRAINT "UQ_clientes_usuario" UNIQUE ("usuario_id"))`);
    await queryRunner.query(`CREATE TABLE "barberos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "especialidad" character varying(100), "descripcion" text, "disponible" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_barberos_id" PRIMARY KEY ("id"), CONSTRAINT "UQ_barberos_usuario" UNIQUE ("usuario_id"))`);
    await queryRunner.query(`CREATE TABLE "servicios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "descripcion" text, "duracionMinutos" integer NOT NULL, "precio" numeric(12,2) NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_servicios_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "citas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fecha" date NOT NULL, "hora" TIME NOT NULL, "estado" "public"."citas_estado_enum" NOT NULL DEFAULT 'PROGRAMADA', "observaciones" text, "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now(), "cliente_id" uuid NOT NULL, "barbero_id" uuid NOT NULL, CONSTRAINT "PK_citas_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "detalle_cita" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "precio" numeric(12,2) NOT NULL, "observaciones" text, "cita_id" uuid NOT NULL, "servicio_id" uuid NOT NULL, CONSTRAINT "PK_detalle_cita_id" PRIMARY KEY ("id"), CONSTRAINT "UQ_detalle_cita_servicio" UNIQUE ("cita_id","servicio_id"))`);
    await queryRunner.query(`CREATE TABLE "pagos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fecha" TIMESTAMP NOT NULL DEFAULT now(), "monto" numeric(12,2) NOT NULL, "metodoPago" "public"."pagos_metodopago_enum" NOT NULL, "estado" "public"."pagos_estado_enum" NOT NULL DEFAULT 'PENDIENTE', "referencia" character varying(100), "cita_id" uuid NOT NULL, CONSTRAINT "PK_pagos_id" PRIMARY KEY ("id"), CONSTRAINT "UQ_pagos_cita" UNIQUE ("cita_id"))`);

    await queryRunner.query(`ALTER TABLE "clientes" ADD CONSTRAINT "FK_clientes_usuario" FOREIGN KEY ("usuario_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "barberos" ADD CONSTRAINT "FK_barberos_usuario" FOREIGN KEY ("usuario_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "citas" ADD CONSTRAINT "FK_citas_cliente" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "citas" ADD CONSTRAINT "FK_citas_barbero" FOREIGN KEY ("barbero_id") REFERENCES "barberos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "detalle_cita" ADD CONSTRAINT "FK_detalle_cita_cita" FOREIGN KEY ("cita_id") REFERENCES "citas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "detalle_cita" ADD CONSTRAINT "FK_detalle_cita_servicio" FOREIGN KEY ("servicio_id") REFERENCES "servicios"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "pagos" ADD CONSTRAINT "FK_pagos_cita" FOREIGN KEY ("cita_id") REFERENCES "citas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pagos" DROP CONSTRAINT "FK_pagos_cita"`);
    await queryRunner.query(`ALTER TABLE "detalle_cita" DROP CONSTRAINT "FK_detalle_cita_servicio"`);
    await queryRunner.query(`ALTER TABLE "detalle_cita" DROP CONSTRAINT "FK_detalle_cita_cita"`);
    await queryRunner.query(`ALTER TABLE "citas" DROP CONSTRAINT "FK_citas_barbero"`);
    await queryRunner.query(`ALTER TABLE "citas" DROP CONSTRAINT "FK_citas_cliente"`);
    await queryRunner.query(`ALTER TABLE "barberos" DROP CONSTRAINT "FK_barberos_usuario"`);
    await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_clientes_usuario"`);
    await queryRunner.query(`DROP TABLE "pagos"`);
    await queryRunner.query(`DROP TABLE "detalle_cita"`);
    await queryRunner.query(`DROP TABLE "citas"`);
    await queryRunner.query(`DROP TABLE "servicios"`);
    await queryRunner.query(`DROP TABLE "barberos"`);
    await queryRunner.query(`DROP TABLE "clientes"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."pagos_estado_enum"`);
    await queryRunner.query(`DROP TYPE "public"."pagos_metodopago_enum"`);
    await queryRunner.query(`DROP TYPE "public"."citas_estado_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_rol_enum"`);
  }
}
