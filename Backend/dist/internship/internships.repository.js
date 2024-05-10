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
exports.InternshipRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const internship_status_enum_1 = require("./internship-status.enum");
const Internship_entity_1 = require("./Internship.entity");
let InternshipRepository = class InternshipRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(Internship_entity_1.Internship, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async getInterships(filterDto) {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('intership');
        if (status) {
            query.andWhere('internship.status = :status', { status });
        }
        if (search) {
            query.andWhere('LOWER(intership.title) LIKE LOWER(:search) OR LOWER(internship.description) LIKE LOWER(:search)', { search: `%${search}%` });
        }
        const internships = await query.getMany();
        return internships;
    }
    async createInternship({ companyName, departmentName, internshipNo, companyEmail, companyPhone, companyAdress, internshipStartDate, internshipFinishDate, }) {
        const internship = this.create({
            companyName,
            departmentName,
            internshipNo,
            companyEmail,
            companyPhone,
            companyAdress,
            internshipFinishDate,
            internshipStartDate,
            status: internship_status_enum_1.InternshipStatus.IN_PROGRESS,
        });
        await this.save(internship);
        return internship;
    }
};
exports.InternshipRepository = InternshipRepository;
exports.InternshipRepository = InternshipRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], InternshipRepository);
//# sourceMappingURL=internships.repository.js.map