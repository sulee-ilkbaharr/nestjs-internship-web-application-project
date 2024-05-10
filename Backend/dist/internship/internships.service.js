"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternshipsService = void 0;
const common_1 = require("@nestjs/common");
const internships_repository_1 = require("./internships.repository");
let InternshipsService = class InternshipsService {
    constructor(internshipsRepository) {
        this.internshipsRepository = internshipsRepository;
    }
    getInternships(filterDto) {
        return this.internshipsRepository.getInterships(filterDto);
    }
    async getIntershipById(id) {
        const found = await this.internshipsRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException('Internship with ID "${id}" not found');
        }
        return found;
    }
    async createInternship(createInternshipDto) {
        return this.internshipsRepository.createInternship(createInternshipDto);
    }
    async deleteInternship(id) {
        const result = await this.internshipsRepository.delete(id);
        if (result.affected == 0) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
        console.log(result);
    }
    async updateInternshipStatus(id, status) {
        const task = await this.getIntershipById(id);
        task.status = status;
        await this.internshipsRepository.save(task);
        return task;
    }
};
exports.InternshipsService = InternshipsService;
exports.InternshipsService = InternshipsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [internships_repository_1.InternshipRepository])
], InternshipsService);
//# sourceMappingURL=internships.service.js.map