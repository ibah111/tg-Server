import { Module } from "@nestjs/common";
import { ModuleOfModules } from "./modules/database";

@Module({
    imports: [ModuleOfModules]
})
export class AppModule {}