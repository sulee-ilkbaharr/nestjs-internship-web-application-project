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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternshipController = void 0;
const common_1 = require("@nestjs/common");
const create_internship_dto_1 = require("./dto/create-internship.dto");
const get_internships_fiter_dto_1 = require("./dto/get-internships-fiter.dto");
const passport_1 = require("@nestjs/passport");
const update_internship_status_dto_1 = require("./dto/update-internship-status.dto");
const internships_service_1 = require("./internships.service");
let InternshipController = class InternshipController {
    constructor(internshipsService) {
        this.internshipsService = internshipsService;
    }
    getInternships(filterDto) {
        return this.internshipsService.getInternships(filterDto);
    }
    getInternshipById(id) {
        return this.internshipsService.getIntershipById(id);
    }
    createInternship(createInternshipDto) {
        return this.internshipsService.createInternship(createInternshipDto);
    }
    deleteInternship(id) {
        return this.internshipsService.deleteInternship(id);
    }
    updateInternshipStatus(id, updateInternshipStatusDto) {
        const { status } = updateInternshipStatusDto;
        return this.internshipsService.updateInternshipStatus(id, status);
    }
};
exports.InternshipController = InternshipController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_internships_fiter_dto_1.GetInternshipFilterDto]),
    __metadata("design:returntype", Promise)
], InternshipController.prototype, "getInternships", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InternshipController.prototype, "getInternshipById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_internship_dto_1.CreateInternshipDto]),
    __metadata("design:returntype", Promise)
], InternshipController.prototype, "createInternship", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InternshipController.prototype, "deleteInternship", null);
__decorate([
    (0, common_1.Patch)('/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_internship_status_dto_1.UpdateInternshipStatusDto]),
    __metadata("design:returntype", Promise)
], InternshipController.prototype, "updateInternshipStatus", null);
exports.InternshipController = InternshipController = __decorate([
    (0, common_1.Controller)('internship'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [internships_service_1.InternshipsService])
], InternshipController);
//# sourceMappingURL=internship.controller.js.map