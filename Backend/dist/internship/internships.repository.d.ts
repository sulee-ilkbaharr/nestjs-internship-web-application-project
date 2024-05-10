import { DataSource, Repository } from 'typeorm';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { GetInternshipFilterDto } from './dto/get-internships-fiter.dto';
import { Internship } from './Internship.entity';
export declare class InternshipRepository extends Repository<Internship> {
    private datasource;
    constructor(datasource: DataSource);
    getInterships(filterDto: GetInternshipFilterDto): Promise<Internship[]>;
    createInternship({ companyName, departmentName, internshipNo, companyEmail, companyPhone, companyAdress, internshipStartDate, internshipFinishDate, }: CreateInternshipDto): Promise<Internship>;
}
